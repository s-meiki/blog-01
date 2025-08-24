import type {DocumentActionComponent, DocumentActionProps} from 'sanity'
import {resolveProductionUrl} from './resolve-production-url'

export const viewOnSiteAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const {schemaType, draft, published} = props
  if (schemaType !== 'post') return null
  const doc = published || draft || props.document?.displayed
  const url = resolveProductionUrl(doc as any)
  if (!url) return null
  return {
    label: 'View on site',
    title: 'Open the published page in a new tab',
    onHandle: () => {
      if (typeof window !== 'undefined') window.open(url, '_blank')
    },
  }
}

