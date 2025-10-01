import { Hospital, MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import Button from "./buttons/Button";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { user, logOut } = useUserStore();
  return (
    <div className="bg-[#588157] flex items-center justify-between  px-4 md:px-8 py-4 inset-0 text-white top-0 left-0 right-0">
      {/* logo */}
      <div className="flex items-center mt-2 md:mt-0 ml-5">
        <h6 className="font-bold font text-xl md:text-2xl flex items-center gap-2">
          <Hospital /> HMS
        </h6>
      </div>

      {/* menu */}
      <div className="hidden md:flex gap-10 items-center font-semibold text-sm mr-5">
        {user && <Link to="/">Home</Link>}
        {user ? (
          <Link onClick={logOut}>Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {/* <Button title="Sign Up" href={"/signup"} /> */}
      </div>
      <div className="flex mt-2 md:hidden">
        <MenuIcon onClick={() => setNavOpen(!navOpen)} />
      </div>
      {navOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.4, smooth: "ease-in-out" }}
          className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#011936] flex flex-col items-center justify-center"
        >
          <div className="absolute top-0 right-0 px-8 py-4">
            <X onClick={() => setNavOpen(!navOpen)} />
          </div>
          <div className="flex flex-col gap-4 p-4 text-center">
            <p>Home</p>
            {user ? (
              <Link onClick={logOut}>Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
            {/* <Button title="Sign Up" /> */}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
