import customIdNew from "custom-id-new";
import getImageNameFromUrl from "./getImageNameFromUrl";
import brandModel from "models/brand";

const saveBrandData = async (data) => {


    for (const item of data) {
        const brand = item.brandData;
        const brandData = await brandModel.findOne({ name: brand.brand });

        if (!brandData) {
            const random = customIdNew({ randomLength: 2, lowerCase: true });
            const newBrand = {
                brandId: random,
                name: brand.brand,
                image: [
                    {
                        "name": getImageNameFromUrl(brand.image),
                        "url": brand.image,
                    }
                ],
                slug: brand.brand.toLowerCase(),
                topBrand: false,
            };
            const addNewBrand = new brandModel(newBrand);
            await addNewBrand.save();
        }
    }


};

export default saveBrandData;
