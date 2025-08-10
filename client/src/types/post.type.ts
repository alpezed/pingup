export interface Post {
	_id: string;
	body: string;
	image_urls: string[];
	likes: string[];
	comments: any[];
	author: Author;
	createdAt: string;
	updatedAt: string;
}

export interface Author {
	_id: string;
	name: string;
	email: string;
	image: string;
	username: string;
}
