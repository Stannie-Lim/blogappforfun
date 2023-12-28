const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(403);
  }

  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!user) {
    return res.sendStatus(403);
  }

  req.user = user;

  next();
};

module.exports = {
  isAdmin,
};
