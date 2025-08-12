import { timeAgo } from "@/utils/dayjs";
import type { Post } from "@/schema/post.schema";
import { UserAvatar } from "@/components/avatar";
import { EditPostAction } from "@/components/edit-post-action";
import { authClient } from "@/lib/auth-client";

export default function Post({ post }: { post: Post }) {
	const { data: session } = authClient.useSession();

	return (
		<div className="bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl">
			<div className="flex justify-between">
				<div className="inline-flex items-center gap-3 cursor-pointer">
					<UserAvatar user={post.author} />
					<div>
						<div className="flex items-center space-x-1">
							<span className="font-semibold">{post.author?.name}</span>
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
								className="lucide lucide-badge-check w-4 h-4 text-blue-500"
								aria-hidden="true"
							>
								<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
								<path d="m9 12 2 2 4-4" />
							</svg>
						</div>
						<div className="text-gray-500 text-sm">
							@{post.author.username} • {timeAgo(post.updatedAt)}
						</div>
					</div>
				</div>
				{session?.user.id === post.author._id && <EditPostAction post={post} />}
			</div>
			<div className="text-gray-800 text-sm whitespace-pre-line">
				{post.body}
			</div>
			<div className="grid grid-cols-2 gap-2">
				{post.image_urls && post.image_urls.length > 0 && (
					<>
						{post.image_urls.map(image => (
							<img
								key={image}
								alt="images"
								className="w-full object-cover rounded-lg col-span-2 h-auto"
								src={image}
							/>
						))}
					</>
				)}
			</div>
			<div className="flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300">
				<div className="flex items-center gap-1">
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
						className="lucide lucide-heart w-4 h-4 cursor-pointer false"
						aria-hidden="true"
					>
						<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
					</svg>
					<span>{post.likes.length || 0}</span>
				</div>
				<div className="flex items-center gap-1">
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
						className="lucide lucide-message-circle w-4 h-4"
						aria-hidden="true"
					>
						<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
					</svg>
					<span>12</span>
				</div>
				<div className="flex items-center gap-1">
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
						className="lucide lucide-share2 lucide-share-2 w-4 h-4"
						aria-hidden="true"
					>
						<circle cx={18} cy={5} r={3} />
						<circle cx={6} cy={12} r={3} />
						<circle cx={18} cy={19} r={3} />
						<line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
						<line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
					</svg>
					<span>7</span>
				</div>
			</div>
		</div>
	);
}
