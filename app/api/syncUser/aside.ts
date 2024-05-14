import { redirect } from "next/navigation";
import { getUserAuth } from "@/lib/auth/utils";
import { sql } from "drizzle-orm";
import { UserRoleEnum, users } from "@/lib/db/schema/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { authenticateUser } from "@/lib/auth/authUser";
import { User } from "@clerk/nextjs/server";
import { AuthenticatedUser } from "./types";

export async function createUser(ref: string, user: AuthenticatedUser) {
  console.log("THIS IS THE REF FOR NOW inside of the backend ", ref);
  console.log("Entering createUser function"); // Log entry point of the function
  // const { session } = await getUserAuth();
  // Log the user object
  if (!user.email) {
    console.log("Email not provided, throwing error"); // Log error for missing email
    throw new Error("email must be provided");
  }

  console.log("Checking if user already exists"); // Log checking for existing user
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id));

  if (existingUser && existingUser.length > 0) {
    console.log("User already exists, returning existing user"); // Log returning existing user
    return existingUser[0];
  }

  console.log("Creating new authenticated user"); // Log creating new user
  const AuthenticatedUser = await db.insert(users).values({
    id: user.id,
    role: UserRoleEnum.USER,
    username: user.email.split("@")[0],
    fullName: user.fullName || "",
    imageUrl: user.image,
    email: user.email,
  });

  console.log("this is the authenticated user", AuthenticatedUser);
  console.log("Checking referral information"); // Log checking referral
  // Assuming you have a referredById column in your users table to store referral information

  console.log("Returning authenticated user:", AuthenticatedUser); // Log returning authenticated user
  return AuthenticatedUser;
}
