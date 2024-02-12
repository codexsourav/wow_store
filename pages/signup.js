import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeadData from "~/components/Head";
import { postData } from "~/lib/clientFunctions";
import classes from "~/styles/signin.module.css";

export default function SignUpPage() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  const settings = useSelector((state) => state.settings);
  const { facebook, google } = settings.settingsData.login;

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      if (password.current.value === passwordConfirm.current.value) {
        const data = new FormData();
        data.append("name", name.current.value);
        data.append("email", email.current.value);
        data.append("password", password.current.value);
        const response = await postData(`/api/auth/signup`, data);
        response.success
          ? (toast.success("New account added successfully"),
            document.querySelector("#signup_form").reset())
          : !response.success && response.duplicate
          ? toast.error("User with the given email is already exists")
          : toast.error("Something went Wrong");
      } else {
        toast.error("Both Password Field Value Not Matched");
        passwordConfirm.current.focus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HeadData title="Register" />
      <div className={classes.container}>
        <div className={classes.card}>
          <h1>SIGN UP</h1>
          <form onSubmit={handleForm} id="signup_form" className={classes.form}>
            <input
              type="text"
              ref={name}
              required
              placeholder="Name*"
              className="form-control"
            />
            <input
              type="email"
              ref={email}
              required
              placeholder="Email address*"
              className="form-control"
            />
            <input
              type="password"
              ref={password}
              required
              placeholder="New Password*"
              className="form-control"
            />
            <input
              type="password"
              ref={passwordConfirm}
              required
              placeholder="Confirm Password*"
              className="form-control"
            />
            <div className={classes.reset_link}>
              <Link href="/signin">Already have an account? Sign In</Link>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {(facebook || google) && <span className={classes.hr} />}
          <div>
            {facebook && (
              <button
                variant="outline"
                onClick={async () => await signIn("facebook")}
                className={classes.facebook}
              >
                SIGN IN WITH FACEBOOK
              </button>
            )}
            {google && (
              <button
                variant="outline"
                onClick={async () => await signIn("google")}
                className={classes.google}
              >
                SIGN IN WITH GOOGLE
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

SignUpPage.footer = false;
