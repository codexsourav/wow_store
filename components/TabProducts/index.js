import next from "next"
import Link from "next/link"

import ProductList from "~/components/ProductListView";

export default function TabProducts() {
  return (
   <section className="product">
<div className="container">
    <h2 className="text-center">Featured Watches</h2>
    <ul className="nav nav-tabs nav-product-tab" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
       <Link className="nav-link active" data-bs-toggle="tab" href="#no1Watch_tab-pane">New Arrivals</Link>
      </li>
      <li className="nav-item" role="presentation">
       <Link className="nav-link" data-bs-toggle="tab"  href="#no2Watch_tab-pane">Trending Items</Link>
      </li>
      {/*
      <li className="nav-item" role="presentation">
       <Link className="nav-link" data-bs-toggle="tab" href="#no3Watch_tab-pane"> Best Sellers</Link>
      </li>*/}
    
    </ul>
    </div>
    <div className="tab-content" id="myTabContent">

      <div className="tab-pane fade show active" id="no1Watch_tab-pane" role="tabpanel">
    
        <ProductList type="new" />
      </div>

      <div className="tab-pane fade" id="no2Watch_tab-pane" role="tabpanel">
        <ProductList type="trending" />
      </div>
      
      <div className="tab-pane fade" id="no3Watch_tab-pane" role="tabpanel">
         <ProductList type="bestselling" />
      </div>
 
 {/*
      <div className="tab-pane fade" id="no4Watch_tab-pane" role="tabpanel">
        <h2 className="container"> Comming Soon..</h2>
      </div>
      */}

    </div>

</section>

  )
}
