import { model, models, Schema } from "mongoose";
import { blogs } from "~/utils/modelData.mjs";

const blogSchema = new Schema(blogs);

export default models.blogs || model("blogs", blogSchema);
