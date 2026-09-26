import { useContent } from '../editor/ContentContext'
import Editable from '../editor/Editable'
import MediaFrame from '../editor/MediaFrame'

export default function About() {
  const { content, resolveMedia, editing } = useContent()
  const { about, profile } = content
  const c = profile.contact
  // 头像可能只存在某台电脑的浏览器里（media: 开头的 key），取不到就退回姓氏占位
  const avatarSrc = resolveMedia(profile.avatar)

  return (
    <section id="about" className="sec">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="sec-label">
              <Editable path="about.label" value={about.label} />
            </div>
            <h2 className="sec-title">
              <Editable as="span" path="about.title" value={about.title} multiline />
            </h2>
          </div>
          <p className="sec-note">
            <Editable path="about.note" value={about.note} />
          </p>
        </div>

        <div className="about-grid">
          <div className="about-media reveal">
            {avatarSrc || editing ? (
              <MediaFrame
                kind="image"
                src={avatarSrc}
                path="profile.avatar"
                mediaClass="about-img"
                emptyText="上传人物照"
              />
            ) : (
              <>
                <span className="initial">{profile.name.slice(0, 1)}</span>
                <span className="tip">人物照待替换</span>
              </>
            )}
          </div>

          <div className="reveal">
            <h3 className="about-name">
              <Editable path="profile.name" value={profile.name} />
            </h3>
            <div className="about-role">
              <Editable path="profile.role" value={profile.role} />
            </div>

            <div className="about-text">
              {profile.intro.map((p, i) => (
                <p key={i}>
                  <Editable path={`profile.intro.${i}`} value={p} />
                </p>
              ))}
            </div>

            <div className="contact-list">
              <div className="contact-row">
                <span className="k">电话</span>
                <span className="v">
                  <Editable path="profile.contact.phone" value={c.phone} />
                </span>
              </div>
              <div className="contact-row">
                <span className="k">微信</span>
                <span className="v">
                  <Editable path="profile.contact.wechat" value={c.wechat} />
                </span>
              </div>
              <div className="contact-row">
                <span className="k">邮箱</span>
                <span className="v">
                  <Editable path="profile.contact.email" value={c.email} />
                </span>
              </div>
              <div className="contact-row">
                <span className="k">城市</span>
                <span className="v">
                  <Editable path="profile.contact.location" value={c.location} />
                </span>
              </div>
            </div>

            <div className="stats">
              {profile.stats.map((s, i) => (
                <div className="stat" key={i}>
                  <div className="num">
                    <Editable path={`profile.stats.${i}.value`} value={s.value} />
                    <i>
                      <Editable path={`profile.stats.${i}.unit`} value={s.unit} />
                    </i>
                  </div>
                  <div className="lb">
                    <Editable path={`profile.stats.${i}.label`} value={s.label} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
