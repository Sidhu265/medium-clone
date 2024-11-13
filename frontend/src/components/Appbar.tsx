import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const Appbar = () => {
    const navigate = useNavigate();
    return <div className="inline-flex w-full justify-between bg-slate-200 h-14">
        <div className="text-2xl ml-2 p-2">
            Blogify
        </div>
        <div className = "mr-2 p-2">
            <Button onClick={()=>navigate('/signin')}>SIGN IN </Button>
        </div>
    </div>
}
