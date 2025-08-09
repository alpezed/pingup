import { Link } from "@tanstack/react-router";

export default function CreatePost() {
	return (
		<Link
			className='flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg  bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer'
			to='/create-post'
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
				className='lucide lucide-circle-plus w-5 h-5'
				aria-hidden='true'
			>
				<circle cx={12} cy={12} r={10} />
				<path d='M8 12h8' />
				<path d='M12 8v8' />
			</svg>
			Create Post
		</Link>
	);
}
