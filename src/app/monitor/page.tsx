export const dynamic = 'force-dynamic';

import { getSummaryTask } from '@/lib/tasks';
import ChartTask from '@/components/ChartTask';

export default async function Page() {
	let summary: Record<string, number> = {};

	try {
		summary = await getSummaryTask();
	} catch (err) {
		console.error(err);
		return <div>No autorizado. Redirigiendo...</div>;
	}

	return <ChartTask summary={summary} />;
}
