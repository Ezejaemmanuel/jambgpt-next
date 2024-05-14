import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";
import { EmailAddress, auth } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";

export const getUserId = () => {
  try {
    const { userId } = auth();
    return userId;
  } catch (error) {
    console.error("Error getting userId:", error);
    return null;
  }
};

export const checkAuth = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
};

export const getUserAuthInfo = async () => {
  const user = await currentUser();
  if (user) {
    return user;
  }
  throw new Error("No User Logged In");
};
export type AuthSession = {
  session: {
    user: {
      id: string;
      userName: string | null;
      firstName?: string;
      fullName?: string;
      imageUrl?: string;
      email: string | undefined;
      image: string | null;
    };
  } | null;
};

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
export const getUserAuth = async (): Promise<AuthSession> => {
  // const { userId } = auth();
  const session = await currentUser();
  // console.log("thsi is the sesion that would be manually added to the database ", session);

  if (session) {
    return {
      session: {
        user: {
          id: session.id,
          userName: session.username,
          email: getPrimaryEmail(
            session.emailAddresses,
            session.primaryEmailAddressId
          ),
          firstName: "",
          fullName: `${session.firstName} ${session.lastName}`,
          image: session.imageUrl,
        },
      },
    };
  } else {
    return { session: null };
  }
};
