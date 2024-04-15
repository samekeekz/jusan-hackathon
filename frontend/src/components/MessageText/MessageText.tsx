import { cn } from "@/utils/mergeStyles";

const MessageText = ({
  label,
  smallText,
  className,
}: {
  label?: string;
  smallText?: string;
  className?: string;
}) => {
  return (
    <div className={cn(`${className}`)}>
      <p className="text-[20px] text-[#333333] leading-[34px] text-center">
        {label && label}
      </p>
      <p className="text-[14px] text-[#979797] leading-[34px] text-center">
        {smallText && smallText}
      </p>
    </div>
  );
};

export default MessageText;
