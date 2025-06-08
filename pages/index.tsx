import Head from "next/head";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import EmailCapture from "../components/EmailCapture";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Zephyrium – Cybersecurity Reinvented</title>
        <meta name="description" content="Enterprise-grade cybersecurity tools to protect your future." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />

        <section className="flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-b from-black to-gray-900">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Building The Next Era of Cyber Defense
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Zephyrium delivers advanced, scalable, and intelligent cybersecurity solutions
            for individuals and enterprises.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            Get Early Access
          </button>
        </section>

        <section className="px-6 py-20 bg-black">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Cybersecurity Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ProductCard
              icon="🛡️"
              title="Endpoint Security"
              description="Real-time protection and automated threat response for devices in your network."
            />
            <ProductCard
              icon="📊"
              title="SIEM (Security Info & Event Management)"
              description="Aggregate, analyze, and react to logs and events from your entire infrastructure."
            />
            <ProductCard
              icon="🧠"
              title="Threat Intelligence"
              description="Continuous monitoring and prediction of threats using AI and global intelligence feeds."
            />
            <ProductCard
              icon="🔐"
              title="Identity & Access Management"
              description="Control who can access what, and how — with MFA and fine-grained permissions."
            />
            <ProductCard
              icon="🧪"
              title="Penetration Testing"
              description="Automated and manual testing to find and fix vulnerabilities before attackers do."
            />
            <ProductCard
              icon="🚀"
              title="DevSecOps"
              description="Secure the CI/CD pipeline from code to production without slowing down your team."
            />
          </div>
        </section>

        <EmailCapture />
      </main>
    </>
  );
};

export default Home;
