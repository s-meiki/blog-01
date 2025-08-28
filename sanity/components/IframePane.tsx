import React, {useState, useEffect, useCallback} from 'react'

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

  const copyToClipboard = useCallback(() => {
    if (!src) return
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(src).catch(() => {})
    } else {
      // Fallback
      const ta = document.createElement('textarea')
      ta.value = src
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch {}
      document.body.removeChild(ta)
    }
  }, [src])

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{padding: '8px', borderBottom: '1px solid #eee', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8}}>
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
        <div style={{fontSize: 12, color: '#555', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
          {src ? (
            <>
              <a href={src} target="_blank" rel="noreferrer" style={{textDecoration: 'underline'}}>{src}</a>
              <button type="button" onClick={copyToClipboard} style={{marginLeft: 8}}>Copy URL</button>
            </>
          ) : (
            <span>
              Preview URL unavailable. Ensure slug is set and Studio env SANITY_STUDIO_SITE_URL is defined.
            </span>
          )}
        </div>
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
