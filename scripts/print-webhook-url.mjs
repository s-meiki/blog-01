#!/usr/bin/env node
import { readFileSync } from 'fs'
import { join } from 'path'

function readEnv(key) {
  if (process.env[key]) return process.env[key]
  try {
    const envPath = join(process.cwd(), '.env.local')
    const content = readFileSync(envPath, 'utf8')
    const line = content
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l.startsWith(key + '='))
    if (!line) return ''
    return line.replace(key + '=', '').replace(/^"|"$/g, '').trim()
  } catch (e) {
    return ''
  }
}

const baseArg = process.argv[2] || ''
const secret = readEnv('SANITY_WEBHOOK_SECRET')
const studioUrl = readEnv('SANITY_STUDIO_URL')

if (!secret) {
  console.error('SANITY_WEBHOOK_SECRET is not set. Define it in .env.local or export it.')
  process.exit(1)
}

const localBase = 'http://localhost:3000'
const prodBase = baseArg || process.env.SITE_URL || ''

function build(base) {
  const u = (base || '').replace(/\/$/, '')
  if (!u) return ''
  return `${u}/api/revalidate?secret=${secret}`
}

const out = {
  hint: 'Use these URLs in Sanity Manage > Webhooks',
  local: build(localBase),
  production: prodBase ? build(prodBase) : '(pass base URL: node scripts/print-webhook-url.mjs https://your.site)',
  headersAlternative: { 'X-Sanity-Signature': secret },
  filter: '(_type in ["post","category","tag","profile"]) && !(_id in path("drafts.**"))',
  studio: studioUrl || '(optional) Set SANITY_STUDIO_URL in .env.local',
}

console.log(JSON.stringify(out, null, 2))

