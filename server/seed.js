const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

const seed = async () => {
  try {
    for (let i = 0; i < 10; i++) {
      const title = faker.lorem.sentence();
      const description = faker.lorem.paragraphs();
      const createdAt = faker.date.past();
      const imageURL = faker.image.urlLoremFlickr({ category: "people" });
      await prisma.post.create({
        data: {
          title,
          description,
          createdAt,
          imageURL,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

seed();
