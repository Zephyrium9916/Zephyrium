import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Zephyrium</span>
        </h1>
        <p className="text-gray-600 max-w-xl">
          Pioneering the next generation of cybersecurity software — from endpoints to the cloud.
        </p>
      </main>
      <Footer />
    </div>
  );
}
