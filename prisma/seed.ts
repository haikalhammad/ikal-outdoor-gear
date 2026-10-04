import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // === Admin default ===
  const adminEmail = "admin@ikaloutdoor.id";
  const adminPassword = "admin123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`⚠️  Admin ${adminEmail} sudah ada, skip.`);
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: "Admin Ikal",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      },
    });

    console.log(`✅ Admin created: ${adminEmail} / ${adminPassword}`);
  }

  // === Customer demo ===
  const customerEmail = "customer@example.com";
  const customerPassword = "customer123";

  const existingCustomer = await prisma.user.findUnique({
    where: { email: customerEmail },
  });

  if (!existingCustomer) {
    const hashedPassword = await bcrypt.hash(customerPassword, 10);

    await prisma.user.create({
      data: {
        name: "Customer Demo",
        email: customerEmail,
        password: hashedPassword,
        role: "customer",
      },
    });

    console.log(
      `✅ Customer created: ${customerEmail} / ${customerPassword}`
    );
  }

  console.log("🎉 Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });