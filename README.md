# 作品集网站

React + Vite 做的个人作品集，带网页内可视化修改器（改文字/换图/换视频/加模块）。

## 本地预览

```
npm install
npm run dev        # http://127.0.0.1:5175/
```

## 打包

```
npm run build      # 输出到 docs/，GitHub Pages 直接托管这个目录
```

## GitHub Pages 部署

仓库名必须是 `用户名.github.io`，Pages 设置：main 分支 + /docs 目录。

推送更新：

```
git add -A
git commit -m "更新内容"
git push
```

## 内容改在哪

- 改文字：直接在网页上点右下角「编辑网页」，改完自动存；想固化到代码里就点「导出内容」，把 json 里的字段抄进 `src/data/site.js`
- 视频：默认引用 `C:/Users/HP/Desktop/制作网站资料/02_作品集` 里的原文件（开发模式）；打包时读 `public/videos`
- 封面图/头像：`public/media/`
