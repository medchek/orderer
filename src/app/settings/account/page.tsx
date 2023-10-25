import SettingsAccountForm from "@/features/settings/components/SettingsAccountForm";

export default async function SettingsAccountPage() {
  return (
    <section className="flex h-full grow flex-col overflow-hidden text-neutral-200">
      {/* <p className="text-sm text-neutral-500">
        Tout les champs sont optionnels
      </p> */}
      <h1 className="text-lg text-neutral-950 dark:text-neutral-50">
        Informations
      </h1>
      <h3 className="text-sm text-neutral-500">
        Modifez vos informations de livraison (Tout les champs sont optionnels)
      </h3>
      <SettingsAccountForm />
    </section>
  );
}
