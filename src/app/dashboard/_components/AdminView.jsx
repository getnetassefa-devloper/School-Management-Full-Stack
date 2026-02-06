"use client";
import { Card, CardContent, CardHeader, CardTitle,CardDescription } from "@/components/ui/card";
import { Users, UserPlus, CreditCard, TrendingUp,GraduationCap,DollarSign} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function AdminView() {
  const registrationData = [
    { month: "Jan", count: 45 },
    { month: "Feb", count: 52 },
    { month: "Mar", count: 48 },
    { month: "Apr", count: 70 },
  ];

  return (
    <div className="">

    <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-2">

      {/* Statistics card */}
      <StatCard
        title="Total Students"
        trend="+12%"
        value="+1,234"
        icon={Users}
      />
      <StatCard
        title="Active Teachers"
        trend="+2%"
        value="19"
        icon={GraduationCap}
      />
      <StatCard
        title="Fee Status"
        trend="23,400 Birr This Month"
        value=""
        icon={DollarSign}
      />
      <StatCard
        title="New Registrals"
        trend="Coming Soon"
        value="Coming Soon"
        icon={Users}
      />
    </div>


      {/* Visualization of Data */}


<div className="grid gap-4 my-8 sm:grid-cols-1 md:grid-cols-7">
        
        {/* Registration Chart - Spans 4 columns */}
        <Card className="col-span-4">
          <CardHeader className='flex flex-col gap-2 justify-center items-center'>
            <CardTitle className='flex font-bold p-2 justify-center'>Enrollment Trends</CardTitle>
            <CardDescription className='font-medium p-2'>Monthly student registrations for 2026</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="6%" stopColor="#2563eb" stopOpacity={0.8}/>
                    <stop offset="96%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#2563eb" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions / Recent Activity - Spans 3 columns */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition">
                <span className="flex items-center gap-2"><Users size={18}/> Student Listing</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">View All</span>
             </button>
             <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition">
                <span className="flex items-center gap-2"><CreditCard size={18}/> Fee Reports</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Generate</span>
             </button>
          </CardContent>
        </Card>
      </div>
    </div>

  );
}

export function StatCard({
  title,
  trend,
  value,
  icon: Icon,
  color = "text-muted-foreground",
}) {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <div>{Icon ? <Icon size={18} /> : null}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={color}>{value}</div>
          <p className="">{trend}</p>
        </CardContent>
      </Card>
    </div>
  );
}
