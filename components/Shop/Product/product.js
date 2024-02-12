import { Eye, Repeat, SuitHeart } from "@styled-icons/bootstrap";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImageLoader from "~/components/Image";
import ReviewCount from "~/components/Review/count";
import { postData, stockInfo } from "~/lib/clientFunctions";
import { updateComparelist, updateWishlist } from "~/redux/cart.slice";
import c from "./product.module.css";

const Product = ({
  product,
  button,
  link,
  deleteButton,
  layout,
  border,
  hideLink,
  cssClass,
}) => {
  const { session } = useSelector((state) => state.localSession);
  const settings = useSelector((state) => state.settings);
  const { wishlist: wishlistState, compare: compareState } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  
  const discountInPercent =
    Math.round((100 - (product.discount * 100) / product.price) * 10) / 10;

  const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, 
  minimumFractionDigits: 0, 
  }).format(value);
  
  function updateWishlistCount() {
    const __data = wishlistState ? wishlistState + 1 : 1;
    dispatch(updateWishlist(__data));
  }

  const addToWishList = async () => {
    try {
      if (!session) {
       return toast.warning("You need to login to create a Wishlist");
      }
      const data = {
        pid: product._id,
        id: session.user.id,
      };
      const response = await postData(`/api/wishlist`, data);
      response.success
        ? (toast.success("Item has been added to wishlist"),
          updateWishlistCount())
        : response.exists
        ? toast.warning("This Item already exists on your wishlist")
        : toast.error("Something went wrong (500)");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const addToCompareList = () => {
    const pid = product._id;
    const exists = compareState.find((x) => x === pid);
    if (exists) {
      toast.warning("This Item already exists on your compare list");
    } else {
      const __data = [...compareState, product._id];
      dispatch(updateComparelist(__data));
      toast.success("Item has been added to compare list");
    }
  };

  const itemLink = link ? link : `/gallery?slug=${product.slug}`;
  const ItemLayout = layout ? layout : "row";
  return (
      
      
    <div className={`col ${product.quantity === 0 ? `${c.outofstockProduct}` : ''}`}  id="product-croul" id={product.quantity}>
      <div className={`hotProductCol text-center ${c.card} ${border ? c.border : ""} ${
          cssClass ? cssClass : ""
        }`}
      >
        <div className={c.hover_buttons}>
        {!session && (
          <Link href="/signin">
            <i className='fa fa-heart-o'></i>
               {/* <img src='/images/heartIcon.png' width={15}  /> */}
          </Link>
          )}
          {session && (
          <button onClick={addToWishList}>
            <SuitHeart width={15} height={15} />
            <i className='fa fa-heart-o'></i>
               {/* <img src='/images/heartIcon.png' width={15}  /> */}
          </button>
          )}
         {/* <button onClick={addToCompareList}>
            <Repeat width={15} height={15} />
            <i className='fa fa-refresh'></i>
              <img src='/images/compareIcon.png' width={15}  />
          </button>
          {!hideLink && (
            <Link
              href={itemLink}
              as={`/product/${product.slug}`}
              scroll={false}
              shallow={true}
            >
              <button>
               <Eye width={15} height={15} />
               <i className="fa fa-eye"></i>
                <img src='/images/eyeIcon.png' width={15} />
              </button>
            </Link>
          )}*/}
          {deleteButton && deleteButton}
        </div>
        <div>
          <Link href={`/product/${product.slug}`}>
          {product.quantity === 0 && (
          <div class={`${c.overlay}`}>OUT OF STOCK</div>
          )}
            <div className={`${c.container} ${product.quantity === 0 ? `${c.outofstock}` : ''}`} >
              <ImageLoader
                src={product.image[0].url}
                alt={product.name}
                width={300}
                height={300}
                style={{ height: "auto" }}
                quality={100}
              />
            </div>
          </Link>
          
          {product.discount < product.price && (
            <div className={c.discount}>{discountInPercent}%</div>
          )}
          
          <div className={c.nameContainer}>
          <p className={c.unit}>{product.brand}</p>
           {/* <ReviewCount reviews={product.review || []} showCount /> */}
          <div className={c.name}><Link className={c.productLink} href={`/product/${product.slug}`}>{product.sku}</Link></div>

          {/*
            <p className={c.unit}>{`${product.unitValue} ${product.unit}`}</p>
            
            <div className={c.price_con}>
              {product.discount < product.price && (
                <p className={c.price}>
                {settings.settingsData.currency.symbol}
                 ₹&nbsp;  {product.discount}
                </p>
              )}
              <p
                className={
                  product.discount < product.price ? c.price_ori : c.price
                }
              >
                {settings.settingsData.currency.symbol}
                {product.price}
              </p>
            </div>
            */}
         
          </div>
           {/*
          {button && (
            <div className={c.buttonContainer}>
              {stockInfo(product) ? (
                <Link
                  href={itemLink}
                  as={`/product/${product.slug}`}
                  scroll={false}
                  shallow={true}
                  className={c.button}
                >
                  BUY NOW
                </Link>
              ) : (
                <button className={c.button} disabled>
                  OUT OF STOCK
                </button>
              )}
            </div>
          )}
          */}
          <div class="btnaction priceRow price_view_btn">
         {/* <div class='productView'><Link href={`/product/${product.slug}`}> <i class='fa fa-arrow-circle-o-right'></i> View Details </Link></div>*/}
         <div className="priceHover">
          <span className={c.price}>
                   {product.discount < product.price ? numberFormat(product.discount) : numberFormat(product.price)} (incl. of all taxes)
                </span>
                
            
              
            </div>
         {/* <div className="priceHover"> 
          {product.discount < product.price && (
          ₹&nbsp;{ product.discount}
          )}
          
                <p className={ product.discount < product.price ? c.price_ori : c.price}>
                {product.price}
              </p>
              
          </div> */}
            
          </div>
        </div>
            
      </div>
    </div>
  );
  
};

export default Product;
