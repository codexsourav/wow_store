import {
  BoxArrowInRight,
  GeoAlt,
  Heart,
  Person,
  PersonPlus,
  Repeat,
  Telephone,
} from "@styled-icons/bootstrap";
import axios from 'axios'
import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImageLoader from "~/components/Image";
import SearchBar from "~/components/Layout/Client/searchbar";
import Image from 'next/image'

const CartView = dynamic(() => import("~/components/Layout/Client/cartView"), { ssr: false });
const CategoryMenu = dynamic(() => import("~/components/Layout/Client/categoryMenu"), { ssr: false });
const CategoryMenuCollection = dynamic(() => import("~/components/Layout/Client/categoryMenuCollection"), { ssr: false });
const CategoryMenuBrand = dynamic(() => import("~/components/Layout/Client/categoryMenuBrand"), { ssr: false });

const NavBar = ({ data }) => {
  const [hideTopBar, setHideTopBar] = useState(false);
  // Selecting session from global state
  const { session } = useSelector((state) => state.localSession);
  // Selecting settings from global state
  const { settingsData } = useSelector((state) => state.settings);
  const { wishlist, compare } = useSelector((state) => state.cart);
  const [std, setStd] = useState(settingsData);
  const [navData, setNavData] = useState(null);


  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategory, setShowCategory] = useState(false);



  // get Nvbar DAta 
  const getNavData = async () => {
    if (navData == null) {
      try {
        const response = await axios.get("/api/navbardata");
        setNavData(response.data);
      } catch (error) {
        setNavData(null);
      }
    }
  }
let[mobScreen, setMobScreen] = useState('');
  useEffect(() => {
      setMobScreen(window.innerWidth)
    getNavData();
  }, [])




  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setStd(settingsData);
  }, [settingsData]);

  const router = useRouter();

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 110) {
      setHideTopBar(true);
    } else {
      setHideTopBar(false);
    }
  };
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setShowCategory(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const goToWishList = () => {
    if (session) {
      router.push("/profile?tab=1");
    } else {
      toast.warning("You need to login to create a Wishlist");
    }
  };

  const navItem = [
    {
      id: 1,
      name: "Home",
      to: "/",
    },
    {
      id: 2,
      name: "Shop",
      to: "/gallery",
    },
    {
      id: 3,
      name: "All Categories",
      to: "/categories",
    },
    {
      id: 4,
      name: "Faq",
      to: "/faq",
    },
    {
      id: 5,
      name: "About",
      to: "/about",
    },
  ];


  return (
    <>


      <header>
         {/*<div class="maintain">
           <div className="container-fluid">
             <div className="row">
                 <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <p className='my-0 p-0'>This is a Demo store for testing. Please do not place any order from here.</p>
                </div>
            </div>
            </div> 
         </div>*/}
         
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-2 d-flex align-items-center icon-nav">
             <button className="menu-button" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></button>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-4">
              <div className="logo">
                <Link href="/"><Image src="/images/wow-logo.png" width={130} height={70} alt='User' /></Link>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-8">
              <div className="top-nav">
                <ul>
                  <li className="mob-hide"><Link href='/product'>New Arrivals</Link></li>
                   <li className="mob-hide"><Link href='/product?category=watches%20for%20men'>Men</Link></li>
                    <li className="mob-hide"><Link href='/product?category=watches%20for%20women'>Women</Link></li>
                  <li className="nav-item dropdown dropdown-mega position-static">
                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">Explore</a>
                    <div className="dropdown-menu shadow  w-100">
                      <div className="mega-content">
                        <div className="container">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                              <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-7">
                                  <CategoryMenuBrand data={navData} />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-5">
                                  <div className="row">
                                      <div className="col-xl-6 col-lg-6 col-md-5">
                                         <CategoryMenuCollection data={navData} />
                                      </div>
                                      <div className="col-xl-6 col-lg-6 col-md-5">
                                         <h3>Shop By Price.</h3>
                                          <ul className="shopByCat">
                                            <li><a href='#'>Below 10,000</a></li>
                                            <li><a href='#'>10,000-20,000</a></li>
                                            <li><a href='#'>20,000-30,000</a></li>
                                            <li><a href='#'>30,000-50,000</a></li>
                                            <li><a href='#'>50,000 & above</a></li>
                                          </ul>
                                      </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  
                {/*  <li className='headerSearch'><span className="searchBox"><input className="expand-box" type="text" /></span></li> */}

{mobScreen>=600 ? 
             <>
                     <li><SearchBar /></li>
                   <li className="dropdown">
                    {!session && (
                      <Link href="/signin">
                        <Image src="/images/user.png" width={27} height={27} alt='User' />
                      </Link>
                    )}
                    {session && (
                      <CategoryMenu />
                    )}
                  </li>
                  </>
                  
                  : null
}
                 

                  <CartView />


                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>






    </>
  );
};

export default memo(NavBar);


