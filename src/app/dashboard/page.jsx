import DashboardContainer from '@/app/dashboard/_components/DashboardContent'
export default function DashboardMainPage({ userRole, ...props }) {
  
  return (
    <div className="">
      <h1 className="">Wellcome to Dashboard</h1>
      <div className="">{SelectedView? (<SelectedView/>) : ( <p>Sorry,access denied.</p>)}</div>
    </div>
  );
}
