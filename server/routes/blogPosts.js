const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { isAdmin } = require("./middleware");
const prisma = new PrismaClient();

module.exports = router;

// root route is /api/blog_posts
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

router.get("/:id", async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    const indexOfPost = posts.findIndex((post) => req.params.id === post.id);

    res.send({
      prev: indexOfPost > 0 ? posts[indexOfPost - 1] : null,
      current: posts[indexOfPost],
      next: indexOfPost < posts.length - 1 ? posts[indexOfPost + 1] : null,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAdmin, async (req, res, next) => {
  try {
    const updated = await prisma.post.update({
      data: req.body,
      where: {
        id: req.params.id,
      },
    });

    res.send(updated);
  } catch (error) {
    next(error);
  }
});
