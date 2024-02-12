import { ArrowRepeat, Search } from "@styled-icons/bootstrap";
import Link from "next/link";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import OutsideClickHandler from "~/components/ClickOutside";
import ImageLoader from "~/components/Image";
import { fetchData } from "~/lib/clientFunctions";
import classes from "./searchbar.module.css";

export default function SearchBar(props) {
    
 
     let hideopt = props.mb;
     
  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const search = useRef("");
  const settings = useSelector((state) => state.settings);
  const hideSearchBar = () => {
     hideopt ? hideopt('hideForm') : ''
    search.current.value = "";
    setSearchData([]);
  };
  const searchItem = async () => {
    setSearching(true);
    try {
      const options = {
        threshold: 0.3,
        keys: ["sku"],
      };
      const product = await fetchData(`/api/home/product_search`);
      const Fuse = (await import("fuse.js")).default;
      const fuse = new Fuse(product.product, options);
      setSearchData(fuse.search(search.current.value));
    } catch (err) {
      console.log(err);
    }
    setSearching(false);
  };

  

  return (
    <div className={classes.searchBar_def}>
    <span className="searchBox"><input className="expand-box" ref={search} type="text"  onInput={searchItem}  /></span>
      {searching && (
        <span className={classes.spinner_def}>
          <ArrowRepeat width={17} height={17} />
        </span>
      )}
      <OutsideClickHandler
        show={searchData.length > 0}
        onClickOutside={hideSearchBar}
      >
        <div className={classes.searchData_def}>
          {searchData.map((product, index) => (
            <div className={classes.searchList} key={index}>
              <Link
                href={`/product/${product.item.slug}`}
                onClick={hideSearchBar}
              >
              
                <div className={classes.thumb}>
                  <ImageLoader
                    src={product.item.image[0].url}
                    alt={product.item.name}
                    width={35}
                    height={50}
                  />
                </div>
                
                <div className={classes.content}>
                <p><strong>SKU: {product.item.sku}</strong></p>
                  <p> {product.item.name}</p>
                  
                  
                  {/*
                  <div className={classes.unit}>{`${product.item.unitValue} ${product.item.unit}`}</div>
                  <span>
                    {settings.settingsData.currency.symbol +
                      product.item.discount}
                    {product.item.discount < product.item.price && (
                      <del>
                        {settings.settingsData.currency.symbol +
                          product.item.price}
                      </del>
                    )}
                  </span>
                  */}
                  
                  
                </div>
                
                
                
              </Link>
            </div>
          ))}
        </div>
      </OutsideClickHandler>
    </div>
  );
}
