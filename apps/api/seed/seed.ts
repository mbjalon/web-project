import prisma from "../src/client";
import { categories, goods, items, shelves, users } from "./data";

const seed = async () => {
  console.log("Seeding started");
  await prisma.user.createMany({ data: users });
  await prisma.category.createMany({ data: categories });
  await prisma.good.createMany({ data: goods });
  await prisma.shelf.createMany({ data: shelves });
  await prisma.item.createMany({ data: items });
  console.log("Seeding finished");
};

seed();
