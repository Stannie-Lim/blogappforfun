const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blog_posts", require("./routes/blogPosts"));

app.listen(3000);
