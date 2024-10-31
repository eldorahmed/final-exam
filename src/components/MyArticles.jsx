import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { deleteArticle, refreshToken } from "../request";
import toast from "react-hot-toast";
import { setAdmin } from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { EditArticle } from "./EditArticle";

const MyArticles = ({
  title,
  description,
  createdDate,
  avatar,
  id,
  readTime,
  category,
  name,
  onDelete, 
}) => {
  const [deletedLoading, setDeletedLoading] = useState(false);
  const admin = useSelector((state) => state.app.admin);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const checker = confirm("Gulni ro'yhattan o'chirmoqchimisiz?");
    if (checker) {
      setDeletedLoading(true);
      deleteArticle(admin?.access_token, id)
        .then((res) => {
          toast.dismiss();
          toast.success(res);
          onDelete(id); 
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken(admin?.refresh_token)
              .then(({ access_token }) => {
                dispatch(setAdmin({ ...admin, access_token }));
              })
              .catch(() => {
                toast.info("Tizimga qayta kiring");
                dispatch(setAdmin(null));
              });
          } else {
            toast.error(message);
            dispatch(setAdmin(null));
          }
        })
        .finally(() => setDeletedLoading(false));
    }
  };

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?semt=ais_hybrid"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex gap-5 items-center">
            <Button
              onClick={handleDelete}
              disabled={deletedLoading}
              className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {deletedLoading ? "Deleting..." : "Delete"}
            </Button>
            <EditArticle
              category={category}
              readTime={readTime}
              key={id}
              title={title}
              description={description}
              createdDate={createdDate}
              avatar={avatar}
              name={name}
              id={id}
            />
        </div>
      </div>
    </div>
  );
};

export default MyArticles;