import { ReactNode } from "react";
import { IconType } from "react-icons";

function IconBtn({
  Icon,
  isActive,
  colorClasses = " text-blue-500",
  children,
}: {
  Icon: IconType;
  isActive: boolean;
  colorClasses?: string;
  children?: ReactNode;
}) {
  return (
    <button className={`flex items-center ${colorClasses}`}>
      <span className={children !== null ? "mr-1" : ""}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
export default IconBtn;
