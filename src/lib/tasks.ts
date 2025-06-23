import 'server-only';

import { cookies } from 'next/headers';

export async function getTask() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');

	if (!token) {
		throw new Error('No hay token');
	}

	const res = await fetch(`${process.env.TASK_MANAGER_API}/api/tasks/`, {
		headers: {
			Cookie: `token=${token.value}`,
		},
		credentials: 'include',
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error('No autorizado');
	}

	return await res.json();
}

export async function getSummaryTask() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');

	if (!token) {
		throw new Error('No hay token');
	}

	const res = await fetch(
		`${process.env.TASK_MANAGER_API}/api/tasks/summary/`,
		{
			headers: {
				Cookie: `token=${token.value}`,
			},
			credentials: 'include',
			cache: 'no-store',
		},
	);

	return await res.json();
}
