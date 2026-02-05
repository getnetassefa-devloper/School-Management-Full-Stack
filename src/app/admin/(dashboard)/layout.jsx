import AdminNavigationBar from "@/components/admin/NavBar";
// import AdminSideBar from '@/components/admin/SideBar'
import UserSidebar from "@/components/app-sidebar";
import UserNavbar from '@/components/app-navbar'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  const userRole = "ADMIN";
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <UserSidebar userRole={userRole} />

        {/* The collapse trigger */}
        <SidebarTrigger />
        {/* The folloing is the navigation area for the main content page. */}
        <div className="flex flex-col flex-1">
          <UserNavbar userRole={userRole} />
          {/* <h1>Below,Below</h1> */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
