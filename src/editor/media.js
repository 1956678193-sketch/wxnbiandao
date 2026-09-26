// 上传的图片/视频存在浏览器 IndexedDB 里，刷新不丢
const DB_NAME = 'wxn-portfolio-media'
const STORE = 'media'

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE)
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function mediaPut(key, blob) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(blob, key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function mediaGet(key) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).get(key)
    req.onsuccess = () => resolve(req.result || null)
    req.onerror = () => reject(req.error)
  })
}

export async function mediaGetAll() {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const out = {}
    const tx = db.transaction(STORE, 'readonly')
    const store = tx.objectStore(STORE)
    const req = store.openCursor()
    req.onsuccess = (e) => {
      const cur = e.target.result
      if (cur) {
        out[cur.key] = cur.value
        cur.continue()
      } else {
        resolve(out)
      }
    }
    req.onerror = () => reject(req.error)
  })
}

// 抽视频首帧：加载视频 → 跳到 0.1 秒 → 画到 canvas → 导出 jpg
// 返回的 Blob 存进 IndexedDB，刷新后还在
export function captureFrame(src, width = 720) {
  return new Promise((resolve) => {
    const v = document.createElement('video')
    let done = false
    const finish = (blob) => {
      if (done) return
      done = true
      try {
        v.removeAttribute('src')
        v.load()
      } catch (e) {
        /* 忽略 */
      }
      resolve(blob)
    }

    v.muted = true
    v.playsInline = true
    v.preload = 'auto'
    v.crossOrigin = 'anonymous'

    v.onerror = () => finish(null)
    v.onloadeddata = () => {
      const draw = () => {
        try {
          const w = width
          const h = Math.max(1, Math.round((v.videoHeight / (v.videoWidth || 16)) * w))
          const c = document.createElement('canvas')
          c.width = w
          c.height = h
          c.getContext('2d').drawImage(v, 0, 0, w, h)
          c.toBlob((b) => finish(b), 'image/jpeg', 0.82)
        } catch (e) {
          finish(null)
        }
      }
      const t = Math.min(0.1, (v.duration || 1) / 2)
      if (v.currentTime < 0.05 && t > 0) {
        v.onseeked = draw
        try {
          v.currentTime = t
        } catch (e) {
          draw()
        }
      } else {
        draw()
      }
    }

    // 8 秒还没出帧就放弃，不卡住页面
    setTimeout(() => finish(null), 8000)
    v.src = src
  })
}

export async function mediaClear() {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).clear()
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
