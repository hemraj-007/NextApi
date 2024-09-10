'use client'
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios

export default function Home() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [updatedUser, setUpdatedUser] = useState({ _id: "", email: "" });
  const [deleteUserId, setDeleteUserId] = useState("");

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user", newUser);
      setNewUser({ name: "", email: "", password: "" });
      fetchUsers(); // Reload users after creation
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:3000/api/user", updatedUser);
      setUpdatedUser({ _id: "", email: "" });
      fetchUsers(); // Reload users after update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:3000/api/users?userId=${deleteUserId}`);
      setDeleteUserId("");
      fetchUsers(); // Reload users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8">User Management</h1>

      {/* List Users */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <ul className="bg-white shadow-md rounded-lg p-6">
          {users.map((user: any) => (
            <li key={user._id} className="py-2 border-b last:border-b-0">
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      </div>

      {/* Create User Form */}
      <form onSubmit={handleCreateUser} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Create User</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            className="w-full border rounded-md p-2"
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            className="w-full border rounded-md p-2"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            className="w-full border rounded-md p-2"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          type="submit"
        >
          Create User
        </button>
      </form>

      {/* Update User Form */}
      <form onSubmit={handleUpdateUser} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Update User Email</h2>
        <div className="mb-4">
          <label className="block text-gray-700">User ID:</label>
          <input
            className="w-full border rounded-md p-2"
            type="text"
            value={updatedUser._id}
            onChange={(e) => setUpdatedUser({ ...updatedUser, _id: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Email:</label>
          <input
            className="w-full border rounded-md p-2"
            type="email"
            value={updatedUser.email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            required
          />
        </div>
        <button
          className="bg-green-500 text-white p-2 rounded-md"
          type="submit"
        >
          Update User
        </button>
      </form>

      {/* Delete User Form */}
      <form onSubmit={handleDeleteUser} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Delete User</h2>
        <div className="mb-4">
          <label className="block text-gray-700">User ID:</label>
          <input
            className="w-full border rounded-md p-2"
            type="text"
            value={deleteUserId}
            onChange={(e) => setDeleteUserId(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          type="submit"
        >
          Delete User
        </button>
      </form>
    </div>
  );
}
