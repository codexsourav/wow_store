import Link from "next/link";
import classes from "./banner.module.css";
import Image from "next/image";

const Banner = (props) => {
  if (!props.banner) return null;

  return (
      
      <>
      <section className="who-we-glave">
  <div className="container">
    <div className="row">
      <div className="col-lg-3">
        <Image src="/images/watch-1.webp" width={196.8} height={348.7} alt={props.banner.title} align="right" className="topgap" />
      </div>
      <div className="col-lg-6">
        <div className="who-we-glave-content">
          <div className="tag text-center">{props.banner.title}</div>
          <h2 className="text-center pt-2 pb-2">{props.banner.subTitle}</h2>
          <p className="normText text-center">{props.banner.description}</p>
          <div className="moredetails text-center">
            <Link href='/product'><span>View All Products</span></Link>
            </div>
        </div>
      </div>
      <div className="col-lg-3">
        <Image src="/images/watch-2.webp" width={196.8} height={332.39} alt={props.banner.title} align="left" className="topgap" />
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default Banner;
