import React, { useEffect, useState } from 'react';
import { auth } from '../../lib/firebaseAuth';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/router';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        // Redirect to login page if not authenticated
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Checking authentication status</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={() => auth.signOut()}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
      <p>Welcome to the admin panel. Manage your application here.</p>
      {/* Add admin functionalities here */}
    </main>
  );
};

export default AdminDashboard;
