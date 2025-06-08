import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: any;
}

export default function Admin() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(docs);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-200 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(({ id, name, email, message, timestamp }) => (
                <tr key={id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2">{email}</td>
                  <td className="px-4 py-2">{message}</td>
                  <td className="px-4 py-2">
                    {timestamp?.toDate().toLocaleString() || 'N/A'}
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
