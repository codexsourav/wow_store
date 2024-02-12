import Link from "next/link";
import ImageLoader from "../Image";
import next from "next"
import useOnScreen from "~/utils/useOnScreen";
import { toast } from "react-toastify";
import { fetchData } from "~/lib/clientFunctions";
import Spinner from "../Ui/Spinner";

export default function Blogs({ items }) {
  return (
      <>
      
<section className="blog">
  <div className="container">
    <h2 className="text-center">Our Blog</h2>
    <div className="row">
    {items.map((item, i) => (
      <div key={i} className="col-xl-4 col-lg-4 col-md-6">
        <div className="blog-col">
          <div className="bog-img">
            <ImageLoader src={item.image[0].url} width={397.49} height={287.44} alt='Blog User' />
          </div>
          <div className="blogdtls">
            <div className="blog-titles">{item.name}</div>
            <p className="blog-descri">{item.shortDescription}</p>
          </div>
           <div className="moredetails  pt-0 mt-0">
           <Link href={`/blog/${item.slug}`} target="_blank" ><span>View Details</span></Link>
          </div>
        </div>
      </div>
      ))
      }
      
    </div>
    {/*
    <div className="viewallbtn pt-1 text-center mt-lg-3 pt-lg-4 mt-md-2 pt-lg-1 mt-sm-0 pt-lg-0">
     <Link href="">
        <Image src="/images/group-34.svg" width={40} height={37} alt='View Blog' />
        <span>View All Blogs</span>
      </Link>
    </div>
    */}
  </div>
</section>         

      
      
      
      {/*
      
    <div className="custom_container">
      <h2 className="content_heading text-center">Top Brands</h2>
      <div className="row row-cols-xxl-6 row-cols-xl-6 row-cols-lg-4 row-cols-md-4 row-cols-3 gutters-16 border-top border-start mx-0">
        {items.map((item, i) => (
          <Link href={`/gallery?brand=${item.slug}`} key={item._id + i}
            className="col text-center border-end border-bottom p-0"
          >
            <div className={c.card}>
              <ImageLoader
                src={item.image[0].url}
                alt={item.name}
                width={180}
                height={120}
                style={{ width: "auto", height: "70px" }}
              />
              <div className={c.name}>{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    */}
    
    </>
  );
}
