import { useContent } from '../editor/ContentContext'
import Editable from '../editor/Editable'
import MediaFrame from '../editor/MediaFrame'

export default function Hero() {
  const { content, resolveMedia, update } = useContent()
  const h = content.hero

  return (
    <section id="hero" className="hero">
      {h.image ? (
        <MediaFrame
          kind="image"
          src={resolveMedia(h.image)}
          path="hero.image"
          mediaClass="hero-video"
          onRemove={() => update('hero.image', null)}
          emptyText="上传首页图"
        />
      ) : (
        <MediaFrame
          kind="video"
          src={resolveMedia(h.video)}
          path="hero.video"
          mediaClass="hero-video"
          autoPlay
          imagePath="hero.image"
          imageLabel="换首页图"
        />
      )}
      <div className="hero-inner">
        <div className="hero-kicker">
          <Editable path="hero.kicker" value={h.kicker} />
        </div>
        <h1 className="hero-title">
          <Editable as="span" path="hero.title" value={h.title} multiline />
        </h1>
        <p className="hero-sub">
          <Editable path="hero.sub" value={h.sub} />
        </p>
        <div className="hero-actions">
          <a className="btn btn-light" href="#works">
            <Editable path="hero.ctaPrimary" value={h.ctaPrimary} />
          </a>
          <a className="btn btn-ghost" href="#contact">
            <Editable path="hero.ctaGhost" value={h.ctaGhost} />
          </a>
        </div>
      </div>
      <div className="hero-foot">
        <div className="scroll-cue">
          <span className="bar" />
          <Editable path="hero.scrollHint" value={h.scrollHint} />
        </div>
        <div>
          <Editable path="hero.footNote" value={h.footNote} />
        </div>
      </div>
    </section>
  )
}
