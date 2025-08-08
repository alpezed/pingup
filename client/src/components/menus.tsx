import UserButton from "@/components/user-button";
import { Link } from "@tanstack/react-router";

export default function Menus() {
	return (
		<div className="w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20  max-sm:-translate-x-full transition-all duration-300 ease-in-out">
			<div className=" w-full">
				<img className="w-26 ml-7 my-2 cursor-pointer" src="/assets/logo.svg" />
				<hr className="border-gray-300 mb-8" />
				<div className="px-6 text-gray-600 space-y-1 font-medium">
					<Link
						className="px-3.5 py-2 flex items-center gap-3 rounded-xl bg-indigo-50 text-indigo-700"
						to="/"
					>
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
							className="lucide lucide-house w-5 h-5"
							aria-hidden="true"
						>
							<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
							<path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						</svg>
						Feed
					</Link>
					<Link
						className="px-3.5 py-2 flex items-center gap-3 rounded-xl hover:bg-gray-50"
						to="/messages"
					>
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
							className="lucide lucide-message-circle w-5 h-5"
							aria-hidden="true"
						>
							<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
						</svg>
						Messages
					</Link>
					<Link
						className="px-3.5 py-2 flex items-center gap-3 rounded-xl hover:bg-gray-50"
						to="/connections"
					>
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
							className="lucide lucide-users w-5 h-5"
							aria-hidden="true"
						>
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
							<path d="M16 3.128a4 4 0 0 1 0 7.744" />
							<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
							<circle cx={9} cy={7} r={4} />
						</svg>
						Connections
					</Link>
					<Link
						className="px-3.5 py-2 flex items-center gap-3 rounded-xl hover:bg-gray-50"
						to="/discover"
					>
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
							className="lucide lucide-search w-5 h-5"
							aria-hidden="true"
						>
							<path d="m21 21-4.34-4.34" />
							<circle cx={11} cy={11} r={8} />
						</svg>
						Discover
					</Link>
					<Link
						className="px-3.5 py-2 flex items-center gap-3 rounded-xl hover:bg-gray-50"
						to="/profile"
					>
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
							className="lucide lucide-user w-5 h-5"
							aria-hidden="true"
						>
							<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
							<circle cx={12} cy={7} r={4} />
						</svg>
						Profile
					</Link>
				</div>
				<Link
					className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg  bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer"
					to="/create-post"
				>
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
						className="lucide lucide-circle-plus w-5 h-5"
						aria-hidden="true"
					>
						<circle cx={12} cy={12} r={10} />
						<path d="M8 12h8" />
						<path d="M12 8v8" />
					</svg>
					Create Post
				</Link>
			</div>
			<div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
				<UserButton />
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
					className="lucide lucide-log-out w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
					aria-hidden="true"
				>
					<path d="m16 17 5-5-5-5" />
					<path d="M21 12H9" />
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
				</svg>
			</div>
		</div>
	);
}
