import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import { SignupInput } from '../../../bakend/src/zod'
import axios from "axios"
import { BACKEND_URL } from "@/config";

export const Auth = ({type}:{type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name: " ",
        username: " ",
        password: " "
    })

    async function sendRequest() {
      try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs);
      const jwt = response.data.token;
      try {
        localStorage.setItem("token", jwt);
      } catch (error) {
        console.error("Error setting JWT in localStorage:", error);
      }
      navigate("/blogs");  
      }
      catch(e: any){
        alert(type === 'signup'? "Error while Singning Up": "Error while Signing in")
        console.log(e.response.data)
      }

    }

    return <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex justify-center">
        <div>
        <div className="text-4xl font-bold">
            Create an account
        </div>
        <div className="text-slate-600">
           {type === "signup" ? "Already have an account?" : "Don't have an account?" }
           <Link className="underline" to={ type==='signup' ? '/signin' : '/signup'}>
           {type==='signup' ? 'Login' : "Sign Up"}
           </Link>
        </div>
        </div>
        </div>
        <LabelledInput label="Username" placeholder="Enter Username" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            username: e.target.value
          })
        }}/>
        <LabelledInput label="Password"  type={"password"} placeholder="Enter Password" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            password: e.target.value
          })
        }}/>

        {type === 'signup' &&<LabelledInput label="Name"   placeholder="Enter Name" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            name: e.target.value
          })
        }}/>}

       <button onClick={sendRequest} className="w-[410px] rounded-md bg-black text-white p-2 mt-8 ">{type === "signup" ? "Sign Up" : "Sign In"}</button>
    </div>
}

interface LabelledInputType {
    label:string;
    placeholder:string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    type?: string;
}

function LabelledInput({label, placeholder, type,onChange}:LabelledInputType) {
    return <div className="w-[420px] mt-4"> 
     <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
    <input onChange={onChange} type={ type ||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
</div> 
}