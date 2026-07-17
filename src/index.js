const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
dotenv.config();

const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Hello World!");
});

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    // Get the database and collection
    const db = client.db("petShopDB");
    const productsCollection = db.collection("products");
    const commentCollection = db.collection("comments");

    // GET: সব প্রোডাক্ট - search, category, petType, sort, pagination সহ
    // Usage: /api/products?search=&category=&petType=&sort=&page=&limit=
    app.get("/api/products", async (req, res) => {
      try {
        const {
          search = "",
          category = "all",
          petType = "all",
          sort = "newest",
          page = 1,
          limit = 9,
        } = req.query;

        const query = {};

        // Search: name অথবা description এর মধ্যে খুঁজবে (case-insensitive)
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ];
        }

        // Category filter
        if (category && category !== "all") {
          query.category = category;
        }

        // Pet type filter
        if (petType && petType !== "all") {
          query.petType = petType;
        }

        // Sort options
        let sortOption = { createdAt: -1 }; // newest first (default)
        if (sort === "price_asc") sortOption = { price: 1 };
        else if (sort === "price_desc") sortOption = { price: -1 };
        else if (sort === "rating_desc") sortOption = { rating: -1 };

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const total = await productsCollection.countDocuments(query);

        const products = await productsCollection
          .find(query)
          .sort(sortOption)
          .skip(skip)
          .limit(limitNum)
          .toArray();

        res.send({
          success: true,
          products,
          pagination: {
            total,
            page: pageNum,
            limit: limitNum,
            pages: Math.ceil(total / limitNum),
          },
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({
          success: false,
          message: "Server error while fetching products",
        });
      }
    });

    // GET: একটা নির্দিষ্ট প্রোডাক্ট এর বিস্তারিত
    // Usage: /api/products/:id
    app.get("/api/products/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res
            .status(400)
            .send({ success: false, message: "Invalid product ID" });
        }

        const product = await productsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!product) {
          return res
            .status(404)
            .send({ success: false, message: "Product not found" });
        }

        res.send({ success: true, data: product });
      } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send({
          success: false,
          message: "Server error while fetching product",
        });
      }
    });


    app.post("/api/products/:id/comments", async (req, res) => {
      try {
        const { id } = req.params;
        const { userName, rating, commentText } = req.body;

        // Validate product ID
        if (!ObjectId.isValid(id)) {
          return res
            .status(400)
            .send({ success: false, message: "Invalid product ID" });
        }

        // Validate required fields
        if (!userName || !commentText) {
          return res.status(400).send({
            success: false,
            message: "userName and commentText are required",
          });
        }

        // Validate rating (optional but should be between 1-5 if provided)
        if (rating && (rating < 1 || rating > 5)) {
          return res.status(400).send({
            success: false,
            message: "Rating must be between 1 and 5",
          });
        }

        // Check if product exists
        const product = await productsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!product) {
          return res
            .status(404)
            .send({ success: false, message: "Product not found" });
        }

        // Create comment object
        const comment = {
          productId: new ObjectId(id),
          userName,
          rating: rating || 0,
          commentText,
          createdAt: new Date(),
        };

        // Insert comment into database
        const result = await commentCollection.insertOne(comment);

        res.send({
          success: true,
          message: "Comment added successfully",
          commentId: result.insertedId,
          data: comment,
        });
      } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).send({
          success: false,
          message: "Server error while adding comment",
        });
      }
    });

    // GET: একটা প্রোডাক্টের সব কমেন্ট দেখা যাবে
    // Usage: /api/products/:id/comments
    app.get("/api/products/:id/comments", async (req, res) => {
      try {
        const { id } = req.params;

        // Validate product ID
        if (!ObjectId.isValid(id)) {
          return res
            .status(400)
            .send({ success: false, message: "Invalid product ID" });
        }

        // Check if product exists
        const product = await productsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!product) {
          return res
            .status(404)
            .send({ success: false, message: "Product not found" });
        }

        // Get all comments for this product
        const comments = await commentCollection
          .find({ productId: new ObjectId(id) })
          .sort({ createdAt: -1 })
          .toArray();

        res.send({
          success: true,
          productId: id,
          totalComments: comments.length,
          comments: comments.map((comment) => ({
            commentId: comment._id,
            userName: comment.userName,
            rating: comment.rating,
            commentText: comment.commentText,
            createdAt: comment.createdAt,
          })),
        });
      } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).send({
          success: false,
          message: "Server error while fetching comments",
        });
      }
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});