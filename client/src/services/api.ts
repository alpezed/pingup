export async function login(email: string, password: string) {
	const result = await fetch("http://localhost:3001/api/v1/users/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
		credentials: "include", // This ensures cookies are sent and received
	});
	const data = await result.json();

	if (data?.error) throw new Error(data.message);

	return data;
}

export async function getMe() {
	const result = await fetch("http://localhost:3001/api/v1/users/me", {
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // This automatically includes cookies
	});
	// if (!result.ok) throw new Error("Not authenticated");
	return result.json();
}

export async function logout() {
	const result = await fetch("http://localhost:3001/api/v1/users/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include", // Include cookies for logout
	});
	if (!result.ok) throw new Error("Logout failed");
	return result.json();
}

export async function posts() {
	const result = await fetch("http://localhost:3001/api/v1/posts", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	return result.json();
}
