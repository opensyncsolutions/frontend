import logo from "@/assets/images/logo.svg";
import logoIcon from "@/assets/images/logo-icon.svg";

const Logo = ({
  height = 30,
  icon,
  className,
}: {
  height?: number | string;
  icon?: boolean;
  className?: string;
}) => {
  return (
    <img
      src={icon ? logoIcon : logo}
      style={{
        width: "auto",
        height,
      }}
      className={className}
    />
  );
};

export default Logo;
