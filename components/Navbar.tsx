import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold tracking-tight cursor-pointer hover:text-blue-400 transition">
            Zephyrium
          </span>
        </Link>
        <div className="space-x-6 text-sm sm:text-base">
          <Link href="/products/endpoint-security" className="hover:text-blue-400 transition">
            Endpoint Security
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
          <Link href="/admin" className="hover:text-blue-400 transition">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
