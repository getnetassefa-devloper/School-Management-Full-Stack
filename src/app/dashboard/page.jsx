'use client'
import AdminView from "./_components/AdminView";
// import StudentView from './_components/StudentView'
// import TeacherView from './_components/TeacherView'

export default function DashboardMainPage({ userRole, ...props }) {
  const userView = {
    ADMIN: AdminView,
    STUDENT: () => <p>Student Feature coming soon</p>,
    TEACHER:() => <p>Teacher Feature coming soon</p>
  };
const SelectedView=userView[userRole];

  return (
    <div className="">
      <h1 className="">Wellcome to Dashboard</h1>
      <div className="">{SelectedView? (<SelectedView/>) : ( <p>Sorry,access denied.</p>)}</div>
    </div>
  );
}
