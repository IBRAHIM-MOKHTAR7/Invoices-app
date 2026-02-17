import { db } from "@/app/config/db";
import { Customers } from "@/app/config/schema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const { email, name } = await request.json();

  // if user exist ?
  const existingUsers = await db.select().from(Customers).where(eq(Customers.email, email));
  if (existingUsers.length > 0) {
    return NextResponse.json(existingUsers[0]);
  }


  const customer = await db
    .insert(Customers)
    .values({
      email,
      name,
      userId,
    })
    .returning();

  console.log("Customer created:", customer);
  return NextResponse.json(customer[0]);
}