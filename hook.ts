// Adjust the useSyncUserMutation hook
import { useAuth } from "@clerk/nextjs";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface SyncUserResponse {
  message?: string;
  error?: string;
  user?: {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export const useSyncUserMutation = (): UseMutationResult<
  SyncUserResponse,
  Error,
  string
> => {
  const { getToken } = useAuth();

  return useMutation<SyncUserResponse, Error, string>({
    mutationKey: ["sync-user"],
    mutationFn: async (ref: string): Promise<SyncUserResponse> => {
      const token = await getToken();
      console.log("this is sthe token ooooo", token);
      if (!token) {
        throw new Error("No token provided");
      }
      const response = await fetch(`/api/syncUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse: SyncUserResponse = await response.json();
        console.log("this is the error responsne", errorResponse);
        throw new Error(errorResponse.error || "Failed to sync user");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("User Details:", data.user);
    },
    onError: (error: Error) => {
      console.error("Error during user synchronization:", error);
    },
  });
};
