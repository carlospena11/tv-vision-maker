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
          "group relative flex flex-col items-center justify-center",
          "w-24 h-24 rounded-full transition-smooth",
          "backdrop-blur-md border border-glass-border",
          "bg-glass hover:bg-glass focus:bg-glass",
          "hover:shadow-glow focus:shadow-glow focus:outline-none",
          "hover:scale-110 focus:scale-110",
          focused && "shadow-glow scale-110 bg-primary/20 border-primary/30",
          className
        )}
      >
        <Icon 
          className={cn(
            "w-8 h-8 mb-2 transition-smooth text-foreground/80",
            "group-hover:text-foreground group-focus:text-foreground",
            focused && "text-primary"
          )} 
        />
        <span className={cn(
          "text-sm font-medium transition-smooth text-foreground/70",
          "group-hover:text-foreground group-focus:text-foreground",
          focused && "text-primary"
        )}>
          {label}
        </span>
      </button>
    );
  }
);

NavigationIcon.displayName = "NavigationIcon";