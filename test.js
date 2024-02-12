const data = [
    {
        "label": "120 GB",
        "value": "120 GB",
        "for": "Display"
    },
    {
        "label": "test 2",
        "value": "test 2",
        "for": "TEst"
    },
    {
        "label": "test 3",
        "value": "test 3",
        "for": "TEst"
    }
];

function combineData(arr) {
    const combinedData = {};

    arr.forEach(item => {
        const key = item.for; // Get the value of the 'for' property as key
        if (!combinedData[key]) {
            combinedData[key] = []; // Initialize an empty array if the key doesn't exist
        }
        combinedData[key].push(item); // Push the item to the array corresponding to the key
    });

    return combinedData;
}

const combined = combineData(data);
console.log(combined);
