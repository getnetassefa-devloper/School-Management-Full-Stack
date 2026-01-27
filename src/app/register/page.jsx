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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Registration() {
  const route = useRouter();

  // State for shadcn Selects
  const [role, setRole] = useState("STUDENT");
  const [gender, setGender] = useState("MALE");

  const handleForm = async (prevState, formData) => {
    // 1. Extract values from formData
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const genderValue = formData.get("gender");
    const roleValue = formData.get("role");

    try {
      const resp = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fullName, 
          email, 
          password, 
          gender: genderValue, 
          role: roleValue 
        }),
      });

      // 2. ONLY CALL THIS ONCE
      const data = await resp.json();

      if (resp.ok) {
        alert("Registration Successful");
        route.push("/login");
        return { success: true };
      } else {
        // Use the 'data' variable we already created above
        console.log("Error data from server:", data);
        return { success: false, error: data.error || "Registration failed" };
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
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Join the School Management System</CardDescription>
          {state?.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md mt-4 text-sm">
              {state.error}
            </div>
          )}
        </CardHeader>

        <form action={formAction}>
          {/* Hidden inputs let the form capture the Select values */}
          <input type="hidden" name="gender" value={gender} />
          <input type="hidden" name="role" value={role} />

          <CardContent className="space-y-4 mt-2">
            <div className="space-y-1">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" placeholder="Getnet Assefa" required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="abc@gmail.com" required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <Label>Role</Label>
                <Select onValueChange={setRole} defaultValue={role}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="TEACHER">Teacher</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Gender</Label>
                <Select onValueChange={setGender} defaultValue={gender}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-6">
            {/* FIXED: Removed quotes from isPending */}
            <Button type="submit" className="w-full bg-black text-white hover:bg-zinc-800" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}