export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-4 mt-12 text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span>© {new Date().getFullYear()} Zephyrium. All rights reserved.</span>
        <span>Crafted with 🔐 by Zephyrium Labs</span>
      </div>
    </footer>
  );
}
