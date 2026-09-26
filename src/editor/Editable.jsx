import { useEffect, useRef } from 'react'
import { useContent } from './ContentContext'

// 可直接在页面上改的文字：编辑模式下变成 contentEditable，失焦即保存
export default function Editable({ as: Tag = 'span', path, value, className = '', multiline = false, style }) {
  const { editing, update } = useContent()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el && editing && el.innerText !== value) el.innerText = value ?? ''
  }, [editing, value])

  const cls = `${className} ${editing ? 'editable' : ''}`.trim()

  if (!editing) {
    return (
      <Tag className={className} style={{ whiteSpace: multiline ? 'pre-line' : undefined, ...style }}>
        {value}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={cls}
      style={{ whiteSpace: multiline ? 'pre-line' : undefined, ...style }}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e) => update(path, e.currentTarget.innerText)}
      onClick={(e) => {
        // 编辑时点导航/按钮里的文字不要真的跳走
        if (editing) e.preventDefault()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !multiline) {
          e.preventDefault()
          e.currentTarget.blur()
        }
        if (e.key === 'Escape') e.currentTarget.blur()
      }}
    />
  )
}
