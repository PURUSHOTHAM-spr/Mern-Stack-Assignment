import {useForm} from "react-hook-form"


function FormDemo(){
    const {register, handleSubmit,formState:{errors}} = useForm();

    console.log("errors")

    //form submission
    const submitForm=(obj)=>{
        console.log(obj);
    }
    return(
        <div className="text-center bg-blue-100">
            <h1 className="text-2xl font-bold">Form</h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="mb-2 ">
                <input className="border" type="text" name="username" id="username" placeholder="Username" {...register("username", {required: true,minLength:3})} />
                </div>
                {
                    errors.username?.type==='required'&& <p className="text-red-500">Username required</p>
                }
                {
                    errors.username?.type==='minLength'&& <p className="text-red-500">length required</p>
                }
                <div className="mb-2">
                <input className="border" type="email" name="email" id="email" placeholder="Email" {...register("email", {required: true})} />
                </div>
                <button className="bg-blue-400 py-2 px-4 rounded-md text-white" type="submit">Login</button>
            </form>
        </div>
    )
}
export default FormDemo;