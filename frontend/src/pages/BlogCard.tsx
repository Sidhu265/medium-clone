// import { BACKEND_URL } from '@/config'
// import axios from 'axios'
// import { useState,useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface BlogCardProps {
    className?: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
    id,
    className,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    
    return <Link to={`/blog/${id}`}>
     <div className= "p-4 border border-slate-200 pb-4 flex flex-col justify-center cursor-pointer">
        <div className="inline-flex items-center gap-2">
        <div className="flex justify-center flex-col">{AvatarDemo({authorName})}</div> 
        <div className="flex flex-col">{authorName}</div>.
        <div className="font-thin text-slate-500 text-sm">{publishedDate}</div>
        </div>
        <div className="font-semibold flex justify-start text-xl pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+'...'}
        </div>
        <div className="flex justify-start text-sm text-slate-500 font-thin pt-2">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
    </div>
    </Link>

}

function AvatarDemo({authorName}: {authorName: String}) {
    return (
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{authorName[0]}</AvatarFallback>
      </Avatar>
    )
  }


















// interface Blog {
//     id: string; // or string, depending on your backend
//     title: string;
//     content: string;
// }
// export default function Blogs() {
//     const [blogs,setBlogs] = useState<Blog[]>([])
//     const [loading,setLoading] = useState(true)
//     useEffect(()=>{
//     async function handleBlogs(){
//     try{
//     const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwOTgwYjE3LWUxMzAtNGM1ZS05NmMwLTlkY2VhNDQ3ODA3NyJ9.S19D1xX5QLPvvY21rjZYRVfSuXRk7ptlsAqyWnWl6TU'
//     const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
//         headers: {
//             "Authorization": jwt
//         }
//     })
//     setBlogs(response.data);
//     setLoading(false)
//     return response.data
//     }
//     catch(error){
//         console.error(error)
//     }
//     finally{
//         setLoading(false)
//     }
// }
//     handleBlogs()
//   },[])


//   if(loading===true)
//   {
//     return <div>Loading...Please wait</div>
//   }

//   return <div>jgkg,k
//       <h1>Blogs</h1>
//       {/* {blogs.map((blog)=>(
//         <div key={blog.id}>
//             <h2>{blog.title}</h2>
//             <p>{blog.content}</p>
//             </div>
//       ))} */}
//             <div className="flex justify-center">
//         {blogs.map((blog) => (
//           <div key={blog.id}>Title:{blog.title} Content:{blog.content}</div> // Wrap the title in a <div>
//         ))}
//       </div>
//     </div>
// }
