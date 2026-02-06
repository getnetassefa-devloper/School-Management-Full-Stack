import ProtectedRoute from "@/components/ProtectedRoute";
import StudentsList from '@/app/admin/students/page'
import DashboardMainPage from '@/app/dashboard/page'
export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]} className='p-3'>
        <div className=" flex flex-col justify-center gap-3 p-5">
      <h1 className='text-2xl font-bold flex justify-center'>Admin, This is your School Managment System</h1>
      <DashboardMainPage userRole='ADMIN'/>
      {/* <StudentsList/> */}
        </div>
    </ProtectedRoute>
  );
}