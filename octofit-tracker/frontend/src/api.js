import { useEffect, useState } from 'react'

const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME
const browserCodespaceName = globalThis.location?.hostname
  .match(/^(.+)-\d+\.app\.github\.dev$/)?.[1]
const codespaceName = configuredCodespaceName || browserCodespaceName

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export function useApiCollection(endpoint, request = fetch) {
  const [state, setState] = useState({ data: [], error: '', loading: true })

  useEffect(() => {
    const controller = new AbortController()

    request(`${apiBaseUrl}${endpoint}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
        return response.json()
      })
      .then((payload) => {
        setState({ data: normalizeCollection(payload), error: '', loading: false })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ data: [], error: error.message, loading: false })
        }
      })

    return () => controller.abort()
  }, [endpoint, request])

  return state
}