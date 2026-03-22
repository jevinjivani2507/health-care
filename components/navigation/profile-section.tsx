import { cn } from "@/lib/utils";
import Image from "next/image";

const ProfileSection = ({
  isExpanded,
  userName,
}: {
  isExpanded: boolean;
  userName: string;
}) => {
  return (
    <div className="flex h-full items-center px-4">
      <div className="flex items-center gap-3">
        <div className="relative size-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={`https://api.dicebear.com/9.x/adventurer/png?seed=${userName}`}
            alt={userName}
            fill
            className="object-cover"
          />
        </div>
        <span
          className={cn(
            "text-foreground overflow-hidden text-base font-semibold whitespace-nowrap transition-all duration-300 ease-in-out",
            isExpanded ? "ml-0 w-auto opacity-100" : "ml-0 w-0 opacity-0",
          )}
        >
          {userName}
        </span>
      </div>
    </div>
  );
};

export default ProfileSection;
