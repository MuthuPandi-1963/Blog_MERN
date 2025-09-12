import { useState } from 'react';
import { Button } from "@/components/ui/button"

function CreateBlog (){
    const [error, setError] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    city:"",
  });
  const [formDetails, setFormDetails] = useState({
    userName: "",
    email: "",
    title: "",
    content: "",
    city:"Select City",
    bio:"",
  });
    
        return (        
            <section className={`h-screen -mt-15 flex items-center justify-center  bg-[url(https://w0.peakpx.com/wallpaper/686/647/HD-wallpaper-black-orange-abstract-black-design-lines-modern-premium-simple-white-thumbnail.jpg)]  object-cover bg-cover `}>
                <form action="" className="flex flex-col gap-8 bg-transparent opacity-95 p-10 rounded-lg shadow-sm shadow-black backdrop-blur-md ">
                <h1 className="text-4xl text-center  mb-5 font-bold" >Create <span className="text-orange-500">Blog</span></h1>
                    <label htmlFor=""><input type="text" name="username" className="bg-black/75 text-white  rounded-full w-[100%]   px-3 outline-none  shadow-black shadow-sm focus:border-b-2 focus:border-orange-600 focus:shadow-none h-[50px] shadow py-2" placeholder="Username" /></label>
                    <label htmlFor=""><input type="text" name="Email" className="bg-black/75 text-white  rounded-full w-[100%]  px-3 outline-none shadow-black shadow-sm focus:border-b-2 focus:border-orange-600 focus:shadow-none h-[50px] shadow py-2" placeholder="Email" /></label>
                    <div className="titleContent flex gap-4">
                    <label htmlFor=""><input type="text" name="Title" className="bg-black/75 text-white  rounded-full w-2xs  px-3 outline-none shadow-black shadow-sm focus:border-b-2 focus:border-orange-600 focus:shadow-none h-[50px] shadow py-2" placeholder="Title" /></label>
                    <label htmlFor=""><input type="text" name="Content" className="bg-black/75 text-white  rounded-full w-2xs  px-3 outline-none shadow-black shadow-sm focus:border-b-2 focus:border-orange-600 focus:shadow-none h-[50px] shadow py-2" placeholder="Content" /></label>
                    </div>
                    <div className="urls flex gap-4">
                    <label htmlFor=""><input type="text" name="Image URL" className="bg-black/75 text-white  rounded-full w-2xs  px-3 outline-none shadow-black shadow-sm focus:border-b-2 focus:border-orange-600 focus:shadow-none h-[50px] shadow py-2" placeholder="Image URL" /></label>
                    <label htmlFor=""><input type="text" name="Profile Pic URL" className="bg-black/75 text-white  rounded-full w-2xs  px-3 outline-none shadow-black shadow-sm focus:border-b-2 focus:border-orange-600 focus:shadow-none h-[50px] shadow py-2" placeholder="Profile Pic URL" /></label>
                    </div>
                    <Button variant="outline" >Submit</Button>
                    {/* <button className="btn mt-5 shadow shadow-black cursor-pointer  to-white font-semibold bg-green-400  hover:scale-3d w-[200px] mx-auto py-2 px-2 rounded-full ">Submit</button> */}
                </form>
            </section>
        )
}

export default CreateBlog;