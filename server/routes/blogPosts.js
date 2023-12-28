const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = router;

router.get("/", async (req, res, next) => {
  res.send(
    await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    })
  );
});
