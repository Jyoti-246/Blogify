// src/components/BlogForm.tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogApi";
import { useState } from "react";
import type { Blog } from "../types/blog";
import { Button } from "@/components/ui/button";

interface Props {
  onSuccess?: () => void;
}

export const BlogForm = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Blog, Error, Omit<Blog, "id">>({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      onSuccess?.();
    },
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      title,
      description,
      content,
      coverImage,
      category: [],
      date: new Date().toISOString(),
    });
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="input outline-none"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="input outline-none"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="textarea outline-none"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleImageUpload(e.target.files[0]);
          }
        }}
      />

      {/* Image Preview */}
      {coverImage && (
        <img
          src={coverImage}
          alt="Preview"
          className="h-40 w-full object-cover rounded-md"
        />
      )}

      <Button
        type="submit"
        variant="outline"
        className="bg-blue-500 text-md cursor-pointer"
        disabled={mutation.isPending || !title || !description || !content}
      >
        {mutation.isPending ? "Creating..." : "Create Blog"}
      </Button>
      {/* <button type="submit" className="btn" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Blog"}
      </button> */}
    </form>
  );
};
