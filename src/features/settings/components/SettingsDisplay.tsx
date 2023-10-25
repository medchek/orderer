import React from "react";
import SettingsLink from "./SettingsLink";
import { BiSolidUserDetail } from "react-icons/bi";
import { FiGlobe } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
}

export default async function SettingsDisplay({ children }: Props) {
  return (
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
          href="./app"
          label="Application"
          description="Modifiez la langue et le thème de l'interface"
          Icon={<FiGlobe className="h-6 w-6" />}
        />
      </section>
      <section className="h-full w-full grow">{children}</section>
    </div>
  );
}
