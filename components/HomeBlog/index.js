import next from "next"
import Link from "next/link"
import Image from 'next/image'
import useOnScreen from "~/utils/useOnScreen";
import { toast } from "react-toastify";
import { fetchData } from "~/lib/clientFunctions";
import Spinner from "../Ui/Spinner";

export default function HomeBlog() {
  return (
  
<section className="blog">
  <div className="container">
    <h2 className="text-center">Our Blog</h2>
    <div className="row">
      <div className="col-xl-4 col-lg-4 col-md-6">
        <div className="blog-col">
          <div className="bog-img">
            <Image src="/images/post-1.png" width={397.49} height={287.44} alt='Blog User' />
          </div>
          <div className="blogdtls">
            <div className="blog-titles">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>

          </div>
           <div className="moredetails  pt-0 mt-0">
           <Link href=""><span>View Details</span></Link>
          </div>
        </div>
      </div>
       <div className="col-xl-4 col-lg-4 col-md-6">
        <div className="blog-col">
          <div className="bog-img">
           <Image src="/images/post-2.png" width={397.49} height={287.44} alt='Blog User' />
          </div>
          <div className="blogdtls">
            <div className="blog-titles">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>

          </div>
           <div className="moredetails  pt-0 mt-0">
           <Link href=""><span>View Details</span></Link>
          </div>
        </div>
      </div>
       <div className="col-xl-4 col-lg-4 col-md-12">
        <div className="blog-col">
          <div className="bog-img">
            <Image src="/images/post-3.png" width={397.49} height={287.44} alt='Blog User' />
          </div>
          <div className="blogdtls">
            <div className="blog-titles">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
        
          </div>
           <div className="moredetails  pt-0 mt-0">
            <Link href=""><span>View Details</span></Link>
          </div>
        </div>
      </div>
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

  )
}
