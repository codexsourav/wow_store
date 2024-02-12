import { model, models, Schema } from "mongoose";
import { order } from "~/utils/modelData.mjs";

const orderSchema = new Schema(order);

export default models.tmporder || model("tmporder", orderSchema);
