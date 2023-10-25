import SettingsLink from "@/features/settings/components/SettingsLink";
import { BiSolidUserDetail } from "react-icons/bi";
import { FiGlobe } from "react-icons/fi";
import { getSession } from "../api/auth/[...nextauth]/route";
import { RedirectType, redirect } from "next/navigation";
import HomeHeader from "@/components/home/HomeHeader";
import BackButton from "@/components/BackButton";
import { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Paramètres - TRB Eshop",
  description: "Modifez vos paramètres",
};

export default async function DashboardSettingsLayout({ children }: Props) {
  const session = await getSession();

  if (!session) redirect("/login", RedirectType.replace);

  return (
    <>
      <div
        id="settings-lyt"
        className="flex h-full grow flex-col px-4 xl:px-10 2xl:px-56"
      >
        <HomeHeader />
        <div className="flex h-10 items-center gap-1 text-neutral-100">
          <BackButton />
          <h1 className="mb-1 text-xl font-semibold">Paramètres</h1>
        </div>
        <div id="settings" className="flex h-full w-full gap-4 overflow-hidden">
          <section
            id="settings-tabs"
            className="flex h-full w-60 min-w-[15rem] grow-0 flex-col gap-2 xl:w-72 xl:min-w-[18rem]"
          >
            <SettingsLink
              href="./account"
              label="Information"
              description="Modifiez vos informations de livraison"
              Icon={<BiSolidUserDetail className="h-6 w-6" />}
            />
            <SettingsLink
              href="./ui"
              label="Application"
              description="Modifiez la langue et le thème de l'interface"
              Icon={<FiGlobe className="h-6 w-6" />}
            />
          </section>
          <section className="h-full w-full grow">{children}</section>
        </div>
      </div>
    </>
  );
}
