import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardShippingLocationsDisplay from "@/features/shipping-locations/components/DashboardShippingLocationsDisplay";
import DashboardShippingLocationsToolbar from "@/features/shipping-locations/components/DashboardShippingLocationsToolbar";

export default async function ShippingLocations() {
  return (
    <div
      id="dashboard-shipping-locations"
      className="flex grow flex-col pl-6 pt-3"
    >
      <DashboardHeader
        label="Points de livraisons"
        description="Ajoutez les points de bureaux de livraisons des differents wilayas et leurs communes"
      />
      <DashboardShippingLocationsToolbar />
      <DashboardShippingLocationsDisplay />
    </div>
  );
}
