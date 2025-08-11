import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { UserAvatar } from "@/components/avatar";
import { userQueries } from "@/services/queries";
import { timeAgo } from "@/utils/dayjs";
import { UserPosts } from "@/routes/_home/-components/user-posts";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { EditProfile } from "./-components/edit-profile";

export const Route = createFileRoute("/_home/profile")({
	component: Profile,
	loader: ({ context }) => {
		return context.queryClient.ensureQueryData(
			userQueries.posts(context.auth.user.id)
		);
	},
});

const tabs = [
	{ id: "posts", label: "Posts" },
	{ id: "media", label: "Media" },
	{ id: "likes", label: "Likes" },
];

function Profile() {
	const { auth } = Route.useRouteContext();
	const { data: posts } = useQuery(userQueries.posts(auth.user.id));
	const [activeTab, setActiveTab] = useState("posts");

	return (
		<div className="relative h-full overflow-y-scroll bg-gray-50 p-6">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white rounded-2xl shadow overflow-hidden">
					{auth.user.cover_photo ? (
						<div className="h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
							<img
								src={auth.user.cover_photo}
								alt={auth.user.name}
								className="w-full object-cover object-center h-full"
							/>
						</div>
					) : (
						<div className="h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200" />
					)}
					<div className="relative py-4 px-6 md:px-8 bg-white">
						<div className="flex flex-col md:flex-row items-start gap-6">
							<div className="w-32 h-32 border-4 border-white shadow-lg absolute -top-16 rounded-full">
								<UserAvatar
									user={{
										_id: auth.user.id,
										name: auth.user.name,
										email: auth.user.email,
										username: auth.user.username,
										image: auth.user.image,
									}}
									className="h-full w-full text-5xl"
								/>
							</div>
							<div className="w-full pt-16 md:pt-0 md:pl-36">
								<div className="flex flex-col md:flex-row items-start justify-between">
									<div>
										<div className="flex items-center gap-3">
											<h1 className="text-2xl font-bold text-gray-900">
												{auth.user.name}
											</h1>
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
												className="lucide lucide-badge-check w-6 h-6 text-blue-500"
												aria-hidden="true"
											>
												<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
												<path d="m9 12 2 2 4-4" />
											</svg>
										</div>
										<p className="text-gray-600">@{auth.user.username}</p>
									</div>
									<EditProfile />
								</div>
								{auth.user.bio && (
									<p className="text-gray-700 text-sm max-w-md mt-4">
										{auth.user.bio}
									</p>
								)}
								<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-4">
									<span className="flex items-center gap-1.5">
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
											className="lucide lucide-map-pin w-4 h-4"
											aria-hidden="true"
										>
											<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
											<circle cx={12} cy={10} r={3} />
										</svg>
										{auth.user.location ? auth.user.location : "Add location"}
									</span>
									<span className="flex items-center gap-1.5">
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
											className="lucide lucide-calendar w-4 h-4"
											aria-hidden="true"
										>
											<path d="M8 2v4" />
											<path d="M16 2v4" />
											<rect width={18} height={18} x={3} y={4} rx={2} />
											<path d="M3 10h18" />
										</svg>
										Joined{" "}
										<span className="font-medium">
											{timeAgo(auth.user.createdAt)}
										</span>
									</span>
								</div>
								<div className="flex items-center gap-6 mt-6 border-t border-gray-200 pt-4">
									<div>
										<span className="sm:text-xl font-bold text-gray-900">
											{posts?.data.length || 0}
										</span>
										<span className="text-xs sm:text-sm text-gray-500 ml-1.5">
											Posts
										</span>
									</div>
									<div>
										<span className="sm:text-xl font-bold text-gray-900">
											{auth.user?.followers?.length || 0}
										</span>
										<span className="text-xs sm:text-sm text-gray-500 ml-1.5">
											Followers
										</span>
									</div>
									<div>
										<span className="sm:text-xl font-bold text-gray-900">
											{auth.user?.following?.length || 0}
										</span>
										<span className="text-xs sm:text-sm text-gray-500 ml-1.5">
											Following
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6">
					<div className="bg-white rounded-xl shadow p-1 flex max-w-md mx-auto">
						{tabs.map(tab => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={cn(
									"flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
									activeTab === tab.id
										? "bg-indigo-600 text-white"
										: "text-gray-600 hover:text-gray-900"
								)}
							>
								{tab.label}
							</button>
						))}
					</div>
					<div className="mt-6 flex flex-col items-center gap-6">
						{activeTab === "posts" && <UserPosts posts={posts?.data} />}
						{activeTab === "media" && (
							<div className="text-gray-900/50">No media found!</div>
						)}
						{activeTab === "likes" && (
							<div className="text-gray-900/50">No likes!</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
