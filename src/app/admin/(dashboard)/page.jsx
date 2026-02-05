import ProtectedRoute from "@/components/ProtectedRoute";
import StudentsList from '@/app/admin/students/page'
export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]} className='p-3'>
        <div className=" flex flex-col justify-center gap-3 p-5">
      <h1 className='text-2xl font-bold flex justify-center'>Welcome, Admin!</h1>
      {/* <StudentsList/> */}
        </div>
    </ProtectedRoute>
  );
}