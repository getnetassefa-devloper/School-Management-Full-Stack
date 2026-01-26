"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function useAuth() {
  const [user, setUser] = useState(null);
  const route = useRouter();

  // useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    //Check if there is a token and user Data
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    route.push("/login");
  };

  return { user, logOut };
}
