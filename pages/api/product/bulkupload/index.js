import { makeWorkExcelData, makeWorkExcelCategoriesData } from "~/lib/bulkUploader/structureExcelData";
import dbConnect from "~/utils/dbConnect";
import attributes from "models/attributes";
import saveExcelCatData from "~/lib/bulkUploader/saveCategoriesData";
import saveBrandData from "~/lib/bulkUploader/saveBrandData";
import saveProductData from "~/lib/bulkUploader/saveProductsData";
import saveAttrData from "~/lib/bulkUploader/saveAttrData";

export default async function apiHandler(req, res) {

    const { body } = req;

    try {
        await dbConnect();

        const data = makeWorkExcelData(body);
        const categoryList = makeWorkExcelCategoriesData(data)

        await saveExcelCatData(categoryList);
        await saveBrandData(data);
        await saveAttrData(data)
        // console.log(data);
        await saveProductData(data);

        // console.log(data);

        res.send({ "total": data.length, "success": false, "message": `Import Successfully ${data.length} Products` });
    } catch (error) {
        console.log(error);
        res.status(401).send({ "error": error.toString(), "message": error.stack, "success": false });
    }
}
