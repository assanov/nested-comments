import { ReactNode } from "react";
import { IconType } from "react-icons";

function IconBtn({
  Icon,

  colorClasses = " text-blue-500",
  children,
  handleClick,
}: {
  Icon: IconType;

  colorClasses?: string;
  children?: ReactNode;
  handleClick?: () => void;
}) {
  return (
    <button
      className={`flex items-center ${colorClasses}`}
      onClick={handleClick}
    >
      <span className={children !== null ? "mr-1" : ""}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
export default IconBtn;
