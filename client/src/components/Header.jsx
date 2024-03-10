import React from "react";  
import {motion} from "framer-motion"

export const Header = () => { 
return ( 
	<div> 
	<motion.header
      initial={{ y: 25, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
    />
	</div> 
); 
}; 
