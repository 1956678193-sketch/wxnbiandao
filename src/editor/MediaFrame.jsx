import { useRef } from 'react'
import { useContent } from './ContentContext'
import { captureFrame } from './media'

// 图片 / 视频的外框：编辑模式下出现「换 / 删」，点换可直接上传本地文件
export default function MediaFrame({
  kind = 'video',
  src,
  path,
  poster = null,
  posterPath = null,
  imagePath = null,
  imageLabel = '换图',
  mediaClass = '',
  hoverPlay = false,
  autoPlay = false,
  seek = false,
  onRemove,
  onMeta,
  emptyText,
}) {
  const { editing, update, updateSilent, uploadMedia } = useContent()
  const inputRef = useRef(null)
  const imageInputRef = useRef(null)
  const videoRef = useRef(null)
  const capRef = useRef('')
  const hasSrc = !!src

  const pick = () => inputRef.current && inputRef.current.click()
  const pickImage = () => imageInputRef.current && imageInputRef.current.click()

  const onFile = async (e) => {
    const file = e.target.files && e.target.files[0]
    e.target.value = ''
    if (!file) return
    const key = await uploadMedia(file)
    // 换了片子就清掉旧首帧图，让它重新抽一张
    if (posterPath) update(posterPath, null)
    update(path, key)
  }

  // 单独上传一张图当封面 / 首页背景
  const onImageFile = async (e) => {
    const file = e.target.files && e.target.files[0]
    e.target.value = ''
    if (!file || !imagePath) return
    const key = await uploadMedia(file)
    update(imagePath, key)
  }

  // 没有首帧图就抽一张存起来，之后卡片不点也显示这一帧
  const ensurePoster = () => {
    if (!seek || autoPlay || !posterPath || poster || !src) return
    if (capRef.current === src) return
    capRef.current = src
    captureFrame(src).then((blob) => {
      if (!blob) return
      uploadMedia(blob).then((key) => updateSilent(posterPath, key))
    })
  }

  const play = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }

  const pause = () => {
    const v = videoRef.current
    if (v) v.pause()
  }

  const videoSrc = src ? `${src}${seek ? '#t=0.6' : ''}` : ''

  // 有封面图就直接显示这张图，不用 video 的 poster 属性：
  // 视频元素只要画过一帧，再改 poster 属性浏览器是不会刷新的
  const showStill = kind === 'video' && seek && !autoPlay && !!poster

  return (
    <div
      className={`media-frame${editing ? ' editing' : ''}`}
      onMouseEnter={hoverPlay ? play : undefined}
      onMouseLeave={hoverPlay ? pause : undefined}
    >
      {hasSrc ? (
        kind === 'video' ? (
          showStill ? (
            <img className={mediaClass} src={poster} alt="" />
          ) : (
            <video
              ref={videoRef}
              className={mediaClass}
              src={videoSrc}
              poster={poster || undefined}
              muted={autoPlay}
              loop
              playsInline
              autoPlay={autoPlay}
              preload={autoPlay ? 'auto' : poster ? 'none' : 'metadata'}
              onLoadedMetadata={(e) => {
                const el = e.currentTarget
                if (onMeta && el.videoWidth && el.videoHeight) {
                  onMeta(el.videoWidth, el.videoHeight)
                }
                // 还没生成首帧图时，先把画面停到 0.1 秒顶一下
                if (seek && !autoPlay && !poster && el.currentTime === 0) {
                  try {
                    el.currentTime = 0.1
                  } catch (err) {
                    /* 某些浏览器不允许 seek，忽略 */
                  }
                }
                ensurePoster()
              }}
            />
          )
        ) : (
          <img className={mediaClass} src={src} alt="" />
        )
      ) : (
        <button type="button" className="frame-empty" onClick={pick}>
          ＋ {emptyText || (kind === 'video' ? '上传视频' : '上传图片')}
        </button>
      )}

      {editing && (
        <div className="media-tools">
          <button type="button" onClick={pick}>
            {hasSrc ? '更换' : '上传'}
          </button>
          {imagePath && (
            <button type="button" onClick={pickImage}>
              {imageLabel}
            </button>
          )}
          {onRemove && (
            <button type="button" className="danger" onClick={onRemove}>
              删除
            </button>
          )}
        </div>
      )}

      {imagePath && (
        <input ref={imageInputRef} type="file" accept="image/*" hidden onChange={onImageFile} />
      )}

      <input
        ref={inputRef}
        type="file"
        accept={kind === 'video' ? 'video/*' : 'image/*'}
        hidden
        onChange={onFile}
      />
    </div>
  )
}
