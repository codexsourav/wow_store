'use client';

import { CardText, ChatLeftDots, StarHalf } from "@styled-icons/bootstrap";
import Link from 'next/link'
import customId from "custom-id-new";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import Error404 from "~/components/error/404";
import Error500 from "~/components/error/500";
import HeadData from "~/components/Head";
import ImageLoader from "~/components/Image";
import Question from "~/components/question";
import Review from "~/components/Review";
import Product from "~/components/Shop/Product/product";
import classes from "~/components/Shop/Product/productDetails.module.css";
import CallAction from "~/components/CallAction";
// import from "~/pages/product/product.css";

import CustomSCript from "~/components/Layout/Client/Common/CustomSCript";
import {
  appUrl,
  fetchData,
  postData,
  setSettingsData,
  stockInfo,
} from "~/lib/clientFunctions";
import productDetailsData from "~/lib/dataLoader/productDetails";
import { addToCart, addVariableProductToCart } from "~/redux/cart.slice";
import { wrapper } from "~/redux/store";

const Carousel = dynamic(() =>
  import("react-responsive-carousel").then((com) => com.Carousel)
);

function ProductDetailsPage({ data, error , params }) {
  // console.log(data.product.specification);
  const [selectedColor, setSelectedColor] = useState({
    name: null,
    value: null,
  });
  const [selectedAttribute, setSelectedAttribute] = useState({
    name: null,
    value: null,
    for: null,
  });
  const { session } = useSelector((state) => state.localSession);
  const [price, setPrice] = useState(0);
  const [tabId, setTabId] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  //const discountInPercent =
   // Math.round((100 - (data.product.discount * 100) / data.product.price) * 10) / 10;
    
    
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
  
  
  const quantityAmount = useRef();
  const question = useRef();
  const cartData = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  const router = useRouter();
  const [branddata, setBranddata] = useState('');
  let[mobScreen, setMobScreen]= useState('')
  const relatedItem =
    data.related &&
    data.related.filter((obj) => {
      return obj._id !== data.product._id;
    });
  //const brand = dynamic(() => import("~/components/ProductListView"));
  
    async function loadBrandData() {
    try {
      const url = `/api/home/brand?type=${data.product.brand}`;
      const resp = await fetchData(url);
      resp.success
        ? setBranddata(resp.brand || {})
        : toast.error("Something Went Wrong");
    } catch (err) {
      console.log("brand Error"+err.resp);
      toast.error("Something Went Wrong");
    }
    setLoaded(true);
  }
  
        let[popuActive, setPopupActive]= useState('')
       function popup(){
           if(popuActive === 'active'){
              // alert('active')
               setPopupActive('');
               document.body.classList.remove('bodyActive')
              
           }
           else{
                setPopupActive('active');
                 document.body.classList.add('bodyActive')
           }
      }
      
  useEffect(() => {
  setMobScreen(window.innerWidth)
  
   setPopupActive('');
    loadBrandData();
    /*product slider*/
    var swiper = new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
    /*end product slider*/


/*Zoom Effect*/

const img = document.querySelectorAll("img.drift-demo-trigger");

img.forEach((lm)=>{

		lm.addEventListener("mousemove", onZoom);
		lm.addEventListener("mouseover", onZoom);
		lm.addEventListener("mouseleave", offZoom);

		function onZoom(e) {
           const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            lm.style.transformOrigin = `${x/2}px ${y}px`;
            lm.style.transform = "scale(2)";
		}

		function offZoom(e) {
		    // lm.style.transformOrigin = `0 0`;
		      lm.style.transform = "scale(1)";
		}
})

/*end Zoom Effect*/

    /*Product Slider*/


    $('.eroslider').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      pagination: false,
      dots: false,
      autoplay: true,
      margin: 30,
      stagePadding: 0,
      autoplayTimeout: 2000,
      autoplayHoverPause: false,
      responsive: {
        0: {
          items: 2,
          margin: 15,
        },
        600: {
          items: 2
        },
        1000: {
          items: 2
        }
      }
    })
    
    
    
      $('.smililarProduct').owlCarousel({
      loop: false,
      nav: true,
      pagination: false,
      dots: false,
      autoplay: false,
      stagePadding: 0,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 2,
        
        },
        600: {
          items: 3
        },
        1100: {
          items: 4,
         // margin: 40,
        },
          1400: {
          items: 5,
         // margin: 40,
        }
      }
    })

    /*End Product Slider*/




    /* Zooming efect script*/
    // let a = document.querySelectorAll('.drift-demo-trigger')
    // a.forEach((x) => {
    //   new Drift(x, {
    //     paneContainer: document.querySelector('.details'),
    //     inlinePane: 769,
    //     inlineOffsetY: -85,
    //     containInline: true,
    //     hoverBoundingBox: true
    //   });
    // })
    /*end zooming effect*/


    if (data && data.product) {
      setPrice(data.product.discount);
      // setSelectedAttribute
     // console.log(data.product.attributes);
      setSelectedColor({
        name: data.product.colors[0]?.label || null,
        value: data.product.colors[0]?.value || null,
      });
      setSelectedAttribute({
        name: data.product.attributes[0]?.label || null,
        value: data.product.attributes[0]?.value || null,
        for: data.product.attributes[0]?.for || null,

      })
    }
  }, [data]);





  const checkVariantInfo = (color, attr) => {
    const colorName = color || selectedColor.name;
    const attrName = attr || selectedAttribute.name;
    return data.product.variants.find(
      (item) => item.color === colorName && item.attr === attrName
    );
  };

  const stepUpQty = () => {
    quantityAmount.current.stepUp();
  };

  const stepDownQty = () => {
    quantityAmount.current.stepDown();
  };

  const changeColor = (e) => {
    try {
      const value = {
        name: e.target.getAttribute("data-color"),
        value: e.target.value,
      };
      setSelectedColor(value);
      const variantData = checkVariantInfo(value.name, null);
      if (variantData && variantData.price) {
        const itemPrice = data.product.discount + Number(variantData.price);
        setPrice(itemPrice);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeVariant = (e) => {
    try {
      const value = {
        name: e.target[e.target.selectedIndex].getAttribute("data-attr"),
        value: e.target.value,
        for: e.target[e.target.selectedIndex].getAttribute("data-tref"),
      };
      setSelectedAttribute(value);
      const variantData = checkVariantInfo(null, value.name);
      if (variantData && variantData.price) {
        const itemPrice = data.product.discount + Number(variantData.price);
        setPrice(itemPrice);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const simpleProductCart = (qty) => {
    const { _id, name, brand, image, quantity } = data.product;
    const existed = cartData.items.find((item) => item._id === _id);
    const totalQty = existed ? existed.qty + qty : qty;
    if (quantity === -1 || quantity >= totalQty) {
      const cartItem = {
        _id,
        uid: customId({ randomLength: 6 }),
        name,
        brand,
        image,
        price: Number(price),
        qty,
        quantity,
        color: { name: null, value: null },
        attribute: { name: null, value: null, for: null },
      };
      dispatch(addToCart(cartItem));
      toast.success("Added to Cart");
    } else {
      toast.error("This item is out of stock!");
    }
  };

  const checkQty = (prevQty, currentQty, availableQty) => {
    const avQty = Number(availableQty);
    if (avQty === -1) {
      return true;
    } else {
      return prevQty + currentQty <= avQty;
    }
  };

  const variableProductCart = (qty) => {
    try {
      const { _id, name, brand, image, colors, attributes } = data.product;
      if (colors.length && !selectedColor.name) {
        toast.warning("Please Select Color!");
      }
      else if (attributes.length && !selectedAttribute.name) {
        toast.warning(`Please Select ${attributes[0].for}!`);
      }
      else {
        const existedProduct = cartData.items.find(
          (item) =>
            item._id === _id &&
            item.color.name == selectedColor.name &&
            item.attribute.name == selectedAttribute.name
        );
        const existedQty = existedProduct ? existedProduct.qty : 0;
        const variantData = checkVariantInfo(
          selectedColor.name,
          selectedAttribute.name
        );
        const qtyAvailable =
          variantData && checkQty(existedQty, qty, variantData.qty);
        if (qtyAvailable) {
          const cartItem = {
            _id,
            uid: customId({ randomLength: 6 }),
            name,
            brand,
            image,
            price: Number(price),
            qty,
            quantity: Number(variantData.qty),
            sku: variantData.sku,
            color: selectedColor.name
              ? { name: selectedColor.name, value: selectedColor.value }
              : { name: null, value: null },
            attribute: selectedAttribute.name
              ? {
                name: selectedAttribute.name,
                value: selectedAttribute.value,
                for: attributes[0].for,
              }
              : { name: null, value: null, for: null },
          };
          dispatch(addVariableProductToCart(cartItem));
          toast.success("Added to Cart");
        } else {
          toast.error("This item is out of stock!");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  const addItemToCart = () => {
    const qty = Number(quantityAmount.current.value);
    //if (data.product.type === "simple") {
      simpleProductCart(qty);
  //  } else {
  //    variableProductCart(qty);
  //  }
  };

  const thumbs = () => {
    const thumbList = data.product.gallery.map((item, index) => (
      <ImageLoader
        key={item.name + index}
        src={item.url}
        alt={data.product.name}
        width={67}
        height={67}
      />
    ));
    return thumbList;
  };

  const _showTab = (i) => {
    setTabId(i);
  };

  const refreshData = () => router.replace(router.asPath);

  async function postQuestion(e) {
    try {
      e.preventDefault();
      const _data = {
        pid: data.product._id,
        question: question.current.value.trim(),
      };
      const _r = await postData("/api/question", _data);
      _r.success
        ? (toast.success("Question Added Successfully"), refreshData())
        : toast.error("Something Went Wrong 500");
    } catch (err) {
      console.log(err);
      toast.error(`Something Went Wrong - ${err.message}`);
    }
  }



  function combineDataToArray(arr) {
    const combinedArray = [];

    const combinedData = arr.reduce((acc, item) => {
      const key = item.for;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    for (const key in combinedData) {
      if (Object.prototype.hasOwnProperty.call(combinedData, key)) {
        combinedArray.push({ [key]: combinedData[key] });
      }
    }

    return combinedArray;
  }
  var attributesstrd = useCallback(
    () => {
      return combineDataToArray(data.product.attributes)
    },
    [data],
  )

  if (error) return <Error500 />;
  if (!data.product) return <Error404 />;
  return (
    <>
      <HeadData
        title={data.product.name}
        seo={data.product.seo}
        url={`product/${data.product.slug}`}
      />



      <section className="topBannerSectipn">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
              {/*
      
       <div className="productMainSlider">    
  <div className="swiper mySwiper2">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <img className="drift-demo-trigger" data-zoom="/images/product-slider.jpg" src="/images/product-slider.jpg" />
      </div>
      <div className="swiper-slide">
           <img className="drift-demo-trigger" data-zoom="/images/product-slider.jpg" src="/images/product-slider.jpg" />
      </div>
      <div className="swiper-slide">
          <img className="drift-demo-trigger" data-zoom="/images/product-slider.jpg" src="/images/product-slider.jpg" />
      </div>
       <div className="swiper-slide">
          <img className="drift-demo-trigger" data-zoom="img/product-slider.jpg" src="/images/product-slider.jpg" />
      </div>
       <div className="swiper-slide">
          <img className="drift-demo-trigger" data-zoom="/images/product-slider.jpg" src="/images/product-slider.jpg" />
      </div>
    </div>
    <div className="swiper-button-next"></div>
    <div className="swiper-button-prev"></div>
  </div>
  <div thumbsSlider="" className="swiper mySwiper">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <img src="/images/product-slider.jpg" />
      </div>
      <div className="swiper-slide">
        <img src="/images/product-slider.jpg" />
      </div>
      <div className="swiper-slide">
        <img src="img/product-slider.jpg" />
      </div>
      <div className="swiper-slide">
        <img src="/images/product-slider.jpg" />
      </div>
      <div className="swiper-slide">
        <img src="img/product-slider.jpg" />
      </div>
    </div>
  </div>
  </div>
 */}


              {/*
  <div className="productMainSlider">    
  <div className="swiper mySwiper2">
    <div className="swiper-wrapper">
 
        {data.product.gallery.map((item, index) => (<div className="swiper-slide">
        
        <div className="prdImgBanerHolder">
            <img className="drift-demo-trigger" data-zoom={item.url} src={item.url} />
        </div>
        
        
        </div>))}
  
    </div>
    <div className="swiper-button-next"></div>
    <div className="swiper-button-prev"></div>
  </div>
  <div thumbsSlider="" className="swiper mySwiper">
    <div className="swiper-wrapper">
       {data.product.gallery.map((item, index) => (<div className="swiper-slide"><img className="drift-demo-trigger" data-zoom={item.url} src={item.url} /></div>))}
    </div>
  </div>
</div>


*/}
            
            {
                mobScreen<=600 ? 
                
                <div className="productMainSlider">
                <div className="swiper mySwiper2">
                  <div className="swiper-wrapper">
                    {data.product.gallery.map((item, index) => (<div className="swiper-slide">
                     {/*<img className="drift-demo-trigger"  height="394" src={item.url} />*/}
                      <img  height="394" src={item.url} />
                   </div>))}
                  </div>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </div>
                <div thumbsSlider="" className="swiper mySwiper">
                  <div className="swiper-wrapper">
                    {data.product.gallery.map((item, index) => (<div className="swiper-slide"><img src={item.url} /></div>))}
                  </div>
                </div>
              </div> : null
            }
        
              
               {
                mobScreen>=600 ? 
             <div className="productGalleryBox">
                  <div className="row">
                   {data.product.gallery.map((item, index) => (
                   data.product.gallery.length === 1 ? <div className="col-lg-12 d-flex justify-content-center">
                   <div className="prdsThumbImg">
                     <img height="394" onClick={()=>{popup()}}  className="py-4" src={item.url}  />
                     </div>
                   
                   </div> : <div className="col-lg-6">
                    <div className="prdsThumbImg">
                        <img height="394" onClick={()=>{popup()}}  className="py-4" src={item.url}  />
                    </div>
                    </div>
                 ))}
                </div>
              </div>: null
            }
        
   
		<div className={`productBannerPopup ${popuActive}`}>
		<div className="popupInner">
			<div className="popupClose" onClick={()=>{popup()}}>x</div>
			
			    {data.product.gallery.map((item, index) => (
               <div className="popupImgBox">
                     <img onClick={()=>{popup()}}  className="py-4" src={item.url}  />
                   </div>
                 ))}

		</div>
	</div>

            </div>
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
              <div className="stickyProduct">
                <div className="product-description">
                <div class="row">
                 <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                    <div className="watchCategory">{data.product.brand}</div>

                   <p className="prdModel"><span>ARTICLE NO.</span> {data.product.sku}</p>
                  <div className="productCost"><div className="mrpHeading">MRP.</div>
             
                {data.product.discount < data.product.price && (
                   <span className="curPrice">
                  {numberFormat(data.product.discount)}
                </span>
                  )}
                  <span className={data.product.discount < data.product.price ? 'cutPrice' : 'curPrice'}>
                {numberFormat(data.product.price)}
              </span>
                 {/* <span className="prsDscnt"> {Math.round((100 - (data.product.discount * 100) / data.product.price) * 10) / 10}%off</span>*/}
                     <div className="includedTxt"> (incl. of all taxes)</div>
                  </div>


                  {data.product.type === "variable" && (
                    <>
                        <div className="addToCartOption">
                    {/*  <div className="prodNormHd">QTY</div> */}
                    
              
                    <div className="qtyOpt d-none">
                      <button onClick={stepDownQty} className="leftBtn">-</button>
                      <input ref={quantityAmount} min="1" max={
                        data.product.quantity === -1
                          ? 100000
                          : data.product.quantity
                      }
                        defaultValue="1"
                        type="number"
                        disabled
                      />
                      <button onClick={stepUpQty} className="rightBtn">+</button>
                    </div>
                    
                    {stockInfo(data.product) ? (
                      <button className="addToCartBtn" onClick={() => addItemToCart()}
                      > Add to Cart 
                      </button>
                    ) : (
                      <button className="OutofStockBtn" disabled>
                        Out of Stock
                      </button>
                    )}

                  </div>
                        </>
                      )}
                 </div>
                 <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12">
                 <div class="branddetail">
                 {branddata.image && branddata.image.map((item, index) => ( item.url ?
                 <ImageLoader src={item.url} alt={item.name} width={130} height={100} />
                 : null
                 ))}
               
                   <p>Authorize reseller of {branddata.name}</p>
                 </div>
                 </div>
                </div>
               
               


              

                  {/* <ul className="booking-details">
              <li>
                <div className="viewallbtn">
                  <Link href="">
                    <img src="/images/group-34.svg" />
                    <span>Add to Cart</span>
                  </Link>
                </div>
              </li> 
              <li>
                <div className="viewallbtn">
                  <Link href="">
                    <img src="/images/group-34.svg" />
                    <span>Add to WishList</span>
                  </Link>
                </div>
              </li>
            </ul>
            */}
                <div className="descptOptionFlex">
                         <div className="displayOpt"><div className="prodNormHd pe-3">Brand</div><p>{data.product.brand}</p></div>
                            {data.product.attributes.length > 0 && ( attributesstrd().map((e, i) => (
                              <div className="displayOpt">
                                    <div className="prodNormHd pe-3">{Object.keys(e)[0]}</div>
                                    {e[Object.keys(e)[0]].length == 1 ? <p>{e[Object.keys(e)[0]][0].label}</p> : 
                                    <select className="form-select" onChange={changeVariant} defaultValue="">
                                        <option value="" disabled>Select {data.product.attributes[i].for}</option>
                                            {e[Object.keys(e)[0]].map((attr, i) => (
                                            <option
                                              key={i}
                                              value={attr.value}
                                              data-attr={attr.label}
                                              data-tref={attr.for}
                                              selected={i == 0}
                                            >
                                          {attr.label}
                                        </option>
                                    ))}
                                    </select>
                                }
                              </div>
                            ))
                        
    
                          )}
                               </div>
                               
                               
                               
                        <div className="row product_features">
                    		<div className="col-sm-4 col-4">
                    			<img src="/images/Artboard987.svg" alt="" />
                    			<p>100% Genuine Products</p>
                    		</div>
                    		<div className="col-sm-4 col-4">
                    			<img src="/images/titans_trust2.svg" alt="" />
                    			<p>Brand Warranty</p>
                    		</div>
                    		<div className="col-sm-4 col-4">
                    			<img src="/images/secure_payment.svg" alt="" />
                    			<p>Secure payment</p>
                    		</div>
                    	</div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>



      <section className="productInfo pt-0">
        <div className="container">
        
        
          <ul className="nav nav-tabs nav-product-tab" id="myTab" role="tablist">
          {
              !data.product.specification ? null :  <li className="nav-item">
              <a onClick={() => _showTab(1)} className={tabId === 1 ? "nav-link active" : "nav-link"} >
                Specification
              </a>
            </li> 
          }
      
             {
              !data.product.description ? null : 
                <li className="nav-item">
                  <a onClick={() => _showTab(2)} className={tabId === 2 ? "nav-link active" : "nav-link"}>
                    Descriptions
                  </a>
                </li>
             }
            
            
            {
               data.product.review.length === 0 ? null :
               <li className="nav-item">
                   <a onClick={() => _showTab(3)} className={tabId === 3 ? "nav-link active" : "nav-link"}>
                      Review ({data.product.review.length})
                   </a>
                </li>
               
           }
            
            
      
            
            
            
            {data.product.question.length === 0 ?  null : 
                <li className="nav-item">
                    <a onClick={() => _showTab(4)} className={tabId === 4 ? "nav-link active" : "nav-link"} >
                        Questions ({data.product.question.length})
                    </a>
                </li>
            }


            
    

          </ul>

          <div className="tab-content" id="myTabContent">



            {tabId === 1 && (
              <>
                   {
                   
                   !data.product.specification ? null : 
                   <div className="col-lg-8 col-md-8 col-sm-6 col-12">
                             <ul className="productSpecification">
                                 {
                                   (data.product.specification).map((e, i) => {
                                       return (
                                           <li>
                                                <div className="col-product-hed">{e.title}</div>
                                                <div className="col-product-dtls">{e.value}</div>
                                           </li>
                                           )
                                       
                                   })
                                 }
                           </ul>
                        </div>
                  }
              </>
            )}


            {tabId === 2 && (
              <>
                {data.product.description &&
                
                  data.product.description.length > 0 ? (
                    <>
                       <div className="row">
                       
                          <div className="col-lg-12"><div className="normText" dangerouslySetInnerHTML={{ __html: data.product.description, }} /></div>


                     
                      { /*end dynamic data*/}

                    </div>
                  </>
                ) : (
                  <EmptyContent icon={<CardText width={40} height={40} />}
                    text="This product has no description"
                  />
                )}
              </>
            )}
            

            {tabId === 3 && (
              <>
                {data.product.review && data.product.review.length > 0 ? (
                  <Review review={data.product.review} />
                ) : (
                  <EmptyContent
                    icon={<StarHalf width={40} height={40} />}
                    text="This product has no reviews yet"
                  />
                )}
              </>
            )}


            {tabId === 4 && (
              <>
                {session && (
                  <form
                    className="border border-2 p-3 mb-3 formbg"
                    onSubmit={postQuestion}
                  >
                    <div className="mb-3">
                      <label className="form-label pb-2 text-light">Ask a question</label>
                      <textarea
                        className="form-control rounded-0 border-0"
                        maxLength={300}
                        placeholder="Maximum 300 words"
                        ref={question}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="border-0 text-light p-2">
                      Ask Question
                    </button>
                  </form>
                )}
                {data.product.question && data.product.question.length > 0 ? (
                  <Question
                    qtn={data.product.question}
                    user={session}
                    pid={data.product._id}
                    refresh={refreshData}
                  />
                ) : (
                  <EmptyContent
                    icon={<ChatLeftDots width={40} height={40} />}
                    text="There are no questions asked yet. Please login or register to ask question"
                  />
                )}
              </>
            )}
            
            

           
           







          </div>
        </div>
      </section>

    {!branddata.description ? null : 
      <section className="eros-mesh">
        <div className="container">
          <div className="row">

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="eros-mesh-content-box">
                <div className="eros-mesh-content">
                  <div className="normText" dangerouslySetInnerHTML={{ __html:branddata.description, }} />
                </div>
              </div>
            </div>
           {/* <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-4 d-flex">
            <img src={data.product.gallery[0].url} className="img-fluid" />
              
              
              <div className="product-slider">
                <div className="owl-carousel eroslider owl-theme">
                  <img src="/images/prod-slider-1.jpg" />
                  <img src="/images/prod-slider-2.jpg" />
                  <img src="/images/prod-slider-1.jpg" />
                  <img src="/images/prod-slider-2.jpg" />
                </div>
              </div>
              
              
           
            </div>*/}

          </div>
        </div>

      </section>
    }


      <section className="similarProduct">
        <div className="container">
          <h2 className="text-center">Similar Product</h2>


         <div className="owl-carousel smililarProduct owl-theme">  
            {relatedItem.map((product, index) => (
              <Product key={index} product={product} hideLink border />
            ))}
          </div>
        </div>
        {/*           
                
  <div className="container">

    <div className="smart-product-slider">
    
        <div className="owl-carousel similarPrdSlider owl-theme">  
        
        
        <div className="hotProductCol text-center">
          <div className="imgbox">
            <img src="img/5.png"/>
          </div>
          <div className="productratings">
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
          </div>
          <div className="productNames">Fastrack Analog Golden Dial Men’s Watch</div>
          <div className="btnaction">
            <a href="">View Details </a>
          </div>
        </div>

 
    







            </div>
          </div>
  </div>
  */}


      </section>
     {/* <CallAction />*/}




      {/*<ScriptCommon />*/}
      <CustomSCript />
    </>
  );
}

function EmptyContent({ icon, text }) {
  return (
    <div className={classes.empty_content}>
      <div className={classes.empty_icon}>{icon}</div>
      <div className={classes.empty_text}>{text}</div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      if (res) {
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=10800, stale-while-revalidate=59"
        );
      }
      const _data = await productDetailsData(query.name);
      const data = JSON.parse(JSON.stringify(_data));
      if (data.success) {
        setSettingsData(store, data);
      }
      return {
        props: {
          data,
          error: !data.success,
        },
      };
    }
);

export default ProductDetailsPage;
