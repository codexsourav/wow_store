
import brandModel from "~/models/brand";
import categoryModel from "~/models/category";
import ProductModel from "~/models/product";
import settingsModel from "~/models/setting";
import dbConnect from "~/utils/dbConnect";
import attribute from "~/models/attributes";

export default async function galleryPageData(type, query) {
  try {
    await dbConnect();
    const category = await categoryModel.find({});
    const attr = await attribute.find({});
    const brand = await brandModel.find({});
    const settings = await settingsModel.findOne({});
    const product_length = await ProductModel.estimatedDocumentCount();
    const productItemField = {
      name: 1,
      sku: 1,
      slug: 1,
      image: 1,
      brand: 1,
      unit: 1,
      unitValue: 1,
      price: 1,
      discount: 1,
      type: 1,
      variants: 1,
      quantity: 1,
      date: 1,
      review: 1,
    };
    if (type && query) {
      return {
        success: true,
        product: [],
        product_length: 0,
        category,
        settings,
        brand,
        attr,
      };
    } else {
      const product = await ProductModel.find({})
        .sort("-date")
        .limit(8)
        .select(productItemField)
        .exec();
      return {
        success: true,
        product: product,
        product_length: product_length,
        category,
        settings,
        brand,
        attr,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      product: [],
      product_length: 0,
      category: [],
      settings: {},
      brand: [],
      attr: [],
    };
  }
}

export async function getBrandCategoryData() {
  try {
    await dbConnect();
    const brand = await brandModel.find();
    const category = await categoryModel.find({});
    return { brand, category };
  } catch (error) {
    console.log(error);
    return { brand: [], category: [] };
  }
}

