import { getUserAuth } from "@/lib/auth/utils";
import { NextRequest, NextResponse } from "next/server";
import { createUser } from "./aside";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema/schema";
import { authenticateUser } from "@/lib/auth/authUser";
export async function POST(
  request: NextRequest,
  res: NextResponse
): Promise<NextResponse> {
  console.log("POST function started");
  const { session } = await getUserAuth();
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref");
  if (!ref) {
    return NextResponse.json({ error: "No Ref Found" }, { status: 404 });
  }
  console.log(`Ref: ${ref}`);

  try {
    console.log("Attempting to authenticate user");
    console.log(`Authenticated user ID: ${session}`);
    if (!session) {
      console.log("No user ID found, redirecting to sign-in");
      throw new Error("No user ID found, redirecting to sign-in page.");
    }
    console.log("Fetching user from database");
    console.log("Checking if user already exists"); // Log checking for existing user
    const existingUser = await db
      .selectDistinct()
      .from(users)
      .where(eq(users.id, session.user.id));

    if (existingUser && existingUser.length > 0) {
      console.log("User already exists, returning existing user"); // Log returning existing user
      return NextResponse.json(existingUser[0], { status: 200 });
    }

    console.log("Creating user through webhook");
    const authenticatedUser = await authenticateUser(request);
    const fromSyncingUser = await createUser(ref, authenticatedUser);
    console.log(`User created: ${JSON.stringify(fromSyncingUser)}`);
    console.log("Returning response with status 200");

    return NextResponse.json(fromSyncingUser, { status: 200 });
  } catch (error: unknown) {
    console.log("An error occurred", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`Error message: ${errorMessage}`);

    console.log("Returning error response with status 500");
    return NextResponse.json(
      {
        error:
          "An unknown error occurred while updating the token price: " +
          errorMessage,
      },
      { status: 500 }
    );
  }
}
