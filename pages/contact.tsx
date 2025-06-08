import React from 'react';

const Contact: React.FC = () => {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4 max-w-xl text-center">
        For inquiries, support, or feedback, please reach out to us at:
      </p>
      <p className="mb-8 font-mono">support@zephyrium.com</p>
      <form className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <textarea
          placeholder="Your Message"
          className="p-3 rounded bg-gray-800 text-white border border-gray-600 resize-none"
          rows={5}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white py-3 rounded font-semibold"
        >
          Send Message
        </button>
      </form>
    </main>
  );
};

export default Contact;
