import logo from "@/assets/images/logo.svg";

const Logo = ({ height = 30 }: { height?: number | string }) => {
  return (
    <img
      src={logo}
      style={{
        width: "auto",
        height,
      }}
    />
  );
};

export default Logo;
