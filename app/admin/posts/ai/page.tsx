import { Metadata } from "next";
import ZephyriumAIEditor from "../../../../components/admin/ZephyriumAIEditor";

export const metadata: Metadata = {
  title: "Zephyrium AI | Admin",
  description: "Use AI to generate and draft new blog posts for Zephyrium Insights.",
};

export default function ZephyriumAIPostPage() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white p-8 overflow-x-hidden">
      <div className="max-w-4xl mx-auto pt-32">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Zephyrium AI</h1>
        <p className="text-lg text-gray-300 mb-12">
          Generate draft blog posts with the help of Zephyrium AI. Describe your topic or idea and let the model do the rest.
        </p>

        <ZephyriumAIEditor />
      </div>
    </main>
  );
}
