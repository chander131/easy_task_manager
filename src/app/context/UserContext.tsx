'use client';

import { getCurrentUser } from '@/lib/auth';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	SetStateAction,
	Dispatch,
} from 'react';

type User = {
	id: string;
	username: string;
	email: string;
};

const UserContext = createContext<{
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>> | null;
}>({ user: null, setUser: null });

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		getCurrentUser()
			.then(data => {
				setUser(data);
			})
			.catch(() => setUser(null));
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
