import { ReactNode } from "react";

function IconBtn({
  Icon,
  isActive,
  colorClasses = " text-blue-500",
  children,
}: {
  Icon: any;
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
