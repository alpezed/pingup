export default function Stories() {
	return (
		<div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl  no-scrollbar overflow-x-auto px-4">
			<div className="flex gap-4 pb-5">
				<div className="rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white">
					<div className="h-full flex flex-col items-center justify-center p-4">
						<div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
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
								className="lucide lucide-plus w-5 h-5 text-white"
								aria-hidden="true"
							>
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						</div>
						<p className="text-sm font-medium text-slate-700 text-center">
							Create Story
						</p>
					</div>
				</div>
				<div className="relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95">
					<img
						className="absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow"
						src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzMwY3paZ0s0RDVSQWVVYmVSNExOQzQ3MnRTdyJ9"
					/>
					<p className="absolute top-18 left-3 text-white/60 text-sm truncate max-w-24" />
					<p className="text-white absolute bottom-1 right-2 z-10 text-xs">
						8 days ago
					</p>
					<div className="absolute inset-0 z-1 rounded-lg bg-black overflow-hidden">
						<img
							className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
							src="https://ik.imagekit.io/devtechz/photo-1633332755192-727a05c4013d_XHDbkgf6l.jpg"
						/>
					</div>
				</div>
				<div className="relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95">
					<img
						className="absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow"
						src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzMwY3paZ0s0RDVSQWVVYmVSNExOQzQ3MnRTdyJ9"
					/>
					<p className="absolute top-18 left-3 text-white/60 text-sm truncate max-w-24" />
					<p className="text-white absolute bottom-1 right-2 z-10 text-xs">
						8 days ago
					</p>
					<div className="absolute inset-0 z-1 rounded-lg bg-black overflow-hidden">
						<img
							className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
							src="https://ik.imagekit.io/devtechz/pexels-photo-1619317_Aq0oNi6V3V.jpeg"
						/>
					</div>
				</div>
				<div className="relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95">
					<img
						className="absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow"
						src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzMwY3paZ0s0RDVSQWVVYmVSNExOQzQ3MnRTdyJ9"
					/>
					<p className="absolute top-18 left-3 text-white/60 text-sm truncate max-w-24">
						The latest coding project is here – built with the powerful MERN
						stack! 💪 This social media platform uses MongoDB, Express, React,
						and Node.js for a seamless and responsive user experience.
					</p>
					<p className="text-white absolute bottom-1 right-2 z-10 text-xs">
						8 days ago
					</p>
				</div>
				<div className="relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95">
					<img
						className="absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow"
						src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzMwY3paZ0s0RDVSQWVVYmVSNExOQzQ3MnRTdyJ9"
					/>
					<p className="absolute top-18 left-3 text-white/60 text-sm truncate max-w-24" />
					<p className="text-white absolute bottom-1 right-2 z-10 text-xs">
						8 days ago
					</p>
					<div className="absolute inset-0 z-1 rounded-lg bg-black overflow-hidden">
						<video
							className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"
							src="https://ik.imagekit.io/devtechz/14447442-hd_1080_1920_30fps_cdjbrnoDU.mp4"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
