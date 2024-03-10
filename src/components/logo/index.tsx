import logo from "@/assets/images/logo.svg";
import logoIcon from "@/assets/images/logo-icon.svg";

const Logo = ({
  height = 30,
  icon,
}: {
  height?: number | string;
  icon?: boolean;
}) => {
  return (
    <img
      src={icon ? logoIcon : logo}
      style={{
        width: "auto",
        height,
      }}
    />
  );
};

export default Logo;
