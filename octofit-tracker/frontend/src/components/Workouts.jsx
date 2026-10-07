import { useApiCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Workout', render: (workout) => workout.name },
  { label: 'Description', render: (workout) => workout.description },
  { label: 'Level', render: (workout) => <span className={`level level-${workout.difficulty}`}>{workout.difficulty}</span> },
  { label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
  { label: 'Exercises', render: (workout) => workout.exercises?.join(', ') },
]

export default function Workouts() {
  const { data, error, loading } = useApiCollection('/api/workouts/', fetch)
  return <ResourceTable title="Workout library" eyebrow="Build your next session" columns={columns} rows={data} loading={loading} error={error} />
}