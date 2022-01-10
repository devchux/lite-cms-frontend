import { NotificationManager } from "react-notifications";

export const useNotification = () => {
  const notify = (type, message) => {
    switch (type) {
      case "info":
        NotificationManager.info(message, "Info", 1500);
        break;
      case "success":
        NotificationManager.success(message, "Success", 1500);
        break;
      case "warning":
        NotificationManager.warning(message, "Warning", 1500);
        break;
      case "error":
        NotificationManager.error(message, "Error", 1500);
        break;
      default:
        NotificationManager.info(message, "Info", 1500);
        break;
    }
  };

  return {
    notify,
  };
};
