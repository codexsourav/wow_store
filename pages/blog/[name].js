import { CardText, ChatLeftDots, StarHalf } from "@styled-icons/bootstrap";
import Link from 'next/link'

import customId from "custom-id-new";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Error404 from "~/components/error/404";
import Error500 from "~/components/error/500";
import HeadData from "~/components/Head";
import ImageLoader from "~/components/Image";
import CallAction from "~/components/CallAction";

import CustomSCript from "~/components/Layout/Client/Common/CustomSCript";
import {
  appUrl,
  fetchData,
  postData,
  setSettingsData,
} from "~/lib/clientFunctions";
import blogDetailsData from "~/lib/dataLoader/blogDetail";
import { wrapper } from "~/redux/store";


function BlogDetailsPage({ data, error }) {

  const { session } = useSelector((state) => state.localSession);
  const settings = useSelector((state) => state.settings);
  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  if (error) return <Error500 />;
  if (!data.blog) return <Error404 />;


  return (
    <>
      <HeadData
        title={data.blog.name}
        seo={data.blog.seo}
        url={`blog/${data.blog.slug}`}
      />
<section className="topBannerSectipn">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
             <div className="blog-col">
          <div className="bog-img">
            <ImageLoader src={data.blog.image[0].url} width={397.49} height={287.44} alt='Blog User' />
          </div>
          <div className="blogdtls">
            <div className="blog-titles">{data.blog.name}</div>
            <div className="normText" dangerouslySetInnerHTML={{ __html: data.blog.description, }} />
          </div>
           
        </div>
            </div>
            </div>
</div>
</section>
      



      <CustomSCript />
    </>
  );
}

function EmptyContent({ icon, text }) {
  return (
    <div className={classes.empty_content}>
      <div className={classes.empty_icon}>{icon}</div>
      <div className={classes.empty_text}>{text}</div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      if (res) {
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=10800, stale-while-revalidate=59"
        );
      }
      const _data = await blogDetailsData(query.name);
      const data = JSON.parse(JSON.stringify(_data));
      if (data.success) {
        setSettingsData(store, data);
      }
      return {
        props: {
          data,
          error: !data.success,
        },
      };
    }
);
export default BlogDetailsPage;
