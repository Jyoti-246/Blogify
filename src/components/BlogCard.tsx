import type { Blog } from "../types/blog";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const [, setSearchParams] = useSearchParams();
  const dateObj = new Date(blog.date);

  const handleClick = () => {
    setSearchParams({ blog: String(blog.id) });
  };

  return (
    <Card
      className="w-full max-w-sm border border-gray-500"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-gray-800 text-xl font-bold">
          {blog.title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm font-semibold">
          {blog.description}
        </CardDescription>
      </CardHeader>
      {/* <CardContent>
        <p>Card Content goes here</p>
      </CardContent> */}
      <CardFooter className="text-gray-800 text-xs font-semibold border-t gray-100">
        <p>
          {dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
