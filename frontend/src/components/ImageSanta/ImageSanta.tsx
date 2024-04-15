import Santa from "@/assets/icons/messageSentSanta.svg";
import { cn } from "@/utils/mergeStyles";

const ImageSanta = ({ className }: { className?: string }) => {
  return (
    <img
      src={Santa}
      alt="Santa Claus"
      className={cn(`rounded-[20px] ${className}`)}
    />
  );
};

export default ImageSanta;
