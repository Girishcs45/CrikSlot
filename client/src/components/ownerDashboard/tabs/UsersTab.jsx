import React, { useEffect, useState } from "react";
import { GetOwnerUsers } from "../../../services/owner.services";

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const ownerId = JSON.parse(localStorage.getItem("Owner"));
      if (!ownerId) return;

      const data = await GetOwnerUsers(ownerId);
      setUsers(data);

      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg min-h-[400px]">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users Visited</h2>
        <p className="text-sm text-gray-500">
          Total Users: {users.length}
        </p>
      </div>

      {loading && (
        <p className="text-center text-gray-400">Loading users...</p>
      )}

      {!loading && users.length === 0 && (
        <p className="text-center text-gray-400">No users yet</p>
      )}

      {!loading && users.length > 0 && (
        <div className="grid gap-5">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex justify-between items-center"
            >
              {/* Left Section */}
              <div className="flex items-start gap-4">

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {u.user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="space-y-1">

                  <h3 className="font-semibold text-gray-800 text-lg">
                    {u.user.fullName || u.user.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    📧 {u.user.email}
                  </p>

                  <p className="text-sm text-gray-500">
                    📱 +91 {u.user.phone}
                  </p>

                  {u.user.address && (
                    <p className="text-sm text-gray-400 max-w-md truncate">
                      📍 {u.user.address}
                    </p>
                  )}

                  <div className="flex gap-3 mt-2 text-xs text-gray-500">

                    {u.user.loyaltyPoints !== undefined && (
                      <span className="bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full">
                        ⭐ {u.user.loyaltyPoints} pts
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section (Stats) */}
              <div className="text-right space-y-2">

                <div>
                  <p className="text-xs text-gray-400">Visits</p>
                  <p className="font-semibold text-gray-800">
                    {u.totalBookings}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Spent</p>
                  <p className="text-green-600 font-bold text-lg">
                    ₹{u.totalSpent}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersTab;
