import FilterSelect from "@/components/filter/FilterSelect";
import SettingsThemeSelector from "@/features/settings/components/SettingsThemeSelector";

export default function SettingsUi() {
  return (
    <div id="ui-settings" className="h-full grow overflow-hidden px-0.5">
      <section className="mb-2">
        <h1 className="text-lg text-neutral-950 dark:text-neutral-50">
          Application
        </h1>
        <h3 className="text-sm text-neutral-500">
          Modifez la lanauge et ajustez le thème de l&apos;interface
        </h3>
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 ">
          <p className="font-semibold text-neutral-900 dark:text-neutral-200">
            Thème
          </p>
          <SettingsThemeSelector />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="font-semibold text-neutral-900 dark:text-neutral-200"
            htmlFor="lang-select"
          >
            Langue
          </label>
          <div className="relative">
            <FilterSelect
              id="lang-select"
              className="h-12 w-full px-2 dark:bg-neutral-900 lg:w-full"
            >
              <option>Français</option>
              <option>Anglais</option>
              <option>Arabe</option>
            </FilterSelect>
          </div>
        </div>
      </section>
    </div>
  );
}
