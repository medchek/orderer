// import AuthProvider from "@/components/AuthProvider";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function Dashboard() {
  return (
    <div id="dashboard-products" className="flex grow flex-col py-3 pl-6">
      <DashboardHeader label="Acceuil" />
      {/* <DashboardProductsToolbar />
      <DashboardProductDisplay /> */}
    </div>
  );
}
