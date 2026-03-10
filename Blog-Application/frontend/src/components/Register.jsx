import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios";
import { useNavigate } from 'react-router';
import {
  pageBackground,
  pageWrapper,
  section,
  cardClass,
  pageTitleClass,
  headingClass,
  subHeadingClass,
  bodyText,
  mutedText,
  linkClass,
  primaryBtn,
  secondaryBtn,
  ghostBtn,
  formCard,
  formTitle,
  labelClass,
  inputClass,
  formGroup,
  submitBtn,
  navbarClass,
  navContainerClass,
  navBrandClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  articleBody,
  timestampClass,
  tagClass,
  errorClass,
  successClass,
  loadingClass,
  emptyStateClass,
  divider
} from "../styles/common.js";

const Register = () => {

  const { register, handleSubmit, formState:{errors} } = useForm();
  const [loading,setLoading] = useState(false)
  const navigate=useNavigate();

 const submitHandler = async (newUser) => {
  try {

    setLoading(true)

    let { role, ...user } = newUser;
    let res;

    if (newUser.role === "USER") {
      // make request to user api
      res = await axios.post("http://localhost:4000/user-api/users", user);
     
    } 
    else if (newUser.role === "AUTHOR") {
      // make request to author api
      res = await axios.post("http://localhost:4000/author-api/users", user);
    }

    console.log(res.data);

  } 
  catch (err) {
    console.log(err.response?.data || err);
  } 
  finally {
    setLoading(false);
  }

  }
  return (
    <div className='p-20 text-center'>
        <h1 className='text-5xl'>Register</h1>
      <form onSubmit={handleSubmit(submitHandler)} className='bg-[#f5f5f7] rounded-2xl p-10 max-w-md mx-auto'>
        <div className='flex w-full m-auto gap-3 justify-center items-center'>
            <h2 className='font-medium'>Select Role</h2>
            <div className=''>
                <input type="radio" {...register("role",{required:true})} value={"USER"} id="" />
                <label htmlFor="role">User</label>
            </div>
            <div>
                <input type="radio" {...register("role",{required:true})} value={"AUTHOR"} id="" />
                <label htmlFor="role">Author</label>
            </div>
            
        </div>
        {
                errors.role?.type === "required" && <p className='text-red-600'>Choosing role is required</p>
        }
        <div className='mt-2 w-full m-auto flex flex-col gap-3 justify-center  md:flex-row md:gap-1'>
            <input {...register("firstName",{required:true,minLength:3})} className='bg-gray-400 md:w-2/5 rounded-2xl px-2 md:p-2 text-center' type="text" placeholder='First Name' />
            <input {...register("lastName",{required:true,minLength:3})}className='bg-gray-400 md:w-2/5 rounded-2xl px-2 md:p-2 text-center' type="text" placeholder='Last Name' />
        </div>
        {
            errors.firstName?.type === "required" && <p className='text-red-600'>First name is required</p>
        }
        {
            errors.firstName?.type === "minLength" && <p className='text-red-600'>minimum length should be 3</p>
        }
        {
            errors.lastName?.type === "required" && <p className='text-red-600'>First name is required</p>
        }
        {
            errors.lastName?.type === "minLength" && <p className='text-red-600'>minimum length should be 3</p>
        }
        <div className='mt-2 flex flex-col gap-2 w-full  md:w-full m-auto justify-center '>
            <input {...register("email",{required:true})} className='bg-gray-400 w-full md:w-4/5 rounded-2xl md:p-2 m-auto px-2 text-center' type="email" placeholder='Email' />
            { 
                errors.email?.type === "required" && <p className='text-red-600'>email is required</p>
            }
            <input  {...register("password",{required:true,minLength:6,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/})} className='bg-gray-400 w-full md:w-4/5 rounded-2xl md:p-2 m-auto px-2 text-center' type="password" placeholder='Password' />
            {
                errors.password?.type === 'required' && <p className='text-red-600'>password is required</p>
            }
            {
                errors.password?.type === 'minLength' && <p className='text-red-600'>min length of password is 6</p>
            }
            {
                errors.password?.type === 'pattern' && <p className='text-red-600'>Password must contain uppercase, lowercase and number</p>
            }
            <input {...register("profileImageUrl",{required:true})} className={inputClass}type="text"placeholder="Profile Image URL"/>
            {errors.profileImageUrl && (<p className="text-red-600">Profile image is required</p>)}
        </div>

        <button className={submitBtn} type="submit">Register</button>
        

      </form>
      {loading && <p className={loadingClass}>Registering...</p>}
    </div>
  )
}

export default Register