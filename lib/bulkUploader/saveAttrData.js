import attributes from "models/attributes";

const saveAttrData = async (data) => {
    for (let i = 0; i < data.length; i++) {
        const watchData = data[i].watchData.filter;
        for (const key in watchData) {
            if (watchData.hasOwnProperty(key)) {

                if (key?.length !== 0 && watchData[key]?.length !== 0) {
                    await attributes.updateOne(
                        { name: key },
                        {
                            $addToSet: {
                                values: {
                                    name: watchData[key].toLowerCase().trim(),
                                    value: watchData[key].toLowerCase().trim(),
                                }
                            }
                        },
                        { upsert: true }
                    );
                }

            }
        }
    }
}

export default saveAttrData;
