import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        about: "About",
        articles: "Articles",
        profile: "My Articles",
        write:"Write",
        userProfile:"My Profile",
      },
      input:{
        desc:"Description",
        title:"Title",
        category:'Select a category',
        time:'Enter reading time',
      }
    },
  },
  ru: {
    translation: {
      navbar: {
        home: "Главная",
        about: "О нас",
        articles: "Статьи",
        profile: "Moy Статьи",
        write:"Писать",
        userProfile:"Мой профиль",
      },
      input:{
        desc:"Описание",
        title:"Заголовок",
        category:'Выберите категорию',
        time:"Введите время чтения"
      }
    },
  },
  uz: {
    translation: {
      navbar: {
        home: "Bosh sahifa",
        about: "Biz haqimizda",
        articles: "Maqolalar",
        profile: "Mening Maqolalarim",
        write:"Yozish",
        userProfile:"Mening Sahifam",
      },
      input:{
        desc:"Ma'lumot",
        title:"Sarlavha",
        category:'Kategoriyani tanlang',
        time:"O'qish vaqtini kiriting"
      }
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
