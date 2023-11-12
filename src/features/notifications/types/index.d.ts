/**
 * All notification calls must provide the following data
 */
export interface NotificationOptions {
  message: string;
  title: string;
  actions?: {
    action: string;
    label: string;
    url: string;
  }[];
}

/**
 * Notification POST request body
 */
export interface NotificationBody extends NotificationOptions {
  topic: string;
  url: string;
}
