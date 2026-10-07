import { useApiCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Rank', render: (entry) => <span className="rank-badge">#{entry.rank}</span> },
  { label: 'Athlete', render: (entry) => entry.user?.name ?? 'Unknown' },
  { label: 'Username', render: (entry) => entry.user?.username ?? 'Unknown' },
  { label: 'Points', render: (entry) => entry.totalPoints.toLocaleString() },
]

export default function Leaderboard() {
  const { data, error, loading } = useApiCollection('/api/leaderboard/', fetch)
  return <ResourceTable title="Leaderboard" eyebrow="Current standings" columns={columns} rows={data} loading={loading} error={error} />
}