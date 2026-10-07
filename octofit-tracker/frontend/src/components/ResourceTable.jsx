export default function ResourceTable({ title, eyebrow, columns, rows, loading, error }) {
  return (
    <section className="resource-view" aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-title">{title}</h1>
        </div>
        <span className="record-count">{loading ? 'Loading' : `${rows.length} records`}</span>
      </div>

      {error ? <div className="alert alert-danger">Unable to load data: {error}</div> : null}

      <div className="table-wrap">
        <table className="resource-table">
          <thead>
            <tr>
              {columns.map((column) => <th key={column.label}>{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id ?? JSON.stringify(row)}>
                {columns.map((column) => <td key={column.label}>{column.render(row)}</td>)}
              </tr>
            ))}
            {!loading && !error && rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty-state">No records found.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  )
}