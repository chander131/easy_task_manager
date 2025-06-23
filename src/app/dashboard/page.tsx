export const dynamic = 'force-dynamic';

import { getTask } from '@/lib/tasks';
import Panel from '@/components/Panel';
import { ITask } from '../ui/task';
import { redirect } from 'next/navigation';

export default async function Page() {
	let tasks: ITask[] = [];

	try {
		tasks = await getTask();
	} catch (err) {
		console.error(err);
		redirect('/login');
	}

	return <Panel tasks={tasks} />;
}
