import { useApiCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Athlete', render: (activity) => activity.user?.name ?? 'Unknown' },
  { label: 'Activity', render: (activity) => activity.type },
  { label: 'Duration', render: (activity) => `${activity.durationMinutes} min` },
  { label: 'Calories', render: (activity) => activity.caloriesBurned },
  { label: 'Date', render: (activity) => new Date(activity.date).toLocaleDateString() },
]

export default function Activities() {
  const { data, error, loading } = useApiCollection('/api/activities/', fetch)
  return <ResourceTable title="Recent activity" eyebrow="Movement log" columns={columns} rows={data} loading={loading} error={error} />
}