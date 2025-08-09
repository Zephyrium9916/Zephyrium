// Firestore Waitlist Form + Paystack Donation + Sound Sync

'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';
import Script from 'next/script';

export default function CallToActionSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'waitlist'), { email, timestamp: new Date() });
      setSubmitted(true);
    } catch (error) {
      console.error('Error joining waitlist:', error);
    }
  };

  const handleDonate = () => {
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      email,
      amount: 1000 * 100,
      currency: 'NGN',
      callback: (response: any) => {
        alert(`Donation successful! Ref: ${response.reference}`);
      },
      onClose: () => alert('Donation window closed'),
    });
    handler.openIframe();
  };

  return (
    <section className="py-16 px-4 text-center bg-black text-white">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl font-bold mb-6"
      >
        🚀 Get Early Access to VaultGuard
      </motion.h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="px-4 py-2 rounded bg-white text-black w-full max-w-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {submitted ? '✅ Joined!' : 'Join Waitlist'}
        </button>
      </form>

      <div className="mt-10">
        <button
          onClick={handleDonate}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          💰 Donate to Support VaultGuard
        </button>
      </div>

      {/* Ambient Sound Trigger on Scroll */}
      <Script id="ambient-sound-trigger" strategy="lazyOnload">
        {`
          let played = false;
          const sound = new Audio('/sounds/vaultguard-ambient.mp3');
          sound.volume = 0.2;
          window.addEventListener('scroll', () => {
            if (!played && window.scrollY > 100) {
              sound.play();
              played = true;
            }
          });
        `}
      </Script>
    </section>
  );
}
