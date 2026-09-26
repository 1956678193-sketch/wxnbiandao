import { useContent } from '../editor/ContentContext'
import Editable from '../editor/Editable'

export default function Records() {
  const { content } = useContent()
  const r = content.records

  return (
    <section id="records" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="sec-label">
              <Editable path="records.label" value={r.label} />
            </div>
            <h2 className="sec-title">
              <Editable as="span" path="records.title" value={r.title} multiline />
            </h2>
          </div>
          <p className="sec-note">
            <Editable path="records.note" value={r.note} />
          </p>
        </div>

        <div className="records-high reveal">
          {r.highlights.map((h, i) => (
            <div key={i}>
              <div className="v">
                <Editable path={`records.highlights.${i}.value`} value={h.value} />
              </div>
              <div className="l">
                <Editable path={`records.highlights.${i}.label`} value={h.label} />
              </div>
            </div>
          ))}
        </div>

        <div className="tag-row reveal">
          {r.fields.map((f, i) => (
            <span key={i}>
              <Editable path={`records.fields.${i}`} value={f} />
            </span>
          ))}
        </div>

        <div className="funnel reveal">
          {r.funnel.map((f, i) => (
            <span key={i}>
              {i > 0 && <i>→</i>}
              <Editable path={`records.funnel.${i}`} value={f} />
            </span>
          ))}
        </div>

        <div className="record-list">
          {r.timeline.map((t, i) => (
            <div className="record reveal" key={i}>
              <div>
                <div className="period">
                  <Editable path={`records.timeline.${i}.period`} value={t.period} />
                </div>
                <div className="org">
                  <Editable path={`records.timeline.${i}.org`} value={t.org} />
                </div>
                <div className="role">
                  <Editable path={`records.timeline.${i}.role`} value={t.role} />
                </div>
              </div>
              <ul>
                {t.points.map((p, j) => (
                  <li key={j}>
                    <Editable path={`records.timeline.${i}.points.${j}`} value={p} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
