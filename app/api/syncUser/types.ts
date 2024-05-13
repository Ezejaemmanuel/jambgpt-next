// Define the type for the user object
export type AuthenticatedUser = {
  id: string;
  userName: string | null;
  email: string | undefined;
  fullName: string;
  image: string;
};
