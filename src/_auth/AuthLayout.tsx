import { useUserContext } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <div className="flex">
          <section className="w-1/2 flex justify-center items-center py-10">
            <Outlet/>

          </section>
          <div className="hidden xl:block w-1/2 h-full">
            <img 
              src="/assets/images/sideimage.jpg"
              alt="logo"
              className="w-full h-full object-cover bg-no-repeat"  
            />
            </div>
        </div>
      )}
    </>
  );
}

// export default AuthLayout;
