const MessageTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1 className={`font-bold text-[38px] text-[#333333] ${className}`}>
      {title}
    </h1>
  );
};

export default MessageTitle;
