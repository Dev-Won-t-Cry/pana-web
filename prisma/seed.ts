import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const defaultPassword = '123456'
  try {
    const user = await prisma.user.create({
      data: {
        email: "admin@pana.com",
        password: bcrypt.hashSync(defaultPassword, 10),
      },
    })

    if (user) console.log('Admin created successfully!')
  } catch (e) {
    console.log('Admin already exists!')
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })