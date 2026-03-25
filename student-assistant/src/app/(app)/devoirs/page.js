'use client'
import { useState } from 'react'
import { mockDevoirs } from '@/lib/mockData'
import styles from './devoirs.module.css'

export default function DevoirsPage() {
  const [devoirs, setDevoirs] = useState(mockDevoirs)
  const [filtre, setFiltre] = useState('tous')

  const toggle = (i) => {
    setDevoirs(prev => prev.map((d, idx) => idx === i ? { ...d, fait: !d.fait } : d))
  }

  const filtered = devoirs.filter(d => {
    if (filtre === 'afaire') return !d.fait
    if (filtre === 'faits')  return d.fait
    return true
  })

  const nbFaits = devoirs.filter(d => d.fait).length
  const pct = Math.round((nbFaits / devoirs.length) * 100)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Devoirs</h1>
          <p className={styles.sub}>{nbFaits}/{devoirs.length} terminés</p>
        </div>
        <div className={styles.progress}>
          <div className={styles.progressLabel}>{pct}%</div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>

      <div className={styles.filtres}>
        {['tous','afaire','faits'].map(f => (
          <button
            key={f}
            className={`${styles.filtreBtn} ${filtre === f ? styles.filtreBtnActive : ''}`}
            onClick={() => setFiltre(f)}
          >
            {f === 'tous' ? 'Tous' : f === 'afaire' ? 'À faire' : 'Terminés'}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filtered.map((d, i) => {
          const realIdx = devoirs.indexOf(d)
          return (
            <div key={i} className={`${styles.item} ${d.fait ? styles.itemFait : ''}`} onClick={() => toggle(realIdx)}>
              <div className={`${styles.check} ${d.fait ? styles.checked : ''}`}>
                {d.fait && <span>✓</span>}
              </div>
              <div className={styles.info}>
                <div className={styles.itemTitre}>{d.titre}</div>
                <div className={styles.itemMeta}>
                  <span className={styles.itemMatiere}>{d.matiere}</span>
                  <span className={styles.dot}>·</span>
                  <span>{new Date(d.date).toLocaleDateString('fr-FR', { weekday:'short', day:'numeric', month:'short' })}</span>
                </div>
              </div>
              <div className={`${styles.prio} ${styles['prio_'+d.priorite]}`}>
                {d.priorite}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}