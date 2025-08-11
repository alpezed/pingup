import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Post } from "@/schema/post.schema";
import { useNavigate } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";

export function EditPostAction({ post }: { post: Post }) {
	const navigate = useNavigate();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type='button'
					className='items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer w-10 h-10 rounded-full hover:bg-gray-100 focus:bg-gray-200/60 active:bg-gray-200/60 grid place-items-center'
				>
					<MoreHorizontal />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='start'>
				<DropdownMenuItem
					onClick={() =>
						navigate({ to: "/post/$postId/edit", params: { postId: post._id } })
					}
				>
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
