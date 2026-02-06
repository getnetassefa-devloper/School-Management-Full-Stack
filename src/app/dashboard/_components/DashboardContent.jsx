"use client";
import AdminView from "./AdminView";
// import StudentView from './_components/StudentView'
// import TeacherView from './_components/TeacherView'
export default function DashboardContainer({ userRole, ...props }) {
  const userView = {
    ADMIN: AdminView,
    STUDENT: () => <p>Student Feature coming soon</p>,
    TEACHER: () => <p>Teacher Feature coming soon</p>,
  };

  const SelectedView = userView[userRole];

  return (
    <div className="">
      {SelectedView ? <SelectedView /> : <p>Sorry,Access denied.</p>}
    </div>
  );
}
