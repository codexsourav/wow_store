import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const BlogEditForm = dynamic(() =>
  import("~/components/BlogForm/blogEditForm"),
);

const EditBlog = (props) => {
  const router = useRouter();
  if (router.query.slug) {
    return <BlogEditForm slug={router.query.slug} />;
  } else {
    return null;
  }
};

EditBlog.requireAuthAdmin = true;
EditBlog.dashboard = true;

export default EditBlog;
