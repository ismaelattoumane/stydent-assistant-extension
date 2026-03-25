import Sidebar from '@/components/Sidebar'

export default function AppLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{
        marginLeft: '220px',
        flex: 1,
        minHeight: '100vh',
        padding: '40px',
        background: 'var(--bg)',
      }}>
        {children}
      </main>
    </div>
  )
}