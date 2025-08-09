export async function login(email: string, password: string) {
	const result = await fetch("http://localhost:3001/api/v1/users/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});
	const data = await result.json();

	if (data?.error) throw new Error(data.message);

	return data;
}

export async function getMe() {
	const result = await fetch("http://localhost:3001/api/v1/users/me");
	if (!result.ok) throw new Error("Not authenticated");
	return result.json();
}
