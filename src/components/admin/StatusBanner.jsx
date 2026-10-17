import { useEffect, useState } from 'react'
import { checkServerConnection } from '../../utils/invitationStorage'

export default function StatusBanner() {
  const [status, setStatus] = useState({ checking: true, connected: false, message: '' })

  const verify = async () => {
    setStatus((prev) => ({ ...prev, checking: true }))
    const res = await checkServerConnection()
    setStatus({
      checking: false,
      connected: res.connected,
      message: res.connected
        ? `Local Project Storage Connected (Writing files to public/invitations & src/data/invitations)`
        : 'Local persistence server not detected. Run "npm run dev" or "npm run server" to enable writing directly to project folders.',
      data: res.data,
    })
  }

  useEffect(() => {
    verify()
    const timer = setInterval(verify, 15000)
    return () => clearInterval(timer)
  }, [])

  if (status.checking && !status.message) return null

  return (
    <div
      className={`px-4 py-2.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-medium transition-colors ${
        status.connected
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-amber-50 border-amber-300 text-amber-900'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              status.connected ? 'bg-emerald-400' : 'bg-amber-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              status.connected ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          />
        </span>
        <span>{status.message}</span>
      </div>

      <button
        onClick={verify}
        className="ml-3 underline hover:opacity-80 transition-opacity text-xs whitespace-nowrap cursor-pointer"
        title="Check status again"
      >
        Refresh Status
      </button>
    </div>
  )
}
