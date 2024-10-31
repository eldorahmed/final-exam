import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getArticleById } from '../request';
const ArticleDetail = () => {
  const { id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const navigate =useNavigate()
  const handleNext = () => {
    navigate(`/article/${article.id+1}`);
  };

  useEffect(() => {
    const fetchArticle = async () => {
        setLoading(true);
        setLoadings(true);
      try {
        const data = await getArticleById(id); 
        setArticle(data);
      } catch (error) {
        console.error("Failed to fetch article details:", error);
      } finally {
        setLoading(false);
        setLoadings(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className='text-center'>Loading...</div>; 
  }

  if (!article) {
    return <div>Article not found.</div>; 
  }

  return (
    <div className="container mx-auto p-5">
        <Link to='/' className='py-2 px-7 bg-slate-400 rounded-xl '>Back Home</Link>
        {loadings?<h1>Loading</h1>:<Link  onClick={handleNext} className='py-2 px-7 bg-slate-400 rounded-xl  ml-5'>Next</Link>}
      <h1 className="text-4xl font-bold mb-4 mt-5">{article.title}</h1>
      <img
        className="w-full h-64 object-cover mb-4"
        src='https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D'
        alt={article.title}
      />
      <p className="text-gray-700 mb-4 dark:text-white">{article.description}</p>
      <i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga maxime voluptatem earum dolor laudantium explicabo harum recusandae repellat quo aut, itaque pariatur ex quaerat, adipisci est. Voluptatum sapiente perspiciatis esse dicta inventore neque iure explicabo illo recusandae atque nulla, fugiat labore. Id vero enim itaque totam libero quod dolor accusamus tenetur dolorum quis voluptatem doloribus vel illum qui ratione ullam, nihil eveniet iusto eum nobis sint similique cupiditate modi. Rem ex architecto dignissimos, vel cumque consectetur placeat. Nobis vero reiciendis aperiam adipisci modi non qui expedita assumenda omnis vel! Necessitatibus alias et rem nostrum voluptatum debitis repellat accusamus reprehenderit vero, quaerat nobis minus cupiditate fugit distinctio at nihil delectus quidem. Consectetur quas dignissimos ad laboriosam esse animi dolore exercitationem accusantium, libero tempore voluptatum ab vero numquam, tenetur sequi, minus illum? Dignissimos, alias. Aut aspernatur cumque sequi iusto saepe, fuga tenetur, nisi odio esse perspiciatis officiis? Culpa animi ipsa praesentium accusantium accusamus fugit! Quia, voluptatibus deleniti velit explicabo ipsam saepe omnis autem possimus officiis exercitationem commodi fuga debitis et nihil nobis adipisci hic alias, suscipit est repellat. Earum a maiores rerum et animi velit reprehenderit ipsa totam asperiores, perspiciatis possimus aliquid molestias dolorum, pariatur unde nihil, accusantium cumque impedit vel optio?</i>
      <p className="text-sm text-gray-500 dark:text-white mt-20">By {article.author.name} on {article.createdDate}</p>
    </div>
  );
};

export default ArticleDetail;