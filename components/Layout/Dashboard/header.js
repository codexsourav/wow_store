import { List, Person } from "@styled-icons/bootstrap";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import ImageLoader from "~/components/Image";
import Notification from "~/components/Notification";
import classes from "./header.module.css";

const DashboardHeader = (props) => {
  const { session } = useSelector((state) => state.localSession);
  // Selecting settings from global state
  const settings = useSelector((state) => state.settings);
  return (
    <div className={classes.header}>
      <nav className={classes.header_content}>
        <button
          className={classes.sidebar_button}
          onClick={() => props.toggleMenu()}
        >
          <List width={38} height={38} />
        </button>
        <div className={classes.logo}>
          <Link href="/dashboard">
            {settings.settingsData.logo[0] && (
              <ImageLoader
                src={settings.settingsData.logo[0].url}
                width={110}
                height={40}
                alt={settings.settingsData.name}
              />
            )}
          </Link>
        </div>
        <Notification />
        <div className="d-flex align-items-center">
          <a href="/" target="_blank" className="btn btn-success btn-sm mx-2">
            View Website
          </a>
        </div>
        {session && (
          <div className={classes.content}>
            <div className="dropdown">
              <button
                className={classes.menu_button}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Person width={22} height={22} />
                {session.user.name}
              </button>

              <ul className={`dropdown-menu ${classes.dropdown}`}>
                <li>
                  <Link href="/profile" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default DashboardHeader;
