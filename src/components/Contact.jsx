import { useContent } from '../editor/ContentContext'
import Editable from '../editor/Editable'

export default function Contact() {
  const { content } = useContent()
  const { contact: ct, profile } = content
  const c = profile.contact

  const rows = [
    { k: '微信', v: c.wechat, path: 'profile.contact.wechat' },
    { k: '邮箱', v: c.email, path: 'profile.contact.email' },
    { k: '电话', v: c.phone, path: 'profile.contact.phone' },
  ]

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="sec-label reveal">
          <Editable path="contact.label" value={ct.label} />
        </div>
        <h2 className="contact-big reveal">
          <Editable as="span" path="contact.big" value={ct.big} multiline />
        </h2>

        <a className="contact-mail reveal" href={`mailto:${c.email}`}>
          <Editable path="profile.contact.email" value={c.email} />
        </a>

        <div className="contact-rows reveal">
          {rows.map((r) => (
            <div key={r.k}>
              <div className="k">{r.k}</div>
              <div className="v">
                <Editable path={r.path} value={r.v} />
              </div>
            </div>
          ))}
        </div>

        <div className="foot">
          <span>© {new Date().getFullYear()} {profile.name} · {profile.role}</span>
          <span>
            <Editable path="contact.footerNote" value={ct.footerNote} />
          </span>
        </div>
      </div>
    </section>
  )
}
