import { cn } from "@/utils/mergeStyles";
import { ReactNode, CSSProperties, LinkHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  children: ReactNode;
  link: string;
  className?: string;
  style?: CSSProperties;
}

const ButtonLink = ({
  children,
  link,
  className,
  style,
  ...props
}: ButtonLinkProps & LinkHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      to={link}
      className={cn(
        `py-5 px-[60px] bg-[#FF6300] hover:bg-[#FF7F50] transition-colors flex items-center justify-center text-center font-bold text-xl text-white border-none rounded-[20px] ${className} text-nowrap shrink-0`
      )}
      style={style}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
