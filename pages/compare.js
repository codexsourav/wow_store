import { Trash3 } from "@styled-icons/bootstrap";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeadData from "~/components/Head";
import ImageLoader from "~/components/Image";
import { postData, stockInfo } from "~/lib/clientFunctions";
import { updateComparelist } from "~/redux/cart.slice";
import c from "../styles/compare.module.css";

const GlobalModal = dynamic(() => import("~/components/Ui/Modal/modal"));
const Spinner = dynamic(() => import("~/components/Ui/Spinner"));
const ProductDetails = dynamic(() =>
  import("~/components/Shop/Product/productDetails"),
);

const Compare = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { compare } = useSelector((state) => state.cart);
  const { settingsData } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  async function getData() {
    const url = `/api/home/compare`;
    const resp = await postData(url, { idList: compare });
    resp.success ? setData(resp.data) : null;
  }

  useEffect(() => {
    if (compare.length > 0) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compare]);

  //popup product viewer track
  useEffect(() => {
    if (router.query.slug) {
      setIsOpen(true);
    }
  }, [router.query.slug]);

  //modal close handler
  const handleCloseModal = () => {
    router.push("/compare", undefined, { shallow: true });
    setIsOpen(false);
  };

  function removeItem(id) {
    const filtered = compare.filter((x) => x !== id);
    dispatch(updateComparelist(filtered));
    toast.success("Item has been removed from compare list");
  }

  return (
    <>
      <HeadData title="Compare" />
      <div className={c.layout_top}>
        <h1 className={c.heading}>Compare</h1>
        {compare && compare.length > 0 ? (
          <div className={c.root}>
            <div className={c.header}>
              <ul>
                <li className={c.image}>Photo</li>
                <li>Name</li>
                <li>Price</li>
                <li>Availability</li>
                <li>Color</li>
                <li className={c.desc}>Description</li>
                <li>Action</li>
              </ul>
            </div>
            <div className={c.table}>
              <div className={c.content}>
                {data.map((item, idx) => (
                  <ul key={idx}>
                    <li className={c.image}>
                      <ImageLoader
                        src={item.image[0].url}
                        
                        height={125}
                      />
                    </li>
                    <li>{item.name}</li>
                    <li>
                      <span className={c.price}>
                        {item.discount < item.price && (
                          <del>{item.price + settingsData.currency.symbol}</del>
                        )}
                        <b>{item.discount + settingsData.currency.symbol}</b>
                      </span>
                    </li>
                    <li>
                      {stockInfo(item) ? (
                        <span className="fw-bold">In stock</span>
                      ) : (
                        <span className="fw-bold">
                          Out of stock
                        </span>
                      )}
                    </li>
                    <li>
                      {item.colors &&
                        item.colors.map((x, i) => (
                          <span
                            key={i}
                            style={{ backgroundColor: x.value }}
                            title={x.label}
                            className={c.color}
                          ></span>
                        ))}
                    </li>
                    <li className={c.desc}>{item.shortDescription}</li>
                    <li>
                      {stockInfo(item) && (
                        <Link
                          href={`/compare?slug=${item.slug}`}
                          as={`/product/${item.slug}`}
                          scroll={false}
                          shallow={true}
                          className={c.button}
                        >
                          ADD TO CART
                        </Link>
                      )}
                      <button
                        className={c.button}
                        onClick={() => removeItem(item._id)}
                      >
                       
                        <i class="fa fa-trash-o"></i>
                      </button>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center py-5 mt-3 mb-_5 fw-bold">
            No products in compare list
          </p>
        )}
      </div>
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
};

export default Compare;
