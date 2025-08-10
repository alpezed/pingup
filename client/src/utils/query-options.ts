import { posts } from "@/services/post";
import { queryOptions } from "@tanstack/react-query";

export const postsQueryOptions = () =>
	queryOptions({
		queryKey: ["posts"],
		queryFn: () => posts(),
	});
