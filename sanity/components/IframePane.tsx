import React, {useMemo, useState, useEffect, useCallback} from 'react'

type Doc = any
type Options = {
  url?: (doc: Doc) => string
  reload?: { button?: boolean }
}

type Props = {
  document: { displayed?: Doc }
  options?: Options
}

export default function IframePane(props: Props) {
  const {document, options} = props
  const doc = document?.displayed
  const computeUrl = useCallback(() => (options?.url ? options.url(doc) : ''), [options, doc])

  const [src, setSrc] = useState<string>(computeUrl())
  useEffect(() => setSrc(computeUrl()), [computeUrl])

  const canReload = Boolean(options?.reload?.button)

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{padding: '8px', borderBottom: '1px solid #eee', display: 'flex', gap: 8}}>
        {canReload && (
          <button type="button" onClick={() => setSrc(computeUrl())}>
            Reload preview
          </button>
        )}
        {src ? (
          <button type="button" onClick={() => window.open(src, '_blank') }>
            Open in new tab
          </button>
        ) : null}
      </div>
      <div style={{flex: 1}}>
        {src ? (
          <iframe title="Preview" src={src} style={{border: 0, width: '100%', height: '100%'}} />
        ) : (
          <div style={{padding: 16}}>Preview URL is not available.</div>
        )}
      </div>
    </div>
  )
}
