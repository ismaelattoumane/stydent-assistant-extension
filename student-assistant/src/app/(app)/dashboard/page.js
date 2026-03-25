import { mockMoyennes, mockDevoirs } from '@/lib/mockData'
import styles from './dashboard.module.css'

function calcMoyenneGen(moyennes) {
  const totalCoef = moyennes.reduce((s, m) => s + m.coef, 0)
  const total = moyennes.reduce((s, m) => s + m.moy * m.coef, 0)
  return (total / totalCoef).toFixed(2)
}

export default function DashboardPage() {
  const moyGen = calcMoyenneGen(mockMoyennes)
  const devoirsAFaire = mockDevoirs.filter(d => !d.fait)
  const prochainsDevoirs = devoirsAFaire.slice(0, 3)

  const meilleureMatiere = [...mockMoyennes].sort((a,b) => b.moy - a.moy)[0]
  const matiereArevoir  = [...mockMoyennes].sort((a,b) => a.moy - b.moy)[0]

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Bonjour 👋</h1>
          <p className={styles.sub}>Voici ton résumé du jour</p>
        </div>
        <div className={styles.date}>{new Date().toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long' })}</div>
      </header>

      <div className={styles.stats}>
        <div className={`${styles.statCard} ${styles.accent}`}>
          <span className={styles.statLabel}>Moyenne générale</span>
          <span className={styles.statValue}>{moyGen}</span>
          <span className={styles.statSub}>sur 20</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Devoirs à faire</span>
          <span className={styles.statValue}>{devoirsAFaire.length}</span>
          <span className={styles.statSub}>cette semaine</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Meilleure matière</span>
          <span className={styles.statValue} style={{fontSize:'1.1rem'}}>{meilleureMatiere.matiere}</span>
          <span className={styles.statSub}>{meilleureMatiere.moy}/20</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>À retravailler</span>
          <span className={styles.statValue} style={{fontSize:'1.1rem'}}>{matiereArevoir.matiere}</span>
          <span className={styles.statSub}>{matiereArevoir.moy}/20</span>
        </div>
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Prochains devoirs</h2>
          <div className={styles.devoirList}>
            {prochainsDevoirs.map((d, i) => (
              <div key={i} className={styles.devoirItem}>
                <div className={`${styles.prio} ${styles['prio_'+d.priorite]}`}/>
                <div className={styles.devoirInfo}>
                  <span className={styles.devoirTitre}>{d.titre}</span>
                  <span className={styles.devoirMeta}>{d.matiere} · {new Date(d.date).toLocaleDateString('fr-FR', {day:'numeric', month:'short'})}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Moyennes par matière</h2>
          <div className={styles.barList}>
            {mockMoyennes.map((m, i) => (
              <div key={i} className={styles.barItem}>
                <span className={styles.barLabel}>{m.matiere.split('-')[0].substring(0,10)}</span>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{
                    width: `${(m.moy/20)*100}%`,
                    background: m.moy >= 15 ? 'var(--accent3)' : m.moy >= 12 ? 'var(--accent)' : 'var(--accent2)'
                  }}/>
                </div>
                <span className={styles.barVal}>{m.moy}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}