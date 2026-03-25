'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

const nav = [
  { href: '/dashboard', icon: '⬡', label: 'Dashboard' },
  { href: '/notes',     icon: '◈', label: 'Notes' },
  { href: '/devoirs',   icon: '◷', label: 'Devoirs' },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoMark}>SA</span>
        <span className={styles.logoText}>Student<br/>Assistant</span>
      </div>
      <nav className={styles.nav}>
        {nav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${path === item.href ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className={styles.user}>
        <div className={styles.avatar}>É</div>
        <div>
          <div className={styles.userName}>Élève</div>
          <div className={styles.userSub}>Pronote connecté</div>
        </div>
      </div>
    </aside>
  )
}