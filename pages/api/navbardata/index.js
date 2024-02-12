import { getBrandCategoryData } from "~/lib/dataLoader/gallery";


export default async function apiHandler(req, res) {
    const data = await getBrandCategoryData();
    res.status(200).json(data);
}