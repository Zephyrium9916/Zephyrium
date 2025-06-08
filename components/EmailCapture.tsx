import React, { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const EmailCapture: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await addDoc(collection(db, "early_access"), {
        email,
        createdAt: Timestamp.now(),
      });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error saving email:", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h3 className="text-2xl font-bold mb-4">Get Early Access to Zephyrium</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          {status === "loading" ? "Sending..." : "Join Waitlist"}
        </button>
      </form>
      {status === "success" && (
        <p className="text-green-400 mt-4">You're in! We'll notify you soon.</p>
      )}
      {status === "error" && (
        <p className="text-red-500 mt-4">Something went wrong. Try again.</p>
      )}
    </div>
  );
};

export default EmailCapture;
