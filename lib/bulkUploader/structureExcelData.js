const structureData = (inputData) => {

    const brandData = {
        brand: inputData.Brand,
        brandImage: inputData?.BRANDIMAGE || "",
    };

    const unitInfoData = {
        unit: inputData.UnitsInfo?.split('||')[0].split('=')[1] || "PC",
        unitValue: inputData.UnitsInfo?.split('||')[1].split('=')[1] || "1",
    };

    const categoriesData = {
        category: inputData.Categories?.split('||')[0].split('=')[1],
        categoryImage: inputData.CategoryImage?.trim() || "",
        subcategories: inputData.Categories?.split('||')[1]?.split('=')[1]?.split(',').map(subcategory => subcategory) || [],
    };

    const watchData = {
        modelNo: inputData['Model'] || inputData['Model No.'],
        mrp: inputData.MRP,
        discount: inputData.MRP - inputData.Discount,
        quantity: inputData.Quantity,
        gender: inputData.Gender || "",
        productTitle: inputData['PRODUCTNAME'],
        sku: inputData['Model'] || inputData['Model No.'],
        shortDescription: inputData.ShortDescription || "",
        description: inputData.DESCRIPTION,
        filter: {},
        specification: {},
        image: inputData.Image,
        gallery: inputData.Gallery.split(',').map(url => (url.trim())),
        trending: inputData.Trending || false,
        isnew: inputData.New || false,
        bestseller: inputData.Bestseller || false,
        isPublic: inputData.isPublic || 0,
    };

    inputData.Filter.split('||').forEach(keyValue => {
        const [key, value] = keyValue.split('=');
        if (key.length != 0 && value.length != 0) {
            watchData.filter[key.trim()] = value.trim();
        }
    });

    inputData.Specification.split('||').forEach(keyValue => {
        const [key, value] = keyValue.split('=');
        if (key?.length != 0 && value.length != 0) {
            watchData.specification[key.trim()] = value.trim();
        }
    });

    return {
        brandData,
        unitInfoData,
        categoriesData,
        watchData,
    };
};

export const makeWorkExcelData = (body) => {
    var data = [];
    for (let i = 0; i < body.length; i++) {
        const element = body[i];
        data.push(structureData(element));
    }
    return data;
}

export const makeWorkExcelCategoriesData = (workExcelData) => {
    var data = [];
    for (let i = 0; i < workExcelData.length; i++) {
        const element = workExcelData[i];
        data.push({
            "list": element.categoriesData.category,
            "subcategories": element.categoriesData.subcategories,
            "image": element.categoriesData.categoryImage,
        });
    }
    return data;
}