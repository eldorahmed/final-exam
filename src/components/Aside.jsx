import React from 'react'
import { useSelector } from 'react-redux'

const Aside = () => {
    const articles = useSelector((state)=>state.app.articles)
  return (
    <div className='bg-white overflow-auto p-2 dark:bg-slate-800 fixed right-0 top-0 w-[20%] h-screen rounded-2xl mx-4 shadow-xl hidden lg:block'>
        {articles&& articles.data.slice(40,50).map((article)=>{
            return <div key={article.id} className='h-40'>
                {article.title}
            </div>
        })}
    </div>
  )
}

export default Aside