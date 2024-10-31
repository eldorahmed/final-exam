// src/store/appSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialAdminState = JSON.parse(localStorage.getItem("admin")) || false;

const appSlice = createSlice({
  name: "app",
  initialState: {
    admin: initialAdminState,
    articles: null,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    updateArticleInStore: (state, action) => {
      const updatedArticle = action.payload;
      const index = state.articles?.data?.findIndex(
        (article) => article.id === updatedArticle.id,
      );

      if (index !== -1) {
        state.articles.data[index] = {
          ...state.articles.data[index],
          ...updatedArticle,
        };
      }
    },
    addArticleToStore: (state, action) => {
      if (state.articles) {
        state.articles.data.push(action.payload);
      } else {
        state.articles = {
          data: [action.payload],
        };
      }
    },
    logout: (state) => {
      state.admin = false;
      localStorage.removeItem("admin");
    },
  },
});

export const {
  setAdmin,
  logout,
  setArticles,
  updateArticleInStore,
  addArticleToStore,
} = appSlice.actions;
export default appSlice.reducer;
