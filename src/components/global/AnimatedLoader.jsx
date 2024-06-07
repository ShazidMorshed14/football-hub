import React from "react";

import Lottie from "react-lottie";

import { Box } from "@mui/material";
import animationData from "../../assets/animation/soccer_loader.json";

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const AnimatedLoader = () => {
  return (
    <Box>
      <Lottie options={lottieOptions} height={120} width={120} />
    </Box>
  );
};

export default AnimatedLoader;
