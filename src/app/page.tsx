import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import OrderForm from "@/components/home/order-form/OrderForm";
import DisplaySelectedProducts from "@/components/home/order-form/SelectedProductsDisplay";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 xl:px-10 2xl:px-56">
      <HomeHeader />
      <DisplaySelectedProducts />

      <OrderForm />

      <Footer />
    </main>
  );
}
