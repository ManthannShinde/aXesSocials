import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {

  const {pathname} = useLocation();

  return (
    <section className="bottom-bar">
        {bottombarLinks.map((link : INavLink) => {
                  const isActive = pathname === link.route;
                  return (

                    
                        <Link to={link.route}  key={link.label} className={`p-2 flex-center flex-col gap-1 ${isActive && ' bg-primary-500 rounded-lg transition'}`}>
                          <img src={link.imgURL} alt={link.label} width={18} height={18} className={`group-hover:invert-white ${isActive && ' invert-white'}`}/>
                            <p className="tiny-medium text-light-2">{link.label}</p>
                        </Link>
                    
                  
                  )
                  })}
    </section>
  );
}

export default Bottombar;
