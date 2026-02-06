"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, DollarSign, Activity } from "lucide-react";
export default function StudentinView() {
  return (
    <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      <Card className="flex flex-col justify-center w-fit">
        <CardHeader className="">
          <CardTitle className='flex flex-col justify-center'>
            <Users className='flex  justify-center items-center' />
            <h2> My Grade </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>GPA  </div>
          <p>3.85</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {" "}
            <Activity /> Home Works
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            {" "}
            <GraduationCap /> Exam Schedules
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            {" "}
            <DollarSign />My Fee
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
