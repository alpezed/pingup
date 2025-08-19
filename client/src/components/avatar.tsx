import { cn } from "@/lib/utils";
import type { Author } from "@/schema/post.schema";

// Generate a color based on the user's id or name
const colors = [
  "bg-red-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-green-400",
  "bg-emerald-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-sky-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-violet-400",
  "bg-purple-400",
  "bg-fuchsia-400",
  "bg-pink-400",
  "bg-rose-400",
];

export function UserAvatar({
  user,
  className,
}: {
  user: Partial<Author>;
  className?: string;
}) {
  if (!user.image) {
    const str = user._id || user.email || user.name || "";
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = colors[Math.abs(hash) % colors.length];
    return (
      <div
        className={cn(
          `w-10 h-10 rounded-full shadow flex items-center justify-center text-lg ${color} text-white`,
          className,
        )}
      >
        {user.name?.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      alt="profile"
      className={cn("w-10 h-10 rounded-full shadow object-cover", className)}
      src={user.image}
    />
  );
}
