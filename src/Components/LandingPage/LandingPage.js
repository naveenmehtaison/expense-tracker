import React from "react";
import { motion } from "motion/react";
import landingPage from "../../Assets/Screenshot_2025-04-28_124426-removebg-preview.png";
const LandingPage = () => {
  return (
    // <div className="bg-slate-700 flex flex-col justify-items-end relative ">
    //   <motion.div
    //     className="h-full"
    //     //   initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }}
    //     //   whileInView={{ backgroundColor: "rgb(255, 0, 0)", opacity: 1 }}
    //   >
    //     <motion.h1
    //       animate={{ x: 900, y: 100, rotate: 360 }}
    //       style={{ color: "#2c1001" }}
    //       transition={{ duration: 0.5, delay: 0.1 }}
    //       className="text-#2c1001 text-9xl  font-extrabold  max-w-screen-sm whitespace-nowrap "
    //     >
    //       Penny Pilot
    //     </motion.h1>
    //     <motion.h1
    //       style={{ color: "#2c1001" }}
    //       className="text-black text-3xl font-medium  max-w-screen-sm whitespace-nowrap"
    //       initial={{ x: 500, y: 800 }}
    //       animate={{ x: 900, y: 300 }}
    //       transition={{ duration: 0.5, delay: 0.1 }}
    //     >
    //       Save Every Penny
    //     </motion.h1>
    //   </motion.div>
    //   <img className="m-3 size-7 " src={landingPage}></img>
    // </div>
    <div className="min-h-screen bg-slate-700 relative overflow-hidden">
      {/* Full-screen background image */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={landingPage}
        alt="Background"
      />

      {/* Text container (column layout) */}
      <motion.div className="relative z-10 flex flex-col items-start p-8">
        <motion.h1
          animate={{ x: 100, y: 100, rotate: 360 }}
          style={{ color: "#2c1001" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-9xl font-extrabold whitespace-nowrap mb-4"
        >
          Penny Pilot
        </motion.h1>

        <motion.h1
          style={{ color: "#2c1001" }}
          className="text-3xl font-medium whitespace-nowrap"
          initial={{ x: 50, y: 0 }}
          animate={{ x: 100, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Save Every Penny
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default LandingPage;
