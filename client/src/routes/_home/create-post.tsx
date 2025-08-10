import UserButton from "@/components/user-button";
import { type CreatePost } from "@/schema/post.schema";
import { addPost } from "@/services/post";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_home/create-post")({
	component: CreatePost,
});

function CreatePost() {
	const navigate = useNavigate();
	const [previewImage, setPreviewImage] = useState("");
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { isSubmitting },
	} = useForm<CreatePost>();

	const { mutateAsync: createPost } = useMutation({
		mutationFn: (data: FormData) => addPost(data),
		onSuccess: () => {
			navigate({ to: "/" });
		},
	});

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (!files.length) return;

		setSelectedFiles(files);

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onloadend = () => {
			setPreviewImage(reader.result as string);
		};
	};

	const onSubmitPost = async (data: CreatePost) => {
		const formData = new FormData();
		formData.append("body", data.body);
		selectedFiles.forEach(file => formData.append("images", file));
		await createPost(formData);
	};

	const isEmpty = watch("body")?.length === 0 && selectedFiles.length === 0;

	return (
		<div className='max-w-6xl mx-auto p-6'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-900 mb-2'>Create Post</h1>
				<p className='text-slate-600'>Share your thoughts with the world</p>
			</div>
			<form onSubmit={handleSubmit(onSubmitPost)}>
				<div className='max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4'>
					<UserButton className='text-base' avatarClassName='w-12 h-12' />
					<textarea
						className='w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400'
						placeholder="What's happening?"
						{...register("body")}
					/>
					{previewImage && (
						<div className='w-full h-auto rounded-xl relative overflow-hidden flex items-center justify-center'>
							<button
								type='button'
								className='rounded-full flex items-center justify-center w-7 h-7 bg-black/50 absolute top-3 right-3 text-white/80 hover:text-white/100 transition cursor-pointer'
								onClick={() => {
									setPreviewImage("");
									setSelectedFiles([]);
								}}
							>
								<X size={20} />
							</button>
							<img src={previewImage} className='object-cover w-full h-full' />
						</div>
					)}
					<div className='flex items-center justify-between pt-3 border-t border-gray-300'>
						<label
							htmlFor='images'
							className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width={24}
								height={24}
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth={2}
								strokeLinecap='round'
								strokeLinejoin='round'
								className='lucide lucide-image size-6'
								aria-hidden='true'
							>
								<rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
								<circle cx={9} cy={9} r={2} />
								<path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' />
							</svg>
						</label>
						<input
							id='images'
							accept='image/*'
							hidden
							multiple
							type='file'
							{...register("images", {
								onChange: e => {
									handleUpload(e);
									setValue("images", e.target.files);
								},
							})}
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
