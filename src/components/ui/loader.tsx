import Lottie from "lottie-react";
import infinityLoader from "@/animations/infinity-loader.json";

const Loader = ({ size }: { size?: number }) => {
  return (
    <Lottie
      animationData={infinityLoader}
      style={{
        width: size || 160,
      }}
    />
  );
};

export const PageLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-[100dvh]">
      <Loader />
    </div>
  );
};

export default Loader;

// add button loader
