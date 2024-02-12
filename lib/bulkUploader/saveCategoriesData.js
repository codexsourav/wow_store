import categoryModel from "models/category";
import getImageNameFromUrl from "./getImageNameFromUrl";
const customIdNew = require("custom-id-new");

const saveExcelCatData = async (categoryList) => {

    for (let i = 0; i < categoryList.length; i++) {
        const element = categoryList[i];
        const catagoryDb = await categoryModel.findOne({ "name": element.list });

        if (catagoryDb) {
            for (let j = 0; j < element.subcategories.length; j++) {
                const cat = element.subcategories[j];
                await categoryModel.updateOne(
                    { "name": element.list },
                    {
                        $set: {
                            "name": element.list,
                            "slug": element.list.toLowerCase(),
                        },
                        $addToSet: {
                            "subCategories": {
                                "name": cat,
                                "slug": cat.toLowerCase(),
                            }
                        }
                    }
                );

            }

        } else {
            const random = customIdNew({ randomLength: 2, lowerCase: true });
            const newCat = new categoryModel({
                "categoryId": random,
                "topCategory": false,
                "name": element.list,
                "slug": element.list.toLowerCase(),
                "icon": [
                    {
                        "name": getImageNameFromUrl(element.image),
                        "url": element.image,
                    }
                ],
                "subCategories": element.subcategories.map((e, i) => ({ "name": e, "slug": e.toLowerCase() })),
            });
            await newCat.save();
        }
    }
}

export default saveExcelCatData;