import { posts } from "@/services/api";
import { queryOptions } from "@tanstack/react-query";

export const postsQueryOptions = () =>
	queryOptions({
		queryKey: ["posts"],
		queryFn: () => posts(),
	});
