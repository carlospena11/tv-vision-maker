import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

interface NavigationIconProps {
  icon: LucideIcon;
  label: string;
  focused?: boolean;
  onClick?: () => void;
  className?: string;
}

export const NavigationIcon = forwardRef<HTMLButtonElement, NavigationIconProps>(
  ({ icon: Icon, label, focused = false, onClick, className }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "group relative flex flex-col items-center justify-center gap-3",
          "transition-smooth focus:outline-none",
          className
        )}
      >
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center transition-smooth",
          "backdrop-blur-md border border-white/20",
          "bg-white/10 hover:bg-white/20 focus:bg-white/20",
          "hover:shadow-glow focus:shadow-glow",
          "hover:scale-110 focus:scale-110",
          focused && "shadow-glow scale-110 bg-white/25 border-white/40"
        )}>
          <Icon 
            className={cn(
              "w-8 h-8 transition-smooth text-white/90",
              "group-hover:text-white group-focus:text-white",
              focused && "text-white"
            )} 
          />
        </div>
        <span className={cn(
          "text-sm font-medium transition-smooth text-white/80",
          "group-hover:text-white group-focus:text-white",
          focused && "text-white"
        )}>
          {label}
        </span>
      </button>
    );
  }
);

NavigationIcon.displayName = "NavigationIcon";