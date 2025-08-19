import {
  createStorySchema,
  type CreateStory,
  type Story,
} from "@/schema/story.schema";
import { storyQueries } from "@/services/queries";
import { timeAgo } from "@/utils/dayjs";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { AlignLeft, ArrowLeft, Plus, Sparkle, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { cn, storyColors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Stories() {
  const { data: stories } = useSuspenseQuery(storyQueries.stories());

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl  no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        <CreateStory />
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
      className={cn(
        "relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 active:scale-95",
        story.background_color,
      )}
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

function CreateStory() {
  const [open, setOpen] = useState(false);

  const { mutateAsync: createStory } = useMutation(storyQueries.createStory());

  const form = useForm<CreateStory>({
    defaultValues: {
      background_color: "",
      story_type: "text",
      text: "",
      medias: [],
    },
    resolver: zodResolver(createStorySchema),
  });

  console.log(form.formState.errors);

  const onSubmit = async (data: CreateStory) => {
    const formData = new FormData();
    formData.append("text", data.text);
    formData.append("story_type", data.story_type);
    if (data.story_type === "media") {
      data.medias?.forEach((media) => {
        formData.append("medias", media);
      });
    } else {
      if (data.background_color)
        formData.append("background_color", data.background_color);
    }
    await createStory(formData);
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open}>
        <div
          className="rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white"
          onClick={() => setOpen(true)}
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
              <Plus size={24} className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">
              Create Story
            </p>
          </div>
        </div>
        <DialogContent className="bg-transparent border-0 shadow-none text-white w-[448px] p-0 sm:max-w-xl my-2">
          <DialogHeader className="relative flex items-center justify-center py-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute left-4 top-2 cursor-pointer"
            >
              <ArrowLeft size={24} className="w-5 h-5 text-white" />
            </button>
            <DialogTitle>Create Story</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Textarea
                  {...form.register("text")}
                  placeholder="What's on your mind?"
                  className={cn(
                    "w-full border-0 !text-4xl p-6 rounded-xl bg-indigo-600 text-white placeholder:text-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-96",
                    form.watch("background_color"),
                  )}
                />
              </div>
              <div className="flex gap-2">
                {storyColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      `w-6 h-6 rounded-full active:scale-105 transition hover:scale-125 border border-white ${color} hover:opacity-80 transition duration-150 cursor-pointer`,
                      {
                        "scale-125": form.watch("background_color") === color,
                      },
                    )}
                    onClick={() => form.setValue("background_color", color)}
                  />
                ))}
              </div>
              <ToggleGroup
                type="single"
                variant="outline"
                defaultValue="text"
                className="w-full gap-3"
                onValueChange={(value: "media" | "text") => {
                  form.setValue("story_type", value);
                }}
              >
                <ToggleGroupItem
                  value="text"
                  aria-label="Toggle text"
                  className="!rounded disabled:opacity-100 active:scale-95 !border-0 bg-primary transition duration-300 text-white h-10 cursor-pointer font-normal text-base"
                  disabled={form.watch("story_type") === "text"}
                >
                  <AlignLeft className="h-4 w-4" />
                  Text
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="media"
                  aria-label="Toggle upload"
                  className="!rounded !border-0 disabled:opacity-100 active:scale-95 bg-primary transition duration-300 text-white h-10 cursor-pointer font-normal text-base"
                  disabled={form.watch("story_type") === "media"}
                >
                  <Upload className="h-4 w-4" />
                  <span>Photo/Video</span>
                </ToggleGroupItem>
              </ToggleGroup>
              <DialogFooter>
                <Button
                  type="submit"
                  className="text-base w-full h-12 font-normal px-4 py-2  text-white rounded-lg disabled:opacity-95 hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer disabled:bg-gray-500"
                  disabled={
                    form.formState.isSubmitting ||
                    (form.watch("story_type") === "media" &&
                      !form.watch("medias")?.length) ||
                    (form.watch("story_type") === "text" && !form.watch("text"))
                  }
                >
                  <Sparkle size={20} className="!w-4.5 !h-4.5" />
                  Create Story
                </Button>
              </DialogFooter>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
