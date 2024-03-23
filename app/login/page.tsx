'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MothershipLogo from '@/app/ui/mothership-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUserName, setNewUserName] = useState('');

  // Load selected user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      setSelectedUser(storedUser);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/getAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserSelect = (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
    localStorage.setItem('selectedUser', selectedUserId); // Store selected user in localStorage
  };

  const handleNewUserSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/addUser', { name: newUserName });
      const newUser = response.data;
      setUsers([...users, newUser]);
      setNewUserName('');
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  };

  const renderUserOptions = () => {
    return users.map((user) => (
      <option key={user.uid} value={user.uid}>{user.name}</option>
    ));
  };

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-purple-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <MothershipLogo />
          </div>
        </div>
        <div>
          <h2>Create New User</h2>
          <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
          <button onClick={handleNewUserSubmit} className="mt-4 login-button">
            Create User <ArrowRightIcon className="ml-auto h-5 w-5 text-purple-500" />
          </button>
        </div>
        <div>
          <h2>Select User</h2>
          <select value={selectedUser} onChange={handleUserSelect}>
            <option value="">Select User...</option>
            {renderUserOptions()}
          </select>
          <button onClick={() => { window.location.href = '/dashboard'; }} className="mt-4 login-button">
            Login <ArrowRightIcon className="ml-auto h-5 w-5 text-purple-500" />
          </button>
        </div>
      </div>
    </main>
  );
}
