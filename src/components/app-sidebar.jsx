"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  User,
  BookOpen,
  Settings,
  LayoutDashboard,
  GraduationCap,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const navData = {
  ADMIN: [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Manage Students", url: "/admin/students", icon: GraduationCap },
    { title: "Manage Teachers", url: "/admin/teachers", icon: BookOpen },
    { title: "Setting", url: "/admin/settings", icon: Settings },
  ],
  // TEACHER : [],
  STUDENT: [
    { title: "Profile", url: "/student/profile", icon: User },
    { title: "Class Schedule", url: "/student/class", icon: LayoutDashboard },
    { title: "Grade", url: "/student/grade", icon: LayoutDashboard },
  ],
  // FINANCE : []
};

export default function UserSidebar({ userRole = "ADMIN", ...props }) {
  const activeUser = navData[userRole] || [];
  if (activeUser.length < 1) {
    console.log("No Acctive User.");
    return null;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu - {userRole}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeUser.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
       <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-500 hover:text-red-600">
              <LogOut />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
