const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const seed = async () => {
  try {
    await prisma.post.deleteMany();
    await prisma.users.deleteMany();

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

    const hashedPassword = bcrypt.hashSync("uknowat?", 10);

    await prisma.users.create({
      data: {
        username: "uknowat",
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

seed();
