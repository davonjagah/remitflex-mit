import * as paymentRoute from "../apiRoutes/paymentRoutes";
import { protectedGet, protectedPost } from "../apiHelper";
import { IRemitPayment, IBillPayment } from "@/types/services.types";

export const paymentControl = {
  getNGNrate: async () => {
    return await protectedGet(paymentRoute.currentRate);
  },
  remitPayment: async (remit: IRemitPayment) => {
    return await protectedPost(paymentRoute.remitPayment, remit);
  },
  billPayment: async (bill: IBillPayment) => {
    return await protectedPost(paymentRoute.billPayment, bill);
  }
};
