"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, DollarSign, Activity } from "lucide-react";
export default function AdminView() {
  return (
    <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      <Card className="flex flex-col justify-center w-fit">
        <CardHeader className="">
          <CardTitle className='flex flex-col justify-center'>
            <Users className='flex  justify-center items-center' />
            <h2> Students  Report </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>Total Students </div>
          <p className="">+12763 students,this year</p>
          <p>12% increase from last year.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {" "}
            <Activity /> Active Teachers
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            {" "}
            <GraduationCap /> New Registrals
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            {" "}
            <DollarSign /> Fee Report
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
