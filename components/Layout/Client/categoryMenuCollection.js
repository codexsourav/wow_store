import { ArrowRepeat, TextLeft } from "@styled-icons/bootstrap";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OutsideClickHandler from "~/components/ClickOutside";
import ImageLoader from "~/components/Image";
import { fetchData } from "~/lib/clientFunctions";
// import c from "./categoryMenu.module.css";
import Image from 'next/image'

export default function CategoryMenuCollection({ data }) {
useEffect(()=>{})

  return (


    <>

      <h3>Shop By Gender</h3>

        {data == null ? <p>Loading...</p> : <ul className="shopByCat">
          {
            data['category'].length == 0 ? <li>No Category Found</li> : data['category'].sort().map((e, i) => <li key={i}><a href={`/product?category=${e.slug}`}>{e.name}</a></li>)
          }

        </ul>}
  

    </>
  );
}
