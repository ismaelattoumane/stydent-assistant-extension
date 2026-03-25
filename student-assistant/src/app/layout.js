import './globals.css'

export const metadata = {
  title: 'Student Assistant',
  description: 'Ton assistant scolaire intelligent',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}