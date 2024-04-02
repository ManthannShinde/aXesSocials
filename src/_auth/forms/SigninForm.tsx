import { zodResolver } from "@hookform/resolvers/zod"

import  {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SigninValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useSignInAccount} from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

 


const SigninForm = () => {

  const { toast } = useToast()
  const {checkAuthUser , isLoading : isUserLoading} = useUserContext();

  const {mutateAsync : signInAccount} = useSignInAccount();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email : '',
      password : '', 
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
      
      const session = await signInAccount({email : values.email, password : values.password});

      if(!session){
        return toast({title: "Session : Sign In failed. Please Try Again"});
       }

      const isLoggedIn = await checkAuthUser();

       console.log({isLoggedIn});

      if(isLoggedIn){
        form.reset();
        navigate('/');
      } else {
        toast({title: "Sign Up failed. Please Try Again"});
      }

  }

  return (
    
    <div >

        <div className="sm:w-420 flex-center flex-col py-4">
            <img src="/assets/images/logo2.png" alt="logo"/>
            <h2 className="h3-bold md:h2-bold sm:pt-12">Log In</h2>
           
            
            <Form {...form} >
            {/* space-y-8 justify-center items-center  */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="shad-button_primary mt-2"> 
                {isUserLoading ? (
                  <div className="flex-center gap-2">
                      <Loader/> Loading...
                  </div>
                ) : (
                  "Sign In"
                )}
                </Button>
                
                <p className="text-sm-regular text-light-2 text-center mt-2">
                  Dont have an account? 
                  <Link to='/sign-up' className="text-primary-500 text-sm-semibold mx-1 underline">Sign Up</Link>
                </p>
              </form>
            </Form>
        </div>
    </div>
  );
}

export default SigninForm;
