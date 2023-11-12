import ky from "ky";
import { NotificationBody } from "../types";
import { capitalizeFirst } from "@/lib/utils";

interface NotifyOrderCreatedOptions {
  orderCode: string;
  phone: string;
  wilaya: string;
  town: string;
}

/**
 * Notification for when a user creates an order
 * @param opts notification info
 */
export const notifyOrderCreated = async ({
  orderCode,
  phone,
  town,
  wilaya,
}: NotifyOrderCreatedOptions) => {
  const body: NotificationBody = {
    topic: process.env.NOTIFICATION_CHANNEL_NAME ?? "trbeshop",
    url: `${process.env.APP_HOST}/orders/${orderCode}`,
    title: "Nouvelle Commande",
    message: `Une nouvelle commande a été créée par le numero ${phone} depuis ${capitalizeFirst(
      wilaya,
    )} - ${capitalizeFirst(town)}. (code: ${orderCode})`,
    actions: [
      {
        action: "view",
        label: "Voir",
        url: `${process.env.APP_HOST}/orders/${orderCode}`,
      },
    ],
  };
  await ky.post("https://ntfy.sh", { json: body }).json();
};
