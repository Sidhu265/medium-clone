import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect,useState } from "react";


interface Blog {
    
    "title": string,
    "content": string,
    "id": string,
    "author": {
        "name": string
    }

}

export const useBlogs = () => {
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([])

    useEffect(()=>{
         axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
        .catch(error=>{
            setLoading(false);
            console.error(error);
        })
    },[])

    return {
        loading,
        blogs
    }
}