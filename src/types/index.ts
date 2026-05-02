export interface Project {
  _id: string
  title: string
  description: string
  tools: string[]
  image: any
  github?: string
  liveUrl?: string
  category?: string
  featured?: boolean
  order?: number
}

export interface Certificate {
  _id: string
  title: string
  issuer: string
  image?: any
  file?: {
    asset: { url: string }
  }
  date: string
  credentialUrl?: string
  category?: string
}

export interface Experience {
  _id: string
  company: string
  role: string
  duration: string
  description: string[]
  skills: string[]
  logo?: any
  current?: boolean
  order?: number
}

export interface Achievement {
  _id: string
  title: string
  description: string
  date: string
  icon?: string
  metric?: string
}

export interface Resume {
  _id: string
  pdfUrl?: string
}

export interface VideoResume {
  _id: string
  videoUrl?: string
  videoFileUrl?: string
}

export interface Skill {
  _id: string
  name: string
  level: number
  category: 'languages' | 'visualization' | 'ml' | 'tools'
  order?: number
}
