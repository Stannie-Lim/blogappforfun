const router = require("express").Router();

const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = router;

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(409).send({ message: "User does not exist" });
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    // successfully logged in!
    if (isCorrectPassword) {
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

      res.send(token);
    } else {
      res.status(401).send({ message: "Incorrect password" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/me", async (req, res, next) => {
  // you will need the authorization token
  // it transforms that token to the user's data
  // and sends it back to the client
  const token = req.headers.authorization;

  // 2 args
  // 1. the token
  // 2. the same secret key that you used before
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

  res.send(user);
});
