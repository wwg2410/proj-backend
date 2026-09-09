import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'iPhone 15 Pro',
        brand: 'Apple',
        price: 999.99,
        stock: 10,
        description: 'Флагманский смартфон с титановым корпусом.',
        memoryGb: 128,
        color: 'Natural Titanium',
      },
      {
        name: 'Galaxy S24 Ultra',
        brand: 'Samsung',
        price: 1199.99,
        stock: 8,
        description: 'Смартфон со встроенным стилусом S Pen.',
        memoryGb: 256,
        color: 'Titanium Black',
      },
      {
        name: 'Xiaomi 14',
        brand: 'Xiaomi',
        price: 699.99,
        stock: 15,
        description: 'Компактный флагман с оптикой Leica.',
        memoryGb: 256,
        color: 'Black',
      },
    ],
  });

  console.log('Данные успешно загружены!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });