import Santa from "@/assets/icons/Santa.svg";
import { cn } from "@/utils/mergeStyles";

const GameSantaImage = ({ className }: { className?: string }) => {
  return (
    <img
      src={Santa}
      alt="Santa Claus"
      className={cn(`rounded-[20px] ${className}`)}
    />
  );
};

export default GameSantaImage;
