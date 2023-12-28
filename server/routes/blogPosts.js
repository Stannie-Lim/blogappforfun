const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = router;

router.get("/", async (req, res, next) => {
  const { limit, offset } = req.query;
  const limitWithDefault = Number(limit) || 10;
  const numberOffset = Number(offset);

  res.send({
    posts: await prisma.post.findMany({
      skip: numberOffset,
      take: limitWithDefault,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    }),
    hasNext: numberOffset + limitWithDefault < (await prisma.post.count()),
  });
});
