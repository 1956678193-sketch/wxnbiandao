import { useEffect } from 'react'

export default function VideoModal({ item, src, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close" onClick={onClose}>
          关闭
        </button>
        <div className="lightbox-stage">
          {src ? (
            <video src={src} controls autoPlay playsInline />
          ) : (
            <div className="lightbox-empty">这条还没上传视频</div>
          )}
          <button type="button" className="lightbox-x" onClick={onClose} aria-label="关闭视频">
            ✕
          </button>
        </div>
        <div className="lightbox-meta">
          <span className="work-tag-static">{item.tag}</span>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      </div>
    </div>
  )
}
