export interface User {
	name: string;
	email: string;
	emailVerified: boolean;
	image: string;
	createdAt: string;
	updatedAt: string;
	role: string;
	username: string;
	cover_photo: string;
	bio: string;
	location: string;
	followers?: string[];
	following?: string[];
	id: string;
}
