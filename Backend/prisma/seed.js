const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.task.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      title: 'Tarea de ejemplo para pruebas',
      completed: false,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })