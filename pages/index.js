import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from 'next/link'
import { useEffect, useState } from "react";
import HeadData from "~/components/Head";
import WalkStore from "~/components/WalkStore";
import CallAction from "~/components/CallAction";
import TabProducts from "~/components/TabProducts";

import CustomSCript from "~/components/Layout/Client/Common/CustomSCript";

import { usePathname, redirect } from 'next/navigation'

import { appUrl, fetchData, setSettingsData } from "~/lib/clientFunctions";
import homePageData from "~/lib/dataLoader/home";
import { wrapper } from "~/redux/store";
const Error500 = dynamic(() => import("~/components/error/500"));
const Header = dynamic(() => import("~/components/Header/header"));

const Banner = dynamic(() => import("~/components/Banner/banner"));
const CategoryList = dynamic(() =>
  import("~/components/Categories/categoriesList")
);
const Collection = dynamic(() => import("~/components/Collection/collection"));
const BrandCardList = dynamic(() => import("~/components/Brand/brandList"));
const Blogs = dynamic(() => import("~/components/HomeBlog/blogList"));
const ProductDetails = dynamic(() =>
  import("~/components/Shop/Product/productDetails")
);
const ProductList = dynamic(() => import("~/components/ProductListView"));
const GlobalModal = dynamic(() => import("~/components/Ui/Modal/modal"));

function HomePage({ data, error }) {
    
    
  const pathname = usePathname()
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    router.push("/", undefined, { scroll: false });
    setIsOpen(false);
  };

  useEffect(() => {
      

if(pathname=='/'){
    
     var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 53,
      mousewheel: false,
      grabCursor: true,
      loop: true,
      autoplay: {
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    }); 
}

    $('.walkstoreslider').owlCarousel({
      loop: true,
      margin: 10,
      nav: false,
      autoplayHoverPause: false,
      pagination: false,
      dots: false,
      autoplay: true,
      margin: 10,
      stagePadding: 5,
      autoplayTimeout: 2000,
      autoplayHoverPause: false,
      responsive: {
        0: {
          items:2,
          stagePadding: 12,
          margin:8,
        },
        600: {
          items: 1
        },
        1000: {
          items: 2
        }
      }
    })

    $('.logoSlider').owlCarousel({
      loop: true,
      nav: true,
      pagination: false,
      dots: false,
      autoplay: true,
      margin: 15,
      stagePadding: 12,
      autoplayTimeout: 2000,
      autoplayHoverPause: false,
      responsive: {
        0: {
          items: 2,
          stagePadding: 15,
          margin: 15,
        },
        600: {
          items: 3
        },
        1000: {
          items: 6
        }
      }
    })

    if (router.query.slug) {
      setIsOpen(true);
    }

  }, [router.query.slug, pathname]);

  return (
    <>

      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData />
          <Header carousel={data.additional && data.additional.homePage.carousel} />
          <CategoryList categoryList={data.category} />
          <ProductList title="New Products" type="new" />
           <BrandCardList items={data.brand || []} />
           <TabProducts />
          
          <Collection data={data.additional && data.additional.homePage.collection} />


          <WalkStore />
          <CallAction />

         
          
          

          {/*   <ProductList title="Trending Products" type="trending" /> */}
          <Banner banner={data.additional && data.additional.homePage.banner} />

          <Blogs items={data.blog || []} />

          {/*    <ProductList title="Best Selling" type="bestselling" /> */}
          {/*   <CustomSCript /> */}

        </>
      )}
      <GlobalModal
        small={false}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
      >
        {router.query.slug && (
          <ProductDetails productSlug={router.query.slug} />
        )}
      </GlobalModal>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      if (res) {
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=10800, stale-while-revalidate=59"
        );
      }
      const _data = await homePageData();
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

export default HomePage;
