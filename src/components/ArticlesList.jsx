import React from "react";
import { Card, Badge, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ArticlesList = ({
  category,
  title,
  description,
  date,
  author,
  avatar,
  id,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/article/${id}`);
  };
  return (
    <Card
      onClick={handleCardClick}
      className="max-w-sm w-full overflow-hidden rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="h-48 w-full object-cover"
        src="https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D"
        alt={title}
      />
      <div className="p-5">
        <Badge color="info" className="mb-2 w-20">
          {category}
        </Badge>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex items-center">
          <Avatar img={avatar} rounded={true} size="md" />
          <div className="ml-2 text-sm">
            <p className="text-gray-900 dark:text-white">{author}</p>
            <p className="text-gray-500 dark:text-gray-400">{date}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ArticlesList;
