import { useState } from 'react'
import { useContent } from '../editor/ContentContext'
import Editable from '../editor/Editable'
import MediaFrame from '../editor/MediaFrame'
import VideoModal from './VideoModal'

function WorkCard({ item, index, onOpen, onMeta }) {
  const { resolveMedia, removeWork, editing } = useContent()
  const ratio = item.ratio || 1.778
  const wide = ratio >= 1.2

  return (
    <article className={`work reveal${wide ? ' wide' : ''}`}>
      <div
        className={`work-media${editing ? '' : ' clickable'}`}
        style={{ aspectRatio: String(ratio) }}
        onClick={() => {
          if (!editing) onOpen(index)
        }}
      >
        <span className="work-tag">
          <Editable path={`works.items.${index}.tag`} value={item.tag} />
        </span>
        <MediaFrame
          kind="video"
          src={resolveMedia(item.video)}
          path={`works.items.${index}.video`}
          poster={resolveMedia(item.poster)}
          posterPath={`works.items.${index}.poster`}
          imagePath={`works.items.${index}.poster`}
          imageLabel="换封面图"
          mediaClass="work-video"
          seek
          onMeta={onMeta}
        />
        {!editing && (
          <span className="work-play">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
              <path d="M15 9L0 17.66V0.34L15 9Z" fill="#14130F" />
            </svg>
          </span>
        )}
        {!editing && <span className="work-hint">点击播放（有声）</span>}
      </div>
      <div className="work-meta">
        <h3 className="work-title">
          <Editable path={`works.items.${index}.title`} value={item.title} />
        </h3>
        {editing ? (
          <button
            type="button"
            className="mini-del"
            onClick={() => {
              if (window.confirm('删掉这个作品模块？')) removeWork(item.id)
            }}
          >
            删除模块
          </button>
        ) : (
          <span className="work-no">{String(index + 1).padStart(2, '0')}</span>
        )}
      </div>
      <p className="work-desc">
        <Editable path={`works.items.${index}.desc`} value={item.desc} />
      </p>
    </article>
  )
}

export default function Works() {
  const { content, resolveMedia, update } = useContent()
  const [openIndex, setOpenIndex] = useState(null)

  const current = openIndex === null ? null : content.works.items[openIndex]

  // 视频真实尺寸加载出来后写回内容，卡片按真实比例摆放，不裁画面
  const handleMeta = (index, w, h) => {
    if (!w || !h) return
    const r = Math.round((w / h) * 1000) / 1000
    const old = content.works.items[index].ratio || 0
    if (Math.abs(old - r) > 0.01) update(`works.items.${index}.ratio`, r)
  }

  return (
    <section id="works" className="sec" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="sec-label">
              <Editable path="works.label" value={content.works.label} />
            </div>
            <h2 className="sec-title">
              <Editable as="span" path="works.title" value={content.works.title} multiline />
            </h2>
          </div>
          <p className="sec-note">
            <Editable path="works.note" value={content.works.note} />
          </p>
        </div>

        <div className="works-grid">
          {content.works.items.map((item, i) => (
            <WorkCard
              key={item.id}
              item={item}
              index={i}
              onOpen={setOpenIndex}
              onMeta={(w, h) => handleMeta(i, w, h)}
            />
          ))}
        </div>
      </div>

      {current && (
        <VideoModal
          item={current}
          src={resolveMedia(current.video)}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  )
}
