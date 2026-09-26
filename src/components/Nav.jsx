import { useContent } from '../editor/ContentContext'
import Editable from '../editor/Editable'

export default function Nav({ scrolled, active }) {
  const { content } = useContent()

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="brand">
          <Editable path="brand" value={content.brand} />
        </a>
        <nav className="nav-links">
          {content.nav.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'on' : ''}>
              <Editable path={`nav.${i}.label`} value={item.label} />
            </a>
          ))}
        </nav>
        <a className="btn btn-light" href="#contact">
          联系我
        </a>
      </div>
    </header>
  )
}
