import BlogModel from "~/models/blog";
import settingsModel from "~/models/setting";
import dbConnect from "~/utils/dbConnect";

export default async function blogDetailsData(slug) {
  try {
    await dbConnect();
    const settings = await settingsModel.findOne({});
    const blog = await BlogModel.findOne({ slug: slug });

    return {
      success: true,
      blog,
      settings,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      blog: {},
      settings: {},
    };
  }
}
