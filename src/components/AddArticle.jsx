import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { collectItem, getFormData } from "../lib/my-utils";
import { useSelector } from "react-redux";
import { addArticle, refreshToken } from "../request";
import { setAdmin, addArticleToStore } from "../store/appSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { UpdateIcon } from "@radix-ui/react-icons";

const AddArticle = () => {
  const admin = useSelector((state) => state.app.admin);
  const articles = useSelector((state) => state.app.articles);
  const [sendingData, setSendingData] = useState(null);
  const [category, setCategory] = useState("IT");
  const { t } = useTranslation();
  const categories = articles && collectItem(articles.data, "category");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    const author = { name: admin?.username, avatar: admin?.avatar };
    const formattedDate = new Date().toLocaleDateString("en-GB");
    setSendingData({
      ...result,
      createdDate: formattedDate,
      author,
      category,
      readTime: result.readTime + " daqiqa",
    });
  };

  useEffect(() => {
    if (sendingData && admin?.access_token) {
      setLoading(true);
      addArticle(admin.access_token, sendingData)
        .then((res) => {
          toast.dismiss();
          toast.success(res);

          dispatch(addArticleToStore(sendingData));

          setSendingData(null);
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken(admin.refresh_token)
              .then(({ access_token }) => {
                dispatch(setAdmin({ ...admin, access_token }));
                console.log("New access token:", access_token);
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
        .finally(() => setLoading(false));
    }
  }, [sendingData, admin?.access_token]);

  return (
    <div className="container mx-auto w-full max-w-3xl px-2">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="large-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {t("input.title")}
          </label>
          <input
            required
            name="title"
            type="text"
            id="large-input"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {t("input.desc")}
        </label>
        <textarea
          name="description"
          id="message"
          rows="4"
          className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <label
          htmlFor="categories"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {t("input.category")}
        </label>
        <select
          id="categories"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="" disabled>
            Choose a category
          </option>
          {categories?.map((categoryItem) => (
            <option
              key={categoryItem}
              className="uppercase"
              value={categoryItem}
            >
              {categoryItem}
            </option>
          ))}
        </select>
        <label
          htmlFor="number-input"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {t("input.time")}
        </label>
        <input
          type="number"
          name="readTime"
          id="number-input"
          aria-describedby="helper-text-explanation"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="in minutes"
          required
        />

        <Button className="mt-5" disabled={loading} type="submit">
          {loading ? <UpdateIcon className="animate-spin" /> : "Add Article"}
        </Button>
      </form>
    </div>
  );
};

export default AddArticle;
