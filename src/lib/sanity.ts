import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ Queries
export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt desc) {
  _id, title, description, tools, image, github, liveUrl, category, featured, order
}`

export const CERTIFICATES_QUERY = `*[_type == "certificate"] | order(date desc) {
  _id, title, issuer, image, file, date, credentialUrl, category
}`

export const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc, _createdAt desc) {
  _id, company, role, duration, description, skills, logo, current, order
}`

export const ACHIEVEMENTS_QUERY = `*[_type == "achievement"] | order(date desc) {
  _id, title, description, date, icon, metric
}`

export const RESUME_QUERY = `*[_type == "resume"][0] {
  _id, "pdfUrl": file.asset->url
}`

export const VIDEO_RESUME_QUERY = `*[_type == "videoResume"][0] {
  _id, videoUrl, "videoFileUrl": videoFile.asset->url
}`

export const SKILLS_QUERY = `*[_type == "skill"] | order(order asc) {
  _id, name, level, category, order
}`
