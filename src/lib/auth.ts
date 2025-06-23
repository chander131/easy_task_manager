// lib/auth.ts

export const login = async (username: string, password: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_TASK_MANAGER_API}/api/auth/login/`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
			credentials: 'include',
		},
	);

	if (!res.ok) {
		throw new Error('Login fallido');
	}

	const data = await res.json();

	return data;
};

export const logout = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_TASK_MANAGER_API}/api/auth/logout/`,
		{
			method: 'POST',
			credentials: 'include',
		},
	);

	if (!res.ok) {
		throw new Error('Logout fallido');
	}

	return res.json();
};

export async function getCurrentUser() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_TASK_MANAGER_API}/api/auth/me/`,
		{
			credentials: 'include',
		},
	);

	if (!res.ok) throw new Error('Recuperación de datos fallida');

	return await res.json();
}
