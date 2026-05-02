import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kunal | Data Analyst Portfolio',
  description:
    'Senior Data Analyst specializing in Python, SQL, Power BI & Machine Learning. Transforming complex data into actionable insights.',
  keywords: ['Data Analyst', 'Python', 'SQL', 'Power BI', 'Machine Learning', 'Portfolio'],
  authors: [{ name: 'Kunal' }],
  openGraph: {
    title: 'Kunal | Data Analyst Portfolio',
    description:
      'Senior Data Analyst specializing in Python, SQL, Power BI & Machine Learning.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
