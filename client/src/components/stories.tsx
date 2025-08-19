import type { Story } from "@/schema/story.schema";
import { storyQueries } from "@/services/queries";
import { timeAgo } from "@/utils/dayjs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export default function Stories() {
  const { data: stories } = useSuspenseQuery(storyQueries.stories());

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl  no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        <div className="rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white">
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
              <Plus size={24} className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">
              Create Story
            </p>
          </div>
        </div>
        {stories.data.map((story) => (
          <StoryItem key={story._id} story={story} />
        ))}
      </div>
    </div>
  );
}

function StoryItem({ story }: { story: Story }) {
  return (
    <div
      className="relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95"
      style={{ backgroundColor: story.background_color }}
    >
      <img
        className="absolute size-8 top-3 left-3 object-cover z-10 rounded-full ring ring-gray-100 shadow"
        src={story.user.image ?? ""}
      />
      <p className="absolute top-18 left-3 text-white/60 text-sm truncate max-w-24">
        {story.text}
      </p>
      <p className="text-white absolute bottom-1 right-2 z-10 text-xs">
        {timeAgo(story.createdAt)}
      </p>
      {story.story_type === "media" && story.media_url?.length > 0 && (
        <div className="absolute inset-0 z-1 rounded-lg bg-black overflow-hidden">
          <img
            className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
            src={story.media_url[0]}
          />
        </div>
      )}
    </div>
  );
}
