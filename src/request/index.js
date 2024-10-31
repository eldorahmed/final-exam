import { BASE_URL } from "../lib/my-utils";
export const refreshToken = async (token) => {
  const res = await fetch(BASE_URL + "/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: token }),
  });

  if (res.status === 200 || res.status === 201) {
    return await res.json();
  } else if (res.status == 403) {
    throw new Error(403);
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }
};
export async function login(data) {
  const req = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if(req.status==200||req.status==201)return await req.json()
    if(req.status==400) throw new Error("Xatolik")
    else{
throw new Error('Nimadir xatolik yuz berdi')}
}
export async function register(data) {
  const req = await fetch(BASE_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (req.status === 200 || req.status === 201) return await req.json();
  if (req.status === 400) throw new Error("Xatolik");
  else throw new Error('Nimadir xatolik yuz berdi');
}

export async function getArticles(){
const req= await fetch(BASE_URL + "/articles")
if(req.status==200||req.status==201)return await req.json()
  if(req.status==400) throw new Error("Xatolik")
  else{
throw new Error('Nimadir xatolik yuz berdi')}
}
export const addArticle = async (token, article) => {
  try {
    const res = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    });

    if (res.ok) {
      return "Ma'lumot muvaffaqiyatli qo'shildi";
    } else if (res.status === 403) {
      throw new Error("403: Ruxsat berilmagan");
    } else {
      throw new Error(`Nimadir xato ketti! Status code: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Ma'lumot qo'shishda xato yuz berdi! ${error.message}`);
  }
};
export const deleteArticle = async (token, id) => {
  console.log("Deleting article with ID:", id, `${BASE_URL}/articles/${id}`);

  try {
    const res = await fetch(`${BASE_URL}/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return "Ma'lumot muvaffaqiyatli o'chirildi";
    } else if (res.status === 403) {
      throw new Error("403: Ruxsat berilmagan");
    } else {
      throw new Error(`Xato yuz berdi! Status code: ${res.status}`);
    }
  } catch (error) {
    throw new Error(`Nimadir xato ketti! ${error.message}`);
  }
};
 export const  editProfile = async(data, id)=> {
  const token = await JSON.parse(localStorage.getItem("admin")).access_token;
  const res = await fetch(BASE_URL + `/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 403) {
    throw new Error(`${res.status}`);
  } else {
    throw new Error("Nimadir xato boldi");
  }
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(BASE_URL + "/upload", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    return await res.text();
  } else {
    throw new Error(`Nimadir xato ketti!`);
  }
}
export const editArticle = async (token, article) => {
  const res = await fetch(BASE_URL + "/articles/" + article.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });

  if (res.status === 200 || res.status === 201) {
    return "Ma'lumot muvaffaqiyatli yangilandi";
  } else if (res.status === "403") {
    throw new Error("403");
  } else {
    throw new Error("Nimadir hato ketti!");
  }
};
export const getArticleById = async (id) => {
  const response = await fetch(BASE_URL +`/articles/${id}`); 
  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }
  return response.json(); 
};
