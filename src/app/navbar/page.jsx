"use client";
import  useAuth  from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logOut } = useAuth();

  return (
    <nav className="flex justify-between p-4 bg-black text-white">
      <div>School System</div>
      
      <div>
        {user ? (
          <div className="flex gap-4 items-center">
            <span>Welcome, {user.fullName} ({user.role})</span>
            <button 
              onClick={logOut}
              className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <a href="/login">Log In</a>
        )}
      </div>
    </nav>
  );
}