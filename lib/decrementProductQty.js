import { eachSeries } from "async";
import productModel from "~/models/product";
const decrementProductQty = async (products) => {
    eachSeries(
        products,
        async (item, done) => {
            if (item.color.name || item.attribute.name) {
                const product = await productModel.findById(item._id);
                if (product) {
                    const colorName = item.color.name;
                    const attrName = item.attribute.name;
                    const variant = product.variants.find(
                        (item) => item.color === colorName && item.attr === attrName,
                    );
                    if (variant.qty != -1) {
                        variant.qty = variant.qty - item.qty;
                        product.markModified("variants");
                        await product.save(done);
                    }
                }
            } else {
                const product = await productModel.findById(item._id);
                if (product && product.quantity != -1) {
                    product.quantity = product.quantity - item.qty;
                    await product.save(done);
                }
            }
        },
        (err) => {
            if (err) {
                console.log(err);
            }
        },
    );
};

export default decrementProductQty;