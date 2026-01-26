import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <h1>Welcome, Admin!</h1>
      <p>Only admins can see this secret panel.</p>
    </ProtectedRoute>
  );
}