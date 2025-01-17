"use client";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "./lib/firebase";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import LogoutButton from "./components/LogoutButton";

const UploadPage: React.FC = () => {
  // State for file and version
  const [file, setFile] = useState<File | null>(null);
  const [version, setVersion] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);



  // Handle file upload
  const handleUpload = async () => {
    if (!file || !version) {
      alert("Please select a file and enter a version.");
      return;
    }

    setIsUploading(true);

    try {
      // Upload file to Firebase Storage
      const fileRef = ref(storage, `firmware/${version}.bin`);
      await uploadBytes(fileRef, file);

      // Save version metadata in Firestore
      await setDoc(doc(db, "firmware_versions", version), {
        version,
        file_path: `firmware/${version}.bin`,
      });

      alert("Firmware uploaded successfully!");
    } catch (error) {
      console.error("Error uploading firmware:", error);
      alert("Failed to upload firmware. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <LogoutButton />
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Upload New Firmware
          </h1>

          {/* Version Input */}
          <div className="mb-6">
            <label
              htmlFor="version"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Version (e.g., 1.0.0)
            </label>
            <input
              id="version"
              type="text"
              placeholder="Enter version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* File Input */}
          <div className="mb-6">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Firmware File
            </label>
            <input
              id="file"
              type="file"
              accept=".bin"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UploadPage;