import { useSelector } from "react-redux";
import MyArticles from "./MyArticles";
import { useDispatch } from "react-redux";
import { setArticles } from "../store/appSlice"; 

const MyProfile = () => {
  const dispatch = useDispatch(); 
  const admin = useSelector((state) => state.app.admin);
  const articles = useSelector((state) => state.app.articles);

  const handleDeleteArticle = (id) => {
    const updatedArticles = articles.data.filter((article) => article.id !== id);
    dispatch(setArticles({ ...articles, data: updatedArticles })); 
  };
  const myArticles = articles?.data.filter((article) => article.author?.name === admin.username);

  return (
    <div className="container mx-auto flex w-full flex-wrap justify-center gap-3">
      {myArticles && myArticles.length > 0 ? (
        myArticles.map((article) => {
          const { author } = article;
          return (
            <MyArticles
              category={article.category}
              readTime={article.readTime}
              key={article.id}
              title={article.title}
              description={article.description}
              createdDate={article.createdDate}
              avatar={article.author.avatar}
              name={article.author.name}
              id={article.id}
              onDelete={handleDeleteArticle} 
            />
          );
        })
      ) : (
        <div className="text-center text-gray-500 text-5xl dark:text-white">
          No content yet
        </div>
      )}
    </div>
  );
};

export default MyProfile;