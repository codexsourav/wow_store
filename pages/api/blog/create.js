import customId from "custom-id-new";
import sessionChecker from "~/lib/sessionPermission";
import { convertToSlug } from "../../../middleware/functions";
import brandModel from "../../../models/brand";
import categoryModel from "../../../models/category";
import BlogModel from "../../../models/blog";
import dbConnect from "../../../utils/dbConnect";
import { parseFormMultiple } from "../../../utils/parseForm";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function apiHandler(req, res) {
  const { method } = req;
  if (!(await sessionChecker(req, "blog")))
    return res
      .status(403)
      .json({ success: false, message: "Access Forbidden" });

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const category = await categoryModel.find({});
        const brand = await brandModel.find({});
        res
          .status(200)
          .json({ success: true, category, brand });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
      }
      break;
    case "POST":
      try {
        const data = await parseFormMultiple(req);
        const {
          name,
          description,
          short_description,
          category,
          brand,
          displayImage,
          seo,
        } = data.field;
        const random = "B" + customId({ randomLength: 4, upperCase: true });
        const categories = await JSON.parse(category);
        const image = await JSON.parse(displayImage);
        const seoData = await JSON.parse(seo);

        let productData;
          productData = {
            name: name.trim(),
            slug: convertToSlug(name, true),
            blogId: random,
            shortDescription: short_description.trim(),
            description,
            image,
            categories,
            brand: brand.trim(),
            seo: seoData,
          };
      
        await BlogModel.create(productData);
        res.status(200).json({ success: true });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
