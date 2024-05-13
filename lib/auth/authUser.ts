// lib/authenticateUser.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { EmailAddress, clerkClient } from "@clerk/nextjs/server";
import { AuthenticatedUser } from "@/app/api/syncUser/types";
function getPrimaryEmail(
  emails: EmailAddress[],
  primaryId: string | null
): string | undefined {
  const primaryEmail = emails.find((email) => email.id === primaryId);
  if (!primaryEmail) {
    console.log("there is no primary email here ");
    return emails[0].emailAddress;
  }
  return primaryEmail.emailAddress;
}
export async function authenticateUser(
  req: NextRequest
): Promise<AuthenticatedUser> {
  const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error("Public key is not set in environment variables");
  }

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    throw { message: "Not signed in", statusCode: 401 };
  }

  try {
    const decoded = jwt.verify(token, publicKey);
    if (typeof decoded.sub === "string") {
      const user = await clerkClient.users.getUser(decoded.sub);
      const AuthUser = {
        id: user.id,
        userName: user.username,
        email: getPrimaryEmail(user.emailAddresses, user.primaryEmailAddressId),
        fullName: `${user.firstName || ""} ${user.lastName || ""}`,
        image: user.imageUrl,
      };
      return AuthUser;
    } else {
      throw { message: "Invalid token data", statusCode: 400 };
    }
  } catch (error) {
    throw { message: "Invalid Token", statusCode: 400, error };
  }
}

// lib/authenticateUser.ts

export async function isAuth(req: NextRequest) {
  const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error("Public key is not set in environment variables");
  }

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    throw { message: "Not signed in", statusCode: 401 };
  }

  try {
    const decoded = jwt.verify(token, publicKey);
  } catch (error) {
    throw { message: "Invalid Token", statusCode: 400, error };
  }
}
