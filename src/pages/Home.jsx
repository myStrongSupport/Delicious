import React from "react";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div>
      <Popular />
      <Veggie />
    </motion.div>
  );
};

export default Home;
