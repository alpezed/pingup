export interface User {
	name: string;
	email: string;
	emailVerified: boolean;
	image?: string | null | undefined;
	createdAt: Date;
	updatedAt: Date;
	role: string;
	username: string;
	cover_photo: string;
	bio: string;
	location: string;
	followers?: string[];
	following?: string[];
	id: string;
}
