import Link from "next/link";
import ImageLoader from "../Image";
//import c from "./brandList.module.css";

export default function BrandCardList({ items }) {
  return (
      <>
<section className="client-logo">
  <div className="container">
    <div className="client-logo-padding">
      <div className="owl-carousel logoSlider owl-theme">
      { items.map((item, i) => (
                 <Link href={`/product?brand=${item.slug}`} key={item._id + i}>
                        <ImageLoader src={item.image[0].url} alt={item.name} width={205} height={182} />
                </Link>
      ))
      }
      
      </div>
    </div>
  </div>
</section>
    
    </>
  );
}
