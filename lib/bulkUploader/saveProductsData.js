import { convertToSlug } from "~/middleware/functions";
import customIdNew from "custom-id-new";
import getImageNameFromUrl from "~/lib/bulkUploader/getImageNameFromUrl";
import productModel from "models/product";

const saveProductData = async (data) => {
    var allProductsData = [];
    for (let i = 0; i < data.length; i++) {
        const random = "P" + customIdNew({ randomLength: 4, upperCase: true });
        const element = data[i];
        const watchData = data[i].watchData.filter;
        var attributes = []
        var variants = []
        for (const key in watchData) {
            if (watchData.hasOwnProperty(key)) {
                attributes.push({
                    label: watchData[key].toLowerCase().trim(),
                    value: watchData[key].toLowerCase().trim(),
                    for: key.toLowerCase().trim(),
                });
                variants.push({
                    color: null,
                    attr: watchData[key].toLowerCase().trim(),
                    price: element.watchData.mrp,
                    sku: element.watchData.sku,
                    qty: element.watchData.quantity || 0,
                });
            }
        }
        // allProductsData.push
        const ProductData = ({
            "name": element.watchData.productTitle,
            "slug": convertToSlug(element.watchData.productTitle, true),
            "productId": random,
            "unit": element.unitInfoData.unit,
            "unitValue": element.unitInfoData.unitValue || 1,
            "price": element.watchData.mrp,
            "discount": element.watchData.discount,
            "description": element.watchData.description,
            "shortDescription": element.watchData.shortDescription,
            "type": "variable",
            "image": [
                {
                    "name": getImageNameFromUrl(element.watchData.image),
                    "url": element.watchData.image,
                }
            ],
            "gallery": element.watchData.gallery.map((e, i) => ({
                "name": getImageNameFromUrl(e),
                "url": e,
            })),
            "categories": [
                element.categoriesData.category.toLowerCase(),
            ],
            "subcategories": element.categoriesData.subcategories,
            "brand": element.brandData.brand.toLowerCase(),
            "trending": element.watchData.trending,
            "new": element.watchData.isnew,
            "bestSelling": element.watchData.bestseller,
            "quantity": element.watchData.quantity || 0,
            "sku": element.watchData.sku,
            "colors": [],
            "attributes": attributes,
            "variants": variants,
            "review": [],
            "question": [],
            "seo": {
                "title": element.watchData.productTitle,
                "description": element.watchData.shortDescription,
                "image": [
                    {
                        "name": getImageNameFromUrl(element.watchData.image),
                        "url": element.watchData.image,
                    }
                ]
            },
            "specification": Object.entries(element.watchData.specification).map(([title, value]) => ({
                title,
                value
            })),
            "isPublic": element.watchData.isPublic == 1,
        });

        await productModel.updateOne({ "sku": element.watchData.sku }, { $set: ProductData }, { upsert: true })
    }
    // console.log(allProductsData);
    // await productModel.insertMany(allProductsData);

}

export default saveProductData;