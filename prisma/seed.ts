import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const pizza = await prisma.category.create({
    data: { name: "Pizza", sortOrder: 1 },
  });

  const drinks = await prisma.category.create({
    data: { name: "Getränke", sortOrder: 2 },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: pizza.id,
        name: "Margherita",
        description: "Tomatensauce, Mozzarella",
        priceCents: 850,
      },
      {
        categoryId: pizza.id,
        name: "Salami",
        description: "Tomatensauce, Mozzarella, Salami",
        priceCents: 950,
      },
      {
        categoryId: drinks.id,
        name: "Cola 0.33l",
        priceCents: 250,
      },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
