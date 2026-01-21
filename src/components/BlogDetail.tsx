import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/blogApi";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Tag from "./ui/Tag";

const BlogDetail = () => {
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blog");
  const navigate = useNavigate();
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlogById(String(blogId || 1)),
  });
  console.log(blog);
  const dateObj = new Date(blog?.date ?? new Date());

  function handleBack() {
    navigate("/");
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog</div>;
  return (
    <div
      className={`${!blogId && "hidden"} flex md:flex md:flex-2/4 flex-col items-left lg:flex-3/4 md:mx-4 py-2 px-4 gap-4 rounded-xl overflow-y-scroll no-scrollbar`}
    >
      <button onClick={handleBack} className="md:hidden">
        <img src="/arrow.png" alt="" className="h-10 w-10" />
      </button>
      <img
        src={blog?.coverImage || "/placeholder.jpg"}
        alt={blog?.title}
        className="h-72 object-cover w-full rounded-xl"
      />
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mt-4">{blog?.title}</h1>
      </div>
      <div className="flex gap-2 flex-wrap mb-3">
        {blog?.category.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      <p>
        {dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      <p className="text-gray-600 text-lg">{blog?.description}</p>
      <div className="mt-1 text-md font-medium text-gray-700">
        {blog?.content}
      </div>
    </div>
  );
};

export default BlogDetail;
