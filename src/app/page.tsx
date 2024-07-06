import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import OrderForm from "@/components/home/order-form/OrderForm";
import DisplaySelectedProducts from "@/components/home/order-form/OrderFromDisplaySelectedProducts";
import { getSession } from "./api/auth/[...nextauth]/route";
import { prisma } from "../../prisma/db";
import { AccountDetail } from "@/features/settings/types";

export default async function Home() {
  const session = await getSession();

  const userDetail = !session?.user
    ? null
    : await prisma.user.findFirst({
        where: {
          id: session.user.id,
        },
        select: {
          name: true,
          address: true,
          wilayaCode: true,
          townCode: true,
          phone: true,
        },
      });
  const isAdmin = session?.user?.email === process.env.GOOGLE_ADMIN_EMAIL;

  const accountDetail: AccountDetail | null = !userDetail
    ? null
    : {
        address: userDetail.address,
        fullName: userDetail.name,
        phone: userDetail.phone,
        wilaya: userDetail.wilayaCode,
        town: userDetail.townCode,
      };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 xl:px-10 2xl:px-56">
      <HomeHeader isAdmin={isAdmin} />
      <DisplaySelectedProducts />
      <OrderForm accountDetail={accountDetail} />
      <Footer />
    </main>
  );
}
