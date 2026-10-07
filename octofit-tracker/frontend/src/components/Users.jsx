import { useApiCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { label: 'Athlete', render: (user) => user.name },
  { label: 'Username', render: (user) => `@${user.username}` },
  { label: 'Email', render: (user) => user.email },
  { label: 'Age', render: (user) => user.age },
  { label: 'Team', render: (user) => user.team?.name ?? 'Independent' },
]

export default function Users() {
  const { data, error, loading } = useApiCollection('/api/users/', fetch)
  return <ResourceTable title="Athletes" eyebrow="Member directory" columns={columns} rows={data} loading={loading} error={error} />
}