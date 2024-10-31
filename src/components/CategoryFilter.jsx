import { useSelector } from "react-redux";
import { collectItem } from "../lib/my-utils";

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    "IT",
    "ilmiy",
    "ovqat",
    "sevgi",
    "hajviya",
    "layfhak",
    "tezkor",
  ];

  return (
    <div className="mb-4 flex justify-center space-x-4">
      <button
        onClick={() => setSelectedCategory("")}
        className={`rounded-md px-4 py-2 ${!selectedCategory ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-slate-500"}`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-md px-4 py-2 ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-slate-500"}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
