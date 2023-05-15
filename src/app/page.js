import React from "react";

// Components
import Feed from "@/components/Feed";
import UploadModal from "@/components/UploadModal";

export default function Home() {
  return (
    <main className="bg-gray-50">
      {/* Feed */}
      <Feed />

      {/* Modal */}
      <UploadModal />
    </main>
  )
}
