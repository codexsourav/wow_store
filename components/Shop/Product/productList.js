

{/*
import InfiniteScroll from "react-infinite-scroll-component";
import Product from "./product";
import c from "./productList.module.css";

function ProductList({ items, data_length, loadMore }) {
  return (
    <div className={c.list}>
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={items.length >= data_length ? false : true}
        loader={<h6 className={c.endMessage}> Loading...</h6>}
        endMessage={<h6 className={c.endMessage}>Nothing more to show</h6>}
      >
        {items.map((data, index) => (
          <Product key={data._id} product={data} button={true} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default ProductList;

*/}

import InfiniteScroll from "react-infinite-scroll-component";
import Product from "./product";
import c from "./productList.module.css";

function ProductList({ items, data_length, loadMore }) {
  return (
    <>
    
<InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={items.length >= data_length ? false : true}
        loader={<h6 className={c.endMessage}> Loading...</h6>}
        endMessage={<h6 className={c.endMessage}>Nothing more to show</h6>}
      >
       <div className='row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2'>
                {items.map((data, index) => (
                  <Product key={data._id} product={data} button={true} />
                ))}
         </div>
        </InfiniteScroll>
        
        {/*
         {items.map((data, index) => (
                  <Product key={data._id} product={data} button={true} />
                ))}
                
                */}
        
    </>
  );
}

export default ProductList;




