import { memo, useRef } from "react";
import { toast } from "react-toastify";
import { postData } from "~/lib/clientFunctions";
import classes from "./newsletter.module.css";

const Newsletter = () => {
  const email = useRef("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await postData("/api/subscribers/new", {
        email: email.current.value.trim(),
      });
      response.success
        ? toast.success("You Have Subscribed Successfully")
        : toast.error("Something Went Wrong");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (

   
        <form onSubmit={handleSubmit}>
          <input type="email"
            name="email"
            placeholder="Your email address"
            required
            ref={email}
          />
          <button type="submit">
            Submit
          </button>
        </form>
        
        
  );
};

export default memo(Newsletter);
