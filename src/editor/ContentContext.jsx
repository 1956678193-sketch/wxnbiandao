import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { defaultContent } from '../data/site'
import { mediaPut, mediaGet, mediaGetAll, mediaClear } from './media'

// 改动默认内容结构后 +1，旧缓存会被丢弃，避免网页上显示旧文案或旧的错误路径
const LS_KEY = 'wxn-portfolio-content-v10'
const Ctx = createContext(null)

export const useContent = () => useContext(Ctx)

function setIn(obj, path, value) {
  const parts = path.split('.')
  const next = structuredClone(obj)
  let cur = next
  for (let i = 0; i < parts.length - 1; i++) {
    cur = Array.isArray(cur) ? cur[Number(parts[i])] : cur[parts[i]]
  }
  const last = parts[parts.length - 1]
  if (Array.isArray(cur)) cur[Number(last)] = value
  else cur[last] = value
  return next
}

const uid = () => 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent)
  const [mediaUrls, setMediaUrls] = useState({})
  const [editing, setEditing] = useState(false)
  const [ready, setReady] = useState(false)

  // 撤回 / 重做用的历史栈（最多留 60 步），contentRef 始终跟着最新的内容
  const past = useRef([])
  const future = useRef([])
  const contentRef = useRef(defaultContent)
  useEffect(() => {
    contentRef.current = content
  }, [content])

  // 统一的写入口。silent = true 是系统自动写入（读视频宽高、自动抽首帧），不占一步撤回
  const commit = useCallback((updater, silent = false) => {
    setContent((c) => {
      const next = typeof updater === 'function' ? updater(c) : updater
      if (!next || next === c) return c
      if (!silent) {
        // StrictMode 下更新函数会跑两次，用最后一项比对避免重复入栈
        if (past.current[past.current.length - 1] !== c) {
          past.current.push(c)
          if (past.current.length > 60) past.current.shift()
        }
        future.current = []
      }
      contentRef.current = next
      return next
    })
  }, [])

  const undo = useCallback(() => {
    const prev = past.current.pop()
    if (!prev) return
    future.current.push(contentRef.current)
    contentRef.current = prev
    setContent(prev)
  }, [])

  const redo = useCallback(() => {
    const next = future.current.pop()
    if (!next) return
    past.current.push(contentRef.current)
    contentRef.current = next
    setContent(next)
  }, [])

  // 编辑模式下的快捷键：Ctrl/⌘ + Z 撤回，Ctrl/⌘ + Shift + Z（或 Ctrl + Y）重做
  useEffect(() => {
    if (!editing) return
    const onKey = (e) => {
      const t = e.target
      // 正在改文字时交给浏览器自己的撤销
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName || ''))) return
      if (!(e.ctrlKey || e.metaKey)) return
      const k = String(e.key || '').toLowerCase()
      if (k === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if (k === 'y' || (k === 'z' && e.shiftKey)) {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [editing, undo, redo])

  // 启动：读本地保存的文字 + 读上传过的媒体
  useEffect(() => {
    ;(async () => {
      try {
        const raw = localStorage.getItem(LS_KEY)
        if (raw) setContent({ ...defaultContent, ...JSON.parse(raw) })
        const blobs = await mediaGetAll()
        const urls = {}
        Object.keys(blobs).forEach((k) => {
          urls[k] = URL.createObjectURL(blobs[k])
        })
        setMediaUrls(urls)
      } catch (e) {
        console.warn('读取本地内容失败', e)
      }
      setReady(true)
    })()
  }, [])

  // 改动即存
  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(content))
    } catch (e) {
      console.warn('保存失败', e)
    }
  }, [content, ready])

  // 改文字：值没变就不记一步
  const update = useCallback(
    (path, value) => {
      commit((c) => {
        const cur = path
          .split('.')
          .reduce((o, k) => (o == null ? o : Array.isArray(o) ? o[Number(k)] : o[k]), c)
        if (cur === value) return c
        return setIn(c, path, value)
      })
    },
    [commit]
  )

  // 系统自动写入（不进撤回记录）
  const updateSilent = useCallback(
    (path, value) => {
      commit((c) => setIn(c, path, value), true)
    },
    [commit]
  )

  const resolveMedia = useCallback(
    (src) => {
      if (!src) return ''
      if (typeof src === 'string' && src.startsWith('media:')) {
        return mediaUrls[src.slice(6)] || ''
      }
      return src
    },
    [mediaUrls]
  )

  const uploadMedia = useCallback(async (file) => {
    const id = uid()
    await mediaPut(id, file)
    setMediaUrls((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }))
    return `media:${id}`
  }, [])

  const addWork = useCallback(() => {
    const id = uid()
    commit((c) => ({
      ...c,
      works: {
        ...c.works,
        items: [
          ...c.works.items,
          { id, tag: '新作品', title: '未命名作品', desc: '一句话说明这条片子在做什么。', video: null },
        ],
      },
    }))
  }, [commit])

  const removeWork = useCallback(
    (id) => {
      commit((c) => ({
        ...c,
        works: { ...c.works, items: c.works.items.filter((w) => w.id !== id) },
      }))
    },
    [commit]
  )

  const addStrength = useCallback(() => {
    const no = String(Math.floor(Math.random() * 90) + 10)
    commit((c) => ({
      ...c,
      strengths: {
        ...c.strengths,
        items: [...c.strengths.items, { no, title: '新优势', desc: '写一句你能做到的事。' }],
      },
    }))
  }, [commit])

  const removeStrength = useCallback(
    (index) => {
      commit((c) => ({
        ...c,
        strengths: { ...c.strengths, items: c.strengths.items.filter((_, i) => i !== index) },
      }))
    },
    [commit]
  )

  // 把网页上改好的内容整份导出来存成文件，方便同步回项目代码
  const exportContent = useCallback(() => {
    const name = `作品集内容_${new Date().toISOString().slice(0, 10)}.json`
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: 'application/json;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, [content])

  // 导入之前导出的 json
  const importContent = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result))
        if (obj && typeof obj === 'object') {
          commit(() => ({ ...defaultContent, ...obj }))
          window.alert('内容已导入')
        }
      } catch (e) {
        window.alert('这个文件读不出来，确认是导出的 json 吗？')
      }
    }
    reader.readAsText(file)
  }, [commit])

  // 把上传过的图片/视频按「头像 / 作品01_标题 / 作品01_标题_封面」这样的名字下载下来
  const exportMedia = useCallback(async () => {
    const used = []
    const push = (val, name) => {
      if (typeof val === 'string' && val.startsWith('media:')) {
        used.push({ key: val.slice(6), name })
      }
    }
    push(content.profile.avatar, '头像')
    push(content.hero.image, '首页图')
    content.works.items.forEach((it, i) => {
      const n = String(i + 1).padStart(2, '0')
      push(it.video, `作品${n}_${it.title}`)
      push(it.poster, `作品${n}_${it.title}_封面`)
    })

    if (!used.length) {
      window.alert('还没有上传过图片或视频')
      return
    }

    let ok = 0
    for (const u of used) {
      const blob = await mediaGet(u.key)
      if (!blob) continue
      const type = blob.type || ''
      const ext = type.includes('video')
        ? '.mp4'
        : type.includes('png')
          ? '.png'
          : type.includes('webp')
            ? '.webp'
            : '.jpg'
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${u.name}${ext}`
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 5000)
      ok += 1
      await new Promise((r) => setTimeout(r, 700))
    }
    window.alert(`已导出 ${ok} 个文件，去下载目录看看（浏览器可能会问是否允许下载多个文件，点允许）`)
  }, [content])

  const resetAll = useCallback(async () => {
    if (!window.confirm('恢复默认会清掉你在网页上做过的全部修改和上传的文件，且不可撤回，确定？')) return
    try {
      localStorage.removeItem(LS_KEY)
      await mediaClear()
    } catch (e) {
      console.warn(e)
    }
    setMediaUrls({})
    // 恢复默认后历史一并清空，避免撤回到已经不存在的上传文件
    past.current = []
    future.current = []
    contentRef.current = defaultContent
    setContent(defaultContent)
  }, [])

  const value = useMemo(
    () => ({
      content,
      editing,
      setEditing,
      update,
      updateSilent,
      resolveMedia,
      uploadMedia,
      addWork,
      removeWork,
      addStrength,
      removeStrength,
      exportContent,
      importContent,
      exportMedia,
      resetAll,
      undo,
      redo,
      canUndo: past.current.length > 0,
      canRedo: future.current.length > 0,
    }),
    [
      content,
      editing,
      update,
      updateSilent,
      resolveMedia,
      uploadMedia,
      addWork,
      removeWork,
      addStrength,
      removeStrength,
      exportContent,
      importContent,
      exportMedia,
      resetAll,
      undo,
      redo,
    ]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
