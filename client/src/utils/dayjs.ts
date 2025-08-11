import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const timeAgo = (date: string | Date) => {
	return dayjs(date).fromNow();
};
