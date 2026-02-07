"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, } from "recharts";

// Data example
const CLASS_ATTENDENCE = {
 "ALL": [
    { department: "Computer Science", present: 25, absent: 3 },
    { department: "HNS", present: 20, absent: 40 },
    { department: "Fashion Design", present: 25, absent: 12 },
    { department: "WDDA", present: 30, absent: 10 },
  ],
  "Computer Science": [
    { name: "Tues", present: 25, absent: 10 },
    { name: "Wend", present: 25, absent: 10 },
    { name: "Thur", present: 100, absent: 30 },
  ],
 "HNS": [
    { name: "Thur", present: 15, absent: 33 },
    { name: "Thur", present: 50, absent: 9 },
    { name: "Thur", present: 40, absent: 10 },
  ],
  "COMING": [
    { name: "Thur", present: 0, absent: 0 },
    { name: "Thur", present: 0, absent: 0 },
    { name: "Thur", present: 0, absent: 0 },
  ],
};

export default function AttendenceTracker({ userRole, ...props }) {
  const [selectedView, setSelectedView] = useState(
    userRole === "ADMIN" ? "ALL" : "COMING",
  );

  const AttendenceData =
    userRole === "ADMIN" && selectedView === "ALL"
      ? CLASS_ATTENDENCE["ALL"]
      : CLASS_ATTENDENCE[selectedView] || [];

      // console.log("Check 1 ---> ",AttendenceData)

      const axisKey= selectedView==="ALL"?"department":"name";
      // console.log('Chart Debugger',{
      // view:selectedView,
      // payload:AttendenceData,
      // axis : axisKey
      // })

  return (
    <div className="h-fit w-full">
      <Card className='h-90%'>
        <CardHeader>
          <CardTitle>Attendence Tracker</CardTitle>
          <CardDescription>
            {selectedView === "ALL" ? (
              <p>School Students Attendence Status</p>
            ) : (
              `Class : Coming Soon for class Attendence.`
            )}
          </CardDescription>
          {userRole === "ADMIN" ? (
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Track the School Attendence " />
              </SelectTrigger>

              <SelectContent className='flex flex-row justify-between gap-6'>
                <SelectGroup className='p-2 border my-3'>
                  <SelectLabel>All School Attendence</SelectLabel>
                  <SelectItem className='p-2' value="ALL">All Students</SelectItem>
                </SelectGroup>

                <SelectGroup className='p-2 border my-3'>
                  <SelectLabel>IT Classes</SelectLabel>
                  <SelectItem className='p-2' value="Computer Science">
                    Computer Scienc
                  </SelectItem>
                  <SelectItem className='p-2' value="WDDBA">
                    Web Dev and DB Administration
                  </SelectItem>
                </SelectGroup>


                <SelectGroup className='p-2 border my-3'>
                  <SelectLabel>Fashion Technology</SelectLabel>
                  <SelectItem value="Fashion Design" className='p-2'>
                   Fashion Design Technology
                  </SelectItem>
                  <SelectItem value="Garment">Garment</SelectItem>
                </SelectGroup>
                <SelectGroup className='p-2 border my-3'>
                  <SelectLabel>Teachers Attendence</SelectLabel>
                  <SelectItem value="Fashion Design">
                    Computer Scienc
                  </SelectItem>
                  <SelectItem value="Fashion Design">Fashion Design</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="My Class Attendence" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>IT Classes</SelectLabel>
                  <SelectItem value="Computer Science">
                    Computer Scienc
                  </SelectItem>
                  <SelectItem value="HNS">Banana</SelectItem>
                  <SelectItem value="WDDBA">
                    Web Dev and DB Administration
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </CardHeader>
 

        <CardContent className='h-[350px] w-[300px]'>
          <div className='h- w-75%'></div>
          <ResponsiveContainer width="150" height="300"   >
            <BarChart   data={AttendenceData} >
              <XAxis 
              dataKey={axisKey} 
              fontSize={15} 
              interval="preserveStart"
              angle={0}
              textAnchor="end"
              height={40}
              
              />
              <YAxis fontSize={15} />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(165, 42, 42)",
                }}
              />
              <Legend />
              <Bar
                dataKey="present"
                fill="#4CBB17"
                radius={[4, 4, 0, 0]}
                name="Present"
              />
              <Bar
                dataKey="absent"
                fill="#EE4B2B"
                radius={[4, 4, 0, 0]}
                name="Absent"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
