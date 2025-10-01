import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Button = ({ title, href }) => {
  return (
    <Link to={href}>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className=" border-2 border-[#344E41] rounded-3xl bg-[#344E41]/70 px-4 py-2"
      >
        {title}
      </motion.button>
    </Link>
  );
};

export default Button;
