import { useApiCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Team', render: (team) => team.name },
  { label: 'Focus', render: (team) => team.description },
  { label: 'Members', render: (team) => team.members?.length ?? 0 },
]

export default function Teams() {
  const { data, error, loading } = useApiCollection('/api/teams/', fetch)
  return <ResourceTable title="Teams" eyebrow="Train together" columns={columns} rows={data} loading={loading} error={error} />
}