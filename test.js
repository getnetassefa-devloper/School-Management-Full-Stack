"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, allowedRoles }) {
  const [isAuthorized, setAuthorized] = useState(false);
  const route = useRouter();
  //Now check if they are logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);

    if (!token || !user) {
      alert("You are not logged In");
      route.push("/login");
      return;
    }

    //Now check the Role permisson
    if (!allowedRoles.includes(user.role)) setAuthorized(false);
    else setAuthorized(true);
    //Allow the actual page that they want to access
  }, [route, allowedRoles]);

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 font-bold">Checking Permissions...</p>
      </div>
    );
  }

  return <>{children}</>;
}
