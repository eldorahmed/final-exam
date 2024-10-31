import { useEffect, useState } from "react";
import { getArticles } from "../request";
import { UpdateIcon } from "@radix-ui/react-icons";
import Hero from "../components/Hero";
import ArticlesList from "../components/ArticlesList";
import CategoryFilter from "../components/CategoryFilter"; 
import { setArticles } from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.app.articles);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const [selectedCategory, setSelectedCategory] = useState(""); 

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getArticles();
        dispatch(setArticles(data));
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [dispatch]);

  const filteredArticles = selectedCategory
    ? articles?.data.filter(article => article.category === selectedCategory)
    : articles?.data;

  const startIdx = (currentPage - 1) * articlesPerPage;
  const endIdx = startIdx + articlesPerPage;
  const currentArticles = filteredArticles?.slice(startIdx, endIdx);

  const totalPages = Math.ceil((filteredArticles?.length || 0) / articlesPerPage);
  const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1));
  
  return (
    <div className="container mx-auto w-full">
      <Hero />
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> {/* Add the filter here */}
      {loading ? (
        <UpdateIcon className="animate-spin w-12 h-12 text-center mx-auto" />
      ) : (
        <div>
          <div className="flex flex-wrap justify-center gap-10 mt-20 w-full">
            {currentArticles &&
              currentArticles.map((article) => (
                <div className="flex flex-wrap" key={article.id}>
                  <ArticlesList
                    id={article.id}
                    title={article.title}
                    description={article.description}
                    category={article.category}
                    date={article.createdDate}
                    avatar={article.author.avatar}
                    author={article.author.name}
                  />
                </div>
              ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}