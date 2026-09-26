import { useContent } from '../editor/ContentContext'
import Editable from '../editor/Editable'

export default function Strengths() {
  const { content, removeStrength, editing } = useContent()
  const s = content.strengths

  return (
    <section id="strengths" className="sec" style={{ background: '#fff' }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="sec-label">
              <Editable path="strengths.label" value={s.label} />
            </div>
            <h2 className="sec-title">
              <Editable path="strengths.title" value={s.title} />
            </h2>
          </div>
          <p className="sec-note">
            <Editable path="strengths.note" value={s.note} />
          </p>
        </div>

        <div className="strength-grid reveal">
          {s.items.map((item, i) => (
            <div className="strength" key={i}>
              <div className="no">
                <Editable path={`strengths.items.${i}.no`} value={item.no} />
              </div>
              <h3>
                <Editable path={`strengths.items.${i}.title`} value={item.title} />
              </h3>
              <p>
                <Editable path={`strengths.items.${i}.desc`} value={item.desc} />
              </p>
              {editing && (
                <button type="button" className="mini-del" onClick={() => removeStrength(i)}>
                  删除
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
