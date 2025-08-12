import { UserAvatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { profileSchema, type Profile } from "@/schema/profile.schema";
import { updateProfile } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function EditProfile() {
	const queryClient = useQueryClient();
	const { data: session } = authClient.useSession();
	const [open, setOpen] = useState(false);
	const [previewProfileImage, setPreviewProfileImage] = useState<
		string | null
	>();
	const [previewCoverImage, setPreviewCoverImage] = useState<string | null>();

	const { mutateAsync: updateProfileMutation } = useMutation({
		mutationFn: updateProfile,
	});

	const form = useForm<Profile>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: "",
			username: "",
			bio: "",
			location: "",
			image: null,
			cover: null,
		},
	});

	useEffect(() => {
		if (session) {
			form.reset({
				name: session.user.name,
				username: session.user.username,
				bio: session.user.bio,
				location: session.user.location,
			});
			setPreviewProfileImage(session.user?.image);
			setPreviewCoverImage(session.user?.cover_photo);
		}
	}, [session]);

	const handleProfileUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = Array.from(e.target.files || []);
		if (!files.length) return;

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onloadend = () => {
			setPreviewProfileImage(reader.result as string);
		};
	};

	const handleCoverPhotoUpload = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = Array.from(e.target.files || []);
		if (!files.length) return;

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onloadend = () => {
			setPreviewCoverImage(reader.result as string);
		};
	};

	const onSubmit = async (data: Profile) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("username", data.username);
		formData.append("bio", data.bio);
		formData.append("location", data.location!);
		if (data.image) formData.append("image", data.image);
		if (data.cover) formData.append("cover", data.cover);
		await updateProfileMutation(formData, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["user"] });
				setOpen(false);
			},
		});
	};

	return (
		<Dialog open={open}>
			<button
				className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors mt-4 md:mt-0 cursor-pointer"
				onClick={() => setOpen(true)}
			>
				<Edit size={16} />
				Edit
			</button>
			<DialogContent className="sm:max-w-2xl bg-white rounded-lg shadow p-6 my-6">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-gray-900 mb-2">
						Edit profile
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="space-y-4">
							<div className="flex flex-col items-start gap-3">
								<label
									htmlFor="profile_picture"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Profile Picture
									<input
										className="w-full p-3 border border-gray-200 rounded-lg"
										id="profile_picture"
										hidden
										accept="image/*"
										type="file"
										{...form.register("image", {
											onChange: e => {
												handleProfileUpload(e);
												form.setValue("image", e.target.files?.[0] || null);
											},
										})}
									/>
									<div className="group/profile relative">
										<UserAvatar
											user={{
												_id: session?.user.id,
												name: session?.user.name,
												email: session?.user.email,
												username: session?.user.username,
												image: previewProfileImage ?? session?.user.image,
											}}
											className="w-24 h-24 text-5xl mt-2"
										/>
										<div className="absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={24}
												height={24}
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
												className="lucide lucide-pencil w-5 h-5 text-white"
												aria-hidden="true"
											>
												<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
												<path d="m15 5 4 4" />
											</svg>
										</div>
									</div>
								</label>
							</div>
							<div className="flex flex-col items-start gap-3">
								<label
									htmlFor="cover_photo"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Cover Photo
									<input
										className="w-full p-3 border border-gray-200 rounded-lg"
										id="cover_photo"
										hidden
										accept="image/*"
										type="file"
										{...form.register("cover", {
											onChange: e => {
												handleCoverPhotoUpload(e);
												form.setValue("cover", e.target.files?.[0] || null);
											},
										})}
									/>
									<div className="group/cover relative ">
										{previewCoverImage ? (
											<img
												src={previewCoverImage}
												className="w-80 h-40 rounded-lg object-cover mt-2"
											/>
										) : (
											<img className="w-80 h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover mt-2" />
										)}
										<div className="absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={24}
												height={24}
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
												className="lucide lucide-pencil w-5 h-5 text-white"
												aria-hidden="true"
											>
												<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
												<path d="m15 5 4 4" />
											</svg>
										</div>
									</div>
								</label>
							</div>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Please enter your full name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Please enter a username" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bio</FormLabel>
										<FormControl>
											<Textarea
												rows={5}
												placeholder="Please enter a short bio"
												className="!h-auto resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Bio
								</label>
								<textarea
									rows={3}
									className='w-full p-3 border border-gray-200 rounded-lg'
									placeholder='Please enter a short bio'
									defaultValue={"Hey there! I am using PingUp."}
									{...register("bio")}
								/>
							</div> */}
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input
												placeholder="Please enter your location"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="gap-3 pt-6">
							<DialogClose asChild>
								<Button
									type="button"
									variant="outline"
									className="text-base h-auto font-normal px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
									onClick={() => setOpen(false)}
									disabled={form.formState.isSubmitting}
								>
									Cancel
								</Button>
							</DialogClose>
							<Button
								type="submit"
								className="text-base h-auto font-normal px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer"
								disabled={form.formState.isSubmitting}
							>
								Save changes
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
