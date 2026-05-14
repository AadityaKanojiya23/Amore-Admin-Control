"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const autoLogin = async () => {
      let token = Cookies.get('token');
      if (!token) {
        try {
          const res = await axios.post('http://localhost:5000/api/admin/login', {
            email: 'admin@amore.com',
            password: 'admin123'
          });
          token = res.data.token;
          Cookies.set('token', token as string, { expires: 1 });
        } catch (e) {
          console.error('Auto-login failed:', e);
        }
      }
      setLoading(false);
    };
    autoLogin();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Header setIsOpen={setSidebarOpen} />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
