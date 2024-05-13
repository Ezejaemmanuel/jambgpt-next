// components/SyncUserButton.tsx
"use client";
import { useSyncUserMutation } from "@/hook";
import React from "react";

const SyncUserButton: React.FC = () => {
  const { mutateAsync: syncUser, isPending, error } = useSyncUserMutation();

  const handleSyncUser = () => {
    syncUser("user_reference_id"); // Replace "user_reference_id" with actual reference if needed
  };

  return (
    <div className="p-4">
      <button
        className="hover:bg-blue-700 px-4 py-2 font-bold text-white bg-blue-500 rounded"
        onClick={handleSyncUser}
        disabled={isPending}
      >
        Sync User
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {isPending && <p>Loading...</p>}
    </div>
  );
};

export default SyncUserButton;
