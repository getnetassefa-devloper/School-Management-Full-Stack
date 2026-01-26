"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Get user data
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      // Not logged in? Go to login.
      router.push("/login");
      return;
    }

    const user = JSON.parse(userStr);

    // 2. Check if their role is allowed
    // allowedRoles might be ["ADMIN"] or ["TEACHER", "ADMIN"]
    if (allowedRoles.includes(user.role)) {
      setIsAuthorized(true); // Let them in!
    } else {
      // Logged in, but wrong role? Go to their own dashboard or 403 page
      alert("Access Denied: You don't have permission.");
      router.back(); // Send them back
    }
  }, [router, allowedRoles]);

  // While checking, show nothing or a loading spinner
  if (!isAuthorized) {
    return <div className="p-10 text-center">Checking permissions...</div>;
  }

  // If authorized, render the actual page
  return <>{children}</>;
}