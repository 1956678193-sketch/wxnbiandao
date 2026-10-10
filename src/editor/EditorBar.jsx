import { useRef } from 'react'
import { useContent } from './ContentContext'

export default function EditorBar() {
  const {
    editing,
    setEditing,
    addWork,
    addStrength,
    exportContent,
    importContent,
    exportMedia,
    resetAll,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useContent()
  const fileRef = useRef(null)

  return (
    <>
      {editing && (
        <div className="editor-panel">
          <span className="hint">点文字直接改 · 点画面上的「更换」换视频或图片 · 改完自动保存</span>
          <button
            type="button"
            className="undo"
            onClick={undo}
            disabled={!canUndo}
            title="撤回上一步改动（Ctrl + Z）"
          >
            ↩ 撤回
          </button>
          <button
            type="button"
            className="undo"
            onClick={redo}
            disabled={!canRedo}
            title="重做（Ctrl + Shift + Z）"
          >
            ↪ 重做
          </button>
          <button type="button" onClick={addWork}>
            ＋ 新增作品模块
          </button>
          <button type="button" onClick={addStrength}>
            ＋ 新增优势卡
          </button>
          <button type="button" onClick={exportContent}>
            导出内容
          </button>
          <button type="button" onClick={() => fileRef.current && fileRef.current.click()}>
            导入内容
          </button>
          <button type="button" onClick={exportMedia}>
            导出图片视频
          </button>
          <button type="button" className="danger" onClick={resetAll}>
            恢复默认
          </button>
        </div>
      )}
      <button
        type="button"
        className={`editor-toggle${editing ? ' on' : ''}`}
        onClick={() => setEditing(!editing)}
      >
        {editing ? '完成编辑' : '编辑网页'}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={(e) => {
          const f = e.target.files && e.target.files[0]
          e.target.value = ''
          if (f) importContent(f)
        }}
      />
    </>
  )
}
