import sessionChecker from "~/lib/sessionPermission";
import attrModel from "../../../models/attributes";
import brandModel from "../../../models/brand";
import CategoryModel from "../../../models/category";
import colorModel from "../../../models/colors";
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
        const { slug } = req.query;
        const product = await BlogModel.findOne({ slug: slug });
        const category = await CategoryModel.find({});
        const brand = await brandModel.find({});
        res
          .status(200)
          .json({ success: true, product, category, brand });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
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
          pid,
          displayImage,
          seo,
        } = data.field;
        const categories = await JSON.parse(category);
        const image = await JSON.parse(displayImage);
        const seoData = await JSON.parse(seo);

        let productData;
          productData = {
            name: name.trim(),
            shortDescription: short_description.trim(),
            description,
            categories,
            brand: brand.trim(),
            image,
            seo: seoData,
          };
    

        await BlogModel.findByIdAndUpdate(pid, productData);

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
