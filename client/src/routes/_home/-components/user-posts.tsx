import type { Post as PostType } from "@/schema/post.schema";
import Post from "@/components/post";

export function UserPosts({ posts }: { posts?: PostType[] }) {
	if (!posts || posts.length === 0) {
		return <div className="text-gray-900/50">No post found!</div>;
	}

	return (
		<>
			{posts?.map(post => (
				<Post key={post._id} post={post} />
			))}
		</>
	);
}
