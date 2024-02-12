import dynamic from "next/dynamic";
const BlogForm = dynamic(() =>
  import("~/components/BlogForm/blogForm"),
);

const NewBlog = () => {
  return <BlogForm />;
};

NewBlog.requireAuthAdmin = true;
NewBlog.dashboard = true;

export default NewBlog;
