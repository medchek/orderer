import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import { SuccessfulOrder } from "../types";
import { zeroPrefix } from "@/lib/utils";
interface Props {
  completedOrders: SuccessfulOrder[];
}
export default async function DashboardHomeTopWilayas({
  completedOrders,
}: Props) {
  const displayTopWilayas = () => {
    if (completedOrders.length === 0) {
      return (
        <DashboardEmptyState
          Icon={<></>}
          text="Données insuffisantes"
          subContent="Vos top wilayas apparaîtrons ici à mesure que vos ventes augmentent"
          noTranslate
          contentClassName="w-auto 2xl:w-96"
        />
      );
    } else {
      const topWilayas: {
        [wilayaCode: string]: {
          count: number;
          wilaya: {
            name: string;
            arName: string;
            code: number;
          };
        };
      } = {};

      for (let i = 0; i < completedOrders.length; i++) {
        const { wilaya } = completedOrders[i];

        if (topWilayas[wilaya.code] === undefined) {
          topWilayas[wilaya.code] = { count: 1, wilaya };
        } else {
          topWilayas[wilaya.code].count += 1;
        }
      }

      return Object.values(topWilayas)
        .sort((a, b) => {
          return b.count - a.count;
        })
        .slice(0, 4)
        .map((w) => {
          const {
            count,
            wilaya: { code, name },
          } = w;
          return (
            <div
              className="flex h-1/4 min-h-[25%] items-center justify-between"
              key={code}
            >
              <p className="text-neutral-800 dark:text-neutral-200">
                {zeroPrefix(code)} - {name}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {count} Ventes
              </p>
            </div>
          );
        });
    }
  };

  return (
    <div
      id="top-wilayas"
      className="flex h-80 min-h-[20rem] flex-col gap-2 rounded-xl bg-neutral-200 p-4 dark:bg-neutral-950"
    >
      <h2 className="h-8 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Top Wilayas
      </h2>
      <div className="flex grow flex-col">{displayTopWilayas()}</div>
    </div>
  );
}
