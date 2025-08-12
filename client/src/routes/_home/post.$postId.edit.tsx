import UserButton from "@/components/user-button";
import { type CreatePost } from "@/schema/post.schema";
import { updatePost } from "@/services/post";
import { postQueries } from "@/services/queries";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Image, Trash2 } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

export const Route = createFileRoute("/_home/post/$postId/edit")({
	component: EditPost,
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(postQueries.post(params.postId)),
});

function EditPost() {
	const queryClient = useQueryClient();
	const postId = Route.useParams().postId;
	const navigate = Route.useNavigate();
	const { data: post } = useSuspenseQuery(postQueries.post(postId));

	const {
		control,
		register,
		handleSubmit,
		watch,
		getValues,
		setValue,
		formState: { isSubmitting },
	} = useForm<CreatePost>({
		defaultValues: {
			body: post.data.body,
			images: post.data.image_urls,
		},
	});

	const { mutateAsync: editPost } = useMutation({
		mutationFn: (data: FormData) => updatePost(postId, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["posts", postId] });
			navigate({ to: "/" });
		},
	});

	const watchImages = useWatch({
		control,
		name: "images",
		defaultValue: getValues("images"),
	});

	const onSubmitPost = async (data: CreatePost) => {
		data.images = watchImages;
		const formData = new FormData();
		formData.append("body", data.body);
		data.images.forEach(image => {
			if (image instanceof File) {
				formData.append("images", image);
			} else {
				formData.append("images", image);
			}
		});
		await editPost(formData);
	};

	const handleRemoveImage = (index: number) => {
		setValue(
			"images",
			watchImages.filter((_, i) => i !== index)
		);
	};

	const isEmpty = watch("body")?.length === 0;

	return (
		<div className='max-w-6xl mx-auto p-6'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-900 mb-2'>Edit Post</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmitPost)}>
				<div className='max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4'>
					<UserButton className='text-base' avatarClassName='w-12 h-12' />
					<textarea
						className='w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400'
						placeholder="What's happening?"
						{...register("body")}
					/>
					<div className='flex flex-wrap gap-2 mt-4'>
						{Array.from(watchImages).map((postImage, index) => (
							<div className='relative group' key={`post-image-${index}`}>
								{typeof postImage === "string" ? (
									<img className='h-20 rounded-md' src={postImage} />
								) : (
									<img
										className='h-20 rounded-md'
										src={URL.createObjectURL(postImage)}
									/>
								)}
								<div
									className='absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer text-white'
									onClick={() => handleRemoveImage(index)}
								>
									<Trash2 />
								</div>
							</div>
						))}
					</div>
					<div className='flex items-center justify-between pt-3 border-t border-gray-300'>
						<label
							htmlFor='images'
							className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer'
						>
							<Image />
						</label>
						<Controller
							control={control}
							name='images'
							render={({ field: { onChange, value } }) => {
								return (
									<input
										{...register(`images`)}
										id='images'
										accept='image/*'
										type='file'
										multiple
										onChange={e => {
											console.log([...value, ...Array.from(e.target.files!)]);
											onChange([...value, ...Array.from(e.target.files!)]);
										}}
										className='sr-only'
									/>
								);
							}}
						/>
						<button
							className='text-sm enabled:bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:bg-gray-300 disabled:text-white/80 disabled:cursor-not-allowed enabled:active:scale-95 transition text-white font-medium px-8 py-2 rounded-md cursor-pointer'
							disabled={isSubmitting || isEmpty}
						>
							Publish Post
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
