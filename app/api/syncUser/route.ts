// pages/api/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { clerkClient } from "@clerk/nextjs/server";
export async function POST(req: NextRequest) {
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);

  const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
  if (!publicKey) {
    console.error("Public key is not set in environment variables");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const token = req.headers.get("authorization")?.split(" ")[1]; // Assuming Bearer token
  console.log("Token retrieved from Authorization header:", token);

  if (!token) {
    console.log("No token found in Authorization header");
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, publicKey);
    console.log("Token verification successful:", decoded);
    if (typeof decoded.sub === "string") {
      const user = await clerkClient.users.getUser(decoded.sub);
      console.log("this is the user pppppp", user);
    } else {
      console.error(
        "Decoded token 'sub' field is not a string or is undefined"
      );
      return NextResponse.json(
        { error: "Invalid token data" },
        { status: 400 }
      );
    }
    return NextResponse.json({ sessToken: decoded }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
  }
}

// // app/api/user.ts
// import { NextRequest, NextResponse } from 'next/server';

// export async function Post(req: NextRequest) {
//   const authHeader = req.headers.get('authorization') || '';
//   const token = authHeader.split(' ')[1]; // Extracts token from "Bearer token"

//   if (!token) {
//     return NextResponse.json({ message: 'Authorization token is missing' }, { status: 401 });
//   }

//   try {
//     // Decode the JWT to extract the session ID and user ID
//     const decodeInfo = decodeJwt(token);
//     const sessionId = decodeInfo.payload.sid;
//     const clerkUserId = decodeInfo.payload.sub;

//     // Verify the session using the session ID and token
//     const session = await clerk.sessions.verifySession(sessionId, token);

//     if (session) {
//       // Simulate fetching user details from a database or another source
//       // This is a placeholder for actual database interaction
//     //   const user = await myDbLibrary.get('select * from users where id = ?', [clerkUserId]);

//       return NextResponse.json({
//         message: 'User details retrieved successfully',
//         user: {
//           id: user.id,
//           email: user.email,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           // Add other user details as needed
//         }
//       });
//     } else {
//       return NextResponse.json({ message: 'Session is not active' }, { status: 401 });
//     }
//   } catch (error) {
//     return NextResponse.json({ message: 'Invalid token or session', error: error.message }, { status: 401 });
//   }
// }
