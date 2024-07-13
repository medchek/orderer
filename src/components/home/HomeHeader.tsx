import Image from "next/image";
import Link from "next/link";
import HomeSideMenu from "../menu/HomeSideMenu";
import AccountActions from "../menu/AccountActions";
import { getSession, isAdminSession } from "@/app/api/auth/[...nextauth]/route";
import ShoppingCart from "@/features/products/components/ShoppingCart";

export default async function HomeHeader() {
  const session = await getSession();

  const isAdmin = isAdminSession(session);

  return (
    <header className="relative z-10 flex h-20 min-h-[5rem] w-full items-start justify-between pt-2">
      <Link className="relative size-12" href="..">
        <Image src="/trb-logo.png" alt="TRB Eshop Logo" fill priority />
      </Link>

      <div className="flex h-12 items-center gap-4 text-sm">
        <nav className="flex gap-4">
          <Link href="../products" className="text-neutral-500 hover:underline">
            Produits
          </Link>
          {session !== null ? (
            <Link
              href="../orders"
              className="hidden text-neutral-500 hover:underline lg:inline"
            >
              Vos Commandes
            </Link>
          ) : null}
        </nav>

        <Link href="../" className="text-blue-500 hover:underline">
          <span className="flex items-center gap-1">
            <span>Commander</span>
          </span>
        </Link>
        <ShoppingCart />
        <AccountActions isAdmin={isAdmin} />
        <HomeSideMenu />
      </div>
    </header>
  );
}
