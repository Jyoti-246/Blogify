import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlogForm } from "./BlogForm";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex px-8 py-6 border-b border-gray-400 bg-gray-100 justify-between">
      <span className="text-2xl font-bold">Blogify</span>

      <div className="flex gap-4">
        {/* 👇 CONTROL THE DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="btn bg-blue-500 px-2 py-1 rounded-md">
              Create blog
            </button>
          </DialogTrigger>

          <DialogContent className="bg-gray-100">
            <DialogHeader>
              <DialogTitle>Create Blog</DialogTitle>
            </DialogHeader>

            {/* 👇 NOW THIS WILL CLOSE THE MODAL */}
            <BlogForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>

        <span>
          <img
            src="/user-profile.jpg"
            alt=""
            className="h-10 w-10 rounded-full"
          />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
