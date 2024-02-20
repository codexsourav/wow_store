import { Filter } from "@styled-icons/bootstrap/Filter";
import { Check, ChevronDown, ChevronUp, ChevronRight } from '@styled-icons/bootstrap'
import React, { useEffect, useState } from "react";
import BrandList from "./brand";
import ShortMenu from "~/components/Shop/Sidebar/ShortMenu";
import SidebarCategoryList from "./category";
import c from "./sidebarList.module.css";
import { XLg } from "@styled-icons/bootstrap";
import FilterMenu from "./attrutefilter/FilterMenu";

function SidebarList(props) {
    
    let[mobScreen, setMobScreen] = useState('');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  
  //geneder
  let[genCls, setGnClass]= useState('')
  let[genHide, seGhHd]= useState('hidefilter')
  
  
  //brand
  let[brCls, setbrClass]= useState('')
  let[brHide, seBrHd]= useState('hidefilter')
  
  let actiVeDeactive = ()=>{
      if(genCls === ''){
          setGnClass('active')
          seGhHd('showFilter')
      }
      else{
        setGnClass('')
        seGhHd('hidefilter')
      }
      
  }
  
  let actiBrand = ()=>{
      //brHide
      
      if(brCls===''){
          setbrClass('active')
          seBrHd('showFilter')
      }
      else{
           setbrClass('')
          seBrHd('hidefilter')
      }
  }

  useEffect(() => {
      
      setMobScreen(window.innerWidth)
      
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    const width = window.innerWidth;
    if (width < 992) {
      setHideTopBar(true);
    } else if (position > 110) {
      setHideTopBar(true);
    } else {
      setHideTopBar(false);
    }
  };

  const toggleFilter = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/*
      <div className="sidebaar">
        
            <div className="filter-box-row">
              <div className="filter-col">
                <div className="sidbarHead">Filter <img src="/images/filter-icon.svg" /></div>
              </div>
            </div>
            <div className="filter-accrodion">
              <div className="accordion" id="accordionExample">

              

               


                 <div className="accordion-item">
                  <a className="accordion-button" data-bs-toggle="collapse" href="#idealTab" aria-expanded="true"> Ideal For </a>
                  <div id="idealTab" className="collapse show" data-bs-parent="#accordionExample">
                      <div className="formfilterData">
                        <form>
                          <div className="filter-col">
                   
                            <ul className="cheackList">
                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>Couple</label>
                              </li>
                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>Women</label>
                              </li>

                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>Men</label>
                              </li>

                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>Girls</label>
                              </li>

                            </ul>
                          </div>
                        </form>
                      </div>
                  </div>
                </div>



                 <div className="accordion-item">
                  <a className="accordion-button collapsed" data-bs-toggle="collapse" href="#brandTab" aria-expanded="false"> Brand </a>
                  <div id="brandTab" className="collapse" data-bs-parent="#accordionExample">
                      <div className="formfilterData">
                        <form>
                          <div className="filter-col">
                   
                            <ul className="cheackList">
                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>Brand 1</label>
                              </li>
                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>80% More</label>
                              </li>

                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>70% More</label>
                              </li>
                            </ul>
                          </div>
                        </form>
                      </div>
                  </div>
                </div>


                <div className="accordion-item">
                  <a className="accordion-button collapsed" data-bs-toggle="collapse" href="#priceTeab" aria-expanded="false"> Price </a>
                  <div id="priceTeab" className="collapse" data-bs-parent="#accordionExample">
                      <div className="formfilterData">
                        <form>
                          <div className="filter-col">
                   
                            <ul className="cheackList">
                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>Less then 10000</label>
                              </li>
                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>Less then 5000</label>
                              </li>
                            </ul>
                          </div>
                        </form>
                      </div>
                  </div>
                </div>



                <div className="accordion-item">
                  <a className="accordion-button collapsed" data-bs-toggle="collapse" href="#discountTab" aria-expanded="false"> Discount </a>
                  <div id="discountTab" className="collapse" data-bs-parent="#accordionExample">
                    
                      <div className="formfilterData">
                        <form>
                          <div className="filter-col">
                   
                            <ul className="cheackList">
                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>90% More</label>
                              </li>
                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>80% More</label>
                              </li>

                              <li>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label>70% More</label>
                              </li>
                            </ul>
                          </div>
                        </form>
                      </div>
                  </div>
                </div>



              </div>
            </div>
          </div>sidebarLeft
*/}
      <div className={`col-xl-3 col-4 ${c.sidebarLeft}`}>

        <div
          className={`${c.filter_btn} ${sidebarOpen ? c.b_left : ""}`}
          onClick={toggleFilter}
        >
          <Filter width={33} height={33} />
          <span>Filter</span>
        </div>
        {/* Sidebar  */}


        <div className={`${c.header} ${sidebarOpen ? c.s_left : ""}`}>
 
          <h4>Filter</h4>
          <XLg width={25} height={25} onClick={toggleFilter} />
        </div>


        {/* sidebaar content start form here*/}

        <div className={`sidebaar ${c.sidebar} ${sidebarOpen ? c.s_left : ""} ${hideTopBar ? c.sidebar_top_scroll : c.sidebar_top_normal
          }`}
        >
      
          {/*
          <div className="inner-logo">
              <img src="/images/inner-watch-logo.png" />
              <div className="logo-name">Authorised Retailer</div>
            </div>
            
            */}


          <div className={c.sidebar_inner}>
            {/*
          
          <label>Sort by</label>
          <ShortMenu update={props.sort} />
          
          */}
          
          {
              mobScreen>=600 ? <div className="filter_head"> <label>Filters</label></div> : null
          }

        
         
            <div className={c.category_item}>
              <label className={`customBorder ${genCls}`} onClick={actiVeDeactive}>Gender   <ChevronDown size={13} color='#000' /></label>
              <div className={genHide}>
              <SidebarCategoryList
                category={props.category}
                updateCategory={props.updateCategory}
                updateSubCategory={props.updateSubCategory}
              />
              </div>
            </div>


            <div className={`c.category_item`}>
              <label className={`customBorder ${brCls}`} onClick={actiBrand}>Brands <ChevronDown size={13} color='#000' /></label>
              <div className={brHide}>
                 <BrandList brand={props.brand} updateBrand={props.updateBrand} />
              </div>
            </div>

            <div className={`c.category_item mt-less-15`}>
              
              <FilterMenu
                attrData={props.attr}
                updateData={props.updateAttr}
              />
            </div>

          </div>

        </div>
      </div>



    </>
  );
}

export default React.memo(SidebarList);
