"use client";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LogIn() {
  const route = useRouter();

  const handleForm = async (prevState, formData) => {
    // 1. Extract values from formData
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const resp = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // 2. ONLY CALL THIS ONCE
      const data = await resp.json();

      if (resp.ok) {
        console.log("Login Datas---->", data);
        const user = data.user;
        alert("Log In successful");

        //Store tokens to the browser
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(user))

        // Role based access
        if (user.role === "ADMIN") route.push("/admin/dashboard");
        else if (user.role === "TEACHER") route.push("/teacher/classes");
        else route.push("/navbar");


        return { success: true };
      } else {
        // Use the 'data' variable we already created above
        console.log("Error data from server:", data.error);
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (err) {
      console.error("Connection Error:", err);
      return { success: false, error: "Cannot connect to server (Port 5000)" };
    }
  };

  // useActionState manages 'isPending' for the button automatically
  const [state, formAction, isPending] = useActionState(handleForm, null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="border rounded-4xl py-2">
          <CardTitle className="text-2xl font-bold flex justify-center">
            Sign In
          </CardTitle>
          <CardDescription className="flex justify-center">
            Sign in to School Management System
          </CardDescription>
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md mt-4 text-sm">
              {state.error}
            </div>
          )}
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-4 mt-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>

          <CardFooter className="pt-6">
            {/* FIXED: Removed quotes from isPending */}
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-zinc-800"
              disabled={isPending}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
