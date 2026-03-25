import { mockNotes, mockMoyennes } from '@/lib/mockData'
import styles from './notes.module.css'

function calcMoyenneGen(moyennes) {
  const totalCoef = moyennes.reduce((s, m) => s + m.coef, 0)
  const total = moyennes.reduce((s, m) => s + m.moy * m.coef, 0)
  return (total / totalCoef).toFixed(2)
}

function noteColor(note, max = 20) {
  const pct = note / max
  if (pct >= 0.8) return 'var(--accent3)'
  if (pct >= 0.6) return 'var(--accent)'
  if (pct >= 0.4) return 'var(--accent4)'
  return 'var(--accent2)'
}

export default function NotesPage() {
  const moyGen = calcMoyenneGen(mockMoyennes)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Notes</h1>
          <p className={styles.sub}>Toutes tes évaluations</p>
        </div>
        <div className={styles.moyBadge}>
          <span className={styles.moyLabel}>Moyenne générale</span>
          <span className={styles.moyVal}>{moyGen}<span className={styles.moyMax}>/20</span></span>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Moyennes par matière</h2>
        <div className={styles.matieresGrid}>
          {mockMoyennes.map((m, i) => (
            <div key={i} className={styles.matiereCard}>
              <div className={styles.matiereNom}>{m.matiere}</div>
              <div className={styles.matiereMoy} style={{ color: noteColor(m.moy) }}>
                {m.moy}
              </div>
              <div className={styles.matiereCoef}>coef. {m.coef}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Dernières évaluations</h2>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Matière</span>
            <span>Professeur</span>
            <span>Date</span>
            <span>Moy. classe</span>
            <span>Note</span>
          </div>
          {mockNotes.map((n, i) => (
            <div key={i} className={styles.tableRow}>
              <span className={styles.matCell}>{n.matiere}</span>
              <span className={styles.profCell}>{n.prof}</span>
              <span className={styles.dateCell}>{new Date(n.date).toLocaleDateString('fr-FR', {day:'numeric', month:'short'})}</span>
              <span className={styles.moyCell}>{n.moy_classe}</span>
              <span className={styles.noteCell}>
                <span className={styles.noteBadge} style={{ color: noteColor(n.note, n.max) }}>
                  {n.note}/{n.max}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}