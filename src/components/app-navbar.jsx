"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navData = {
  ADMIN: [
    {
      title: "School Managment System",
      type: "dropdown",
      content: [
        {
          title: "Student Managment",
          href: "/students",
          desc: "Manage Students",
        },
        {
          title: "Teacher Managment",
          href: "/teachers",
          desc: "Manage Teachers",
        },
        {
          title: "User Permisson",
          href: "/admin/roles",
          desc: "Manage User Role",
        },
      ],
    },
    { title: "Reports", type: "link", href: "/admin/reports" },
  ],
  STUDENT: [
    {
      title: "My Acadamic",
      type: "dropdown",
      content: [
        {
          title: "My Grade",
          href: "/student/grade",
          desc: "View my Grade report",
        },
        {
          title: "Exam Schedule",
          href: "/student/exam/schedule",
          desc: "Exams Schedule ",
        },
      ],
    },
  ],
  TEACHER: [],
};

export default function UserNavbar({ userRole = "ADMIN" }) {
  const activeUser = navData[userRole] || [];
  if (activeUser.length == 0) {
    // console.log('No Role Detected')
    return null;
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
      {/* Brand / Logo */}
      <div className="  font-bold text-xl tracking-tighter">
        SATA<span className="text-blue-600"> College</span>
      </div>

      {/* Daynamic Navigation Based on the user Role */}
      <NavigationMenu className='flex-1 flex flex-col gap-4 '>
        <NavigationMenuList className='flex flex-row justify-between gap-3j'>
          {activeUser.map((item, index) =>
            item.type === "dropdown" ? (
              
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className='flex'>
                    <ul className=" flex-1 w-[180px] gap-3 p-4">
                      {item.content.map((subItem) => (
                        <li key={subItem.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              )}
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.title}
                              </div>
                              <p>{subItem.desc}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              
            ) : (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild>
                  <Link href={item.href} className={navigationMenuTriggerStyle}>
                    <div className="text-sm font-medium leading-none">
                      {item.title}
                    </div>
                    <p>{item.desc}</p>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
