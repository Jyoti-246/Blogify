import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/blogApi";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;
  return (
    <div className="grid gap-4 flex-1/4 px-4 overflow-y-scroll no-scrollbar">
      {blogs?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
