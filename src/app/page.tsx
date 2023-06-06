import Footer from "@/components/Footer";
import OrderForm from "@/components/order-form/OrderForm";
import ProductDetail from "@/components/order-form/ProductDetails";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-10 2xl:px-64">
      <header className="mb-1">
        <Image
          className="relative"
          src="/trb-logo.png"
          alt="TRB Eshop Logo"
          width={80}
          height={80}
          priority
        />
        <p className="text-primary text-sm font-semibold text-center">E-Shop</p>
      </header>
      <ProductDetail />

      <OrderForm />

      <Footer />
    </main>
  );
}
