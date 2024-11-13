import { Separator } from "@/components/ui/separator";
import { BlogCard } from "./BlogCard";
import { Appbar } from "@/components/Appbar";
import { useBlogs } from "@/hooks";

export default function Blogs () {
    const {loading,blogs} = useBlogs();
    if(loading) return <div><Appbar/>Loading...</div>
    return <div>
        <Appbar />
       <div className="flex flex-col justify-center max-w-screen-md max-w-screen mx-auto justify-items-center"> 
       {blogs.map((blog)=>(
        <div key={blog.id}>
        <BlogCard 
        id={blog.id}
        authorName={blog.author.name||"Anonymous"}
        title={blog.title}
        content={blog.content}
        publishedDate={"02-03-2024"}
        className="flex flex-col items-center space-x-2"
        />
        <Separator orientation="horizontal"/>
        </div>
        ))}
        
    </div> 
    </div> 

}