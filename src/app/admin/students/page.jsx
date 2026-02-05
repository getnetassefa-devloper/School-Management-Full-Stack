"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState, useEffect } from "react";
import apiRequest from "@/lib/api";
export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getStudents() {
      try {
        const res = await apiRequest("/admin/students/list");
        const data = await res.json();
        console.log("The data---->", data);

        if (!res.ok) {
          throw new Error(data.error || "Fetching error");
        }
        setStudents(data);
      } catch (err) {
        setError(err.message);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    }
    getStudents();
  }, []);

  if (loading) return <p>Loading....</p>;

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <p>{error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Gender</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="p-2 m-3">
                {students.map((stud) => {
                  console.log(`${stud.role}`);
                  return (
                    <TableRow key={stud.id}>
                      <TableCell>{stud.fullName}</TableCell>
                      <TableCell>{stud.email}</TableCell>
                      <TableCell>{stud.gender}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          {!loading && students.length === 0 && !error && (
            <p className="text-center py-10 text-muted-foreground">
              No students found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}