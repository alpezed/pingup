import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";

export function EditProfile() {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors mt-4 md:mt-0">
						<Edit size={16} />
						Edit
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-2xl bg-white rounded-lg shadow p-6">
					<DialogHeader>
						<DialogTitle className="text-2xl font-semibold text-gray-900 mb-2">
							Edit profile
						</DialogTitle>
					</DialogHeader>
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
								/>
								<div className="group/profile relative">
									<img
										className="w-24 h-24 rounded-full object-cover mt-2"
										src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yeXppZEF6anBLU1FiakFMZjNkUTV3VTlYcE8iLCJyaWQiOiJ1c2VyXzMxNlJ0RWw5dVB5ZUhrVmFJeGtpZzFmQmVTQiJ9"
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
								/>
								<div className="group/cover relative ">
									<img className="w-80 h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover mt-2" />
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
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Name
							</label>
							<input
								className="w-full p-3 border border-gray-200 rounded-lg"
								placeholder="Please enter your full name"
								type="text"
								defaultValue="null null"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Username
							</label>
							<input
								className="w-full p-3 border border-gray-200 rounded-lg"
								placeholder="Please enter a username"
								type="text"
								defaultValue="demopingup"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Bio
							</label>
							<textarea
								rows={3}
								className="w-full p-3 border border-gray-200 rounded-lg"
								placeholder="Please enter a short bio"
								defaultValue={"Hey there! I am using PingUp."}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Location
							</label>
							<input
								className="w-full p-3 border border-gray-200 rounded-lg"
								placeholder="Please enter your location"
								type="text"
							/>
						</div>
					</div>
					<DialogFooter className="gap-3 pt-6">
						<DialogClose asChild>
							<Button
								variant="outline"
								className="text-base h-auto font-normal px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							type="submit"
							className="text-base h-auto font-normal px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer"
						>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
