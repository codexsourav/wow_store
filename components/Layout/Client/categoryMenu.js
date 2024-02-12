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

export default function CategoryMenu() {
  const [loading, setLoading] = useState(true);
   const [showCategory, setShowCategory] = useState(false);
  const router = useRouter();

const { session } = useSelector((state) => state.localSession);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setShowCategory(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
              <>
               <Link href="#"  data-bs-toggle="dropdown">
                     <Image src="/images/user.png"  width={27} height={27} alt='wow' />
                  </Link>
              <ul className="dropdown-menu">
                <li><Link  href="/profile"  shallow={true}>
                    <span>{session.user.name}</span>
                  </Link>
                </li>
                {session && (session.user.a || session.user.s.status) && (
                 <li>
                  <Link href="/dashboard" shallow={true}>Dashboard</Link> </li>
                )}
                <li>
                  <Link href="#" onClick={() => signOut({ callbackUrl: "/" })} shallow={true}>
                    Logout
                  </Link>
                </li>
              </ul>
    </>
  );
}
