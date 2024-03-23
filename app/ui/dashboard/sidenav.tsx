'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import MothershipLogo from '@/app/ui/mothership-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function SideNav() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');

  useEffect(() => {
    // Retrieve selected user's ID from localStorage on mount
    const storedUserId = localStorage.getItem('selectedUser');
    if (storedUserId) {
      setSelectedUserId(storedUserId);
      fetchUserName(storedUserId); // Fetch user's name using the stored ID
    }
  }, []);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/getUser/${userId}`);
      setSelectedUserName(response.data.name);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSignOut = () => {
    // Clear selected user from localStorage
    localStorage.removeItem('selectedUser');
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-purple-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <MothershipLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-purple-50 md:block"></div>
        <div>
          <a 
            href="/login" // Link to the login page
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-purple-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3"
            onClick={handleSignOut} // Call handleSignOut function on click
          >
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Switch User</div>
          </a>
        </div>
      </div>
      <p className="mt-auto text-sm text-purple-600">Logged in as: {selectedUserName}</p>
    </div>
  );
}
