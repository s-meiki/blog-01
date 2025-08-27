import type {DocumentActionComponent, DocumentActionProps} from 'sanity'
import {resolvePreviewUrl} from './resolve-production-url'

export const viewDraftPreviewAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const {schemaType, draft, published} = props
  if (schemaType !== 'post') return null
  const doc = draft || published || props.document?.displayed
  const url = resolvePreviewUrl(doc as any)
  if (!url) return null
  return {
    label: 'Open draft preview',
    title: 'Open draft preview in a new tab',
    onHandle: () => {
      if (typeof window !== 'undefined') window.open(url, '_blank')
    },
  }
}

