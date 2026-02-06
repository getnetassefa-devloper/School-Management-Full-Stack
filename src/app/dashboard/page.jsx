import AdminView from "./_components/AdminView";
// import StudentView from './_components/StudentView'
// import TeacherView from './_components/TeacherView'

export default function DashboardMainPage({ userRole, ...props }) {
  const user = userRole;
  const userView = {
    ADMIN: <AdminView />,
    STUDENT: <p>Student Feature coming soon</p>,
    TEACHER: <p>Teacher Feature coming soon</p>,
  };

  return (
    <div className="">
      <h1 className="">Wellcome to Dashboard</h1>
      <div className="">{userView[user] || <p>Sorry,access denied.</p>}</div>
    </div>
  );
}
