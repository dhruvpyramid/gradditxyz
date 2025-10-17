"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { INDIAN_STATES, COLLEGE_CATEGORIES } from "@/data/indian-states";
import { Trash2, Plus, RefreshCw, Users } from "lucide-react";
import { toast } from "sonner";

interface College {
  id: number;
  name: string;
  email?: string;
  website?: string;
  twitter?: string;
  description?: string;
  category: string;
  city: string;
  state: string;
  score: number;
  voteCount: number;
}

interface User {
  id: string;
  email: string;
  collegeName: string;
  city: string;
  state: string;
  voteCount: number;
  lastVoteAt: string | null;
  isBlocked: boolean;
  blockReason: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const { authenticated, user, login } = usePrivy();
  const [colleges, setColleges] = useState<College[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [activeTab, setActiveTab] = useState<'colleges' | 'users'>('colleges');

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    twitter: "",
    description: "",
    category: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    checkAdminStatus();
    fetchColleges();
    fetchUsers();
  }, [authenticated, user]);

  const checkAdminStatus = async () => {
    if (!authenticated || !user?.email?.address) {
      setCheckingAdmin(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email.address }),
      });
      const data = await response.json();
      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.error("Admin check failed:", error);
      setIsAdmin(false);
    } finally {
      setCheckingAdmin(false);
    }
  };

  const fetchColleges = async () => {
    try {
      const response = await fetch("/api/colleges");
      const data = await response.json();
      if (response.ok) {
        setColleges(data.colleges);
      }
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (!authenticated || !user?.email?.address) return;
    
    try {
      const response = await fetch("/api/admin/users", {
        headers: {
          "x-admin-email": user.email.address,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleResetVotes = async (userEmail: string) => {
    if (!confirm(`Reset vote limit for ${userEmail}? This will allow them to vote immediately.`)) {
      return;
    }

    try {
      const response = await fetch("/api/admin/users/reset-votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": user?.email?.address || "",
        },
        body: JSON.stringify({ userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Vote limit reset successfully!");
        fetchUsers(); // Refresh user list
      } else {
        toast.error(data.error || "Failed to reset vote limit");
      }
    } catch (error) {
      console.error("Reset votes error:", error);
      toast.error("Failed to reset vote limit");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/colleges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": user?.email?.address || "",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to add college");
        setIsSubmitting(false);
        return;
      }

      setSuccess("College added successfully!");
      setFormData({
        name: "",
        email: "",
        website: "",
        twitter: "",
        description: "",
        category: "",
        city: "",
        state: "",
      });
      fetchColleges();
    } catch (err) {
      console.error("Add college error:", err);
      setError("Failed to add college");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (collegeId: number) => {
    if (!confirm("Are you sure you want to delete this college?")) return;

    try {
      const response = await fetch(`/api/admin/colleges?id=${collegeId}`, {
        method: "DELETE",
        headers: {
          "x-admin-email": user?.email?.address || "",
        },
      });

      if (response.ok) {
        setSuccess("College deleted successfully!");
        fetchColleges();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete college");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete college");
    }
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Access Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please login to access the admin panel
          </p>
          <button
            onClick={() => login()}
            className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Login with Privy
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            You don't have admin privileges to access this page.
          </p>
          <a 
            href="/"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('colleges')}
            className={`px-6 py-3 font-medium transition-all border-b-2 ${
              activeTab === 'colleges'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Plus size={18} />
              Colleges ({colleges.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-medium transition-all border-b-2 ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={18} />
              Users ({users.length})
            </div>
          </button>
        </div>

        {/* Add College Form */}
        {activeTab === 'colleges' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Plus size={24} />
            Add New College
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  College Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Category</option>
                  {COLLEGE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter Handle
                </label>
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="@collegename"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-900 dark:text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-900 dark:text-green-300">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add College"}
            </button>
          </form>
        </div>
        )}

        {/* Colleges List */}
        {activeTab === 'colleges' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            All Colleges ({colleges.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : colleges.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No colleges added yet
            </p>
          ) : (
            <div className="space-y-4">
              {colleges.map((college) => (
                <div
                  key={college.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {college.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {college.category} • {college.city}, {college.state}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      Score: {college.score.toFixed(1)} • Votes: {college.voteCount}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(college.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        )}

        {/* Users List */}
        {activeTab === 'users' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            All Users ({users.length})
          </h2>

          {isLoadingUsers ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : users.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No users registered yet
            </p>
          ) : (
            <div className="space-y-4">
              {users.map((u) => {
                const canVoteAgain = u.lastVoteAt 
                  ? new Date(u.lastVoteAt).getTime() + 24 * 60 * 60 * 1000 < Date.now()
                  : true;
                
                return (
                  <div
                    key={u.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {u.email}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {u.collegeName} • {u.city}, {u.state}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          Votes today: {u.voteCount}/5
                        </p>
                        {u.lastVoteAt && (
                          <p className={`text-xs ${
                            canVoteAgain 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-orange-600 dark:text-orange-400'
                          }`}>
                            {canVoteAgain 
                              ? '✓ Can vote now' 
                              : `⏱ Next vote: ${new Date(new Date(u.lastVoteAt).getTime() + 24 * 60 * 60 * 1000).toLocaleString()}`
                            }
                          </p>
                        )}
                        {u.isBlocked && (
                          <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
                            Blocked: {u.blockReason}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleResetVotes(u.email)}
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-sm font-medium"
                      title="Reset daily vote limit"
                    >
                      <RefreshCw size={16} />
                      Reset Votes
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
