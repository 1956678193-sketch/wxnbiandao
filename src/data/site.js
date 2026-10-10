// ============================================================
// 站点默认内容：所有文字、图片、视频都在这里
// 已同步网页上导出的一份（作品集内容_2026-09-25 (3).json）
// 网页上的「编辑模式」改完会存到浏览器本地，点「恢复默认」就回到这里
// ============================================================

// 开发时直接引用桌面素材库原文件（不复制）；打包上线时读 public/videos 里复制好的片子
// 中文路径必须编码后再交给浏览器，否则 Vite 会报 URI malformed
const VIDEO_ROOT = import.meta.env.DEV
  ? '/@fs/C:/Users/HP/Desktop/制作网站资料/02_作品集'
  : `${import.meta.env.BASE_URL}videos`
// 图片同理，BASE_URL 在本地是 '/'，上线是 '/wxnbiandao/'
const MEDIA_ROOT = `${import.meta.env.BASE_URL}media`
// 下面每条视频路径里已经带了 VIDEO_ROOT，这里只负责编码，不要再拼一次
const v = (path) => encodeURI(path)

// ratio = 视频宽 / 高，决定卡片是横着放还是竖着放（不裁画面）
export const defaultContent = {
  brand: "王晓娜",
  nav: [
      {
          "id": "hero",
          "label": "首页"
      },
      {
          "id": "about",
          "label": "关于我"
      },
      {
          "id": "works",
          "label": "作品"
      },
      {
          "id": "records",
          "label": "战绩"
      },
      {
          "id": "strengths",
          "label": "优势"
      },
      {
          "id": "contact",
          "label": "联系"
      }
  ],

  hero: {
    video: v(`${VIDEO_ROOT}/剪辑技法/剪辑-四屏开场.mp4`),
    image: "",
    kicker: "",
    title: "王晓娜",
    sub: "服务过律所机构号和律师个人 IP，覆盖婚姻家事、合同纠纷、刑事辩护、劳动争议、公司治理五个方向。账号定位、选题策划、脚本创作、拍摄统筹、剪辑包装、发布运营、数据复盘，我一个人跑完。",
    ctaPrimary: "看作品",
    ctaGhost: "联系我",
    scrollHint: "向下滚动",
    footNote: "账号定位 · 选题策划 · 脚本创作 · 拍摄统筹 · 剪辑包装 · 发布运营 · 数据复盘",
  },

  about: {
    label: "01 — 关于我",
    title: "六年只做一件事：\n把专业内容讲成人话",
    note: "2016—2020 河南城建学院工程管理本科，毕业后一直在做编导。六年垂类短视频，两类主体都做过：律所机构号、律师个人 IP。现在在北京，随时到岗。",
  },
  profile: {
    name: "王晓娜",
    role: "编导 / 新媒体运营",
    avatar: `${MEDIA_ROOT}/avatar.jpg`,
    intro: [
      "我是王晓娜，做了六年垂类短视频编导。服务过律所机构号和律师个人 IP 两类主体，覆盖婚姻家事、合同纠纷、刑事辩护、劳动争议、公司治理五个方向，独立负责账号定位—选题策划—脚本创作—拍摄统筹—剪辑包装—发布运营—数据复盘全流程。",
      "累计参与产出 5500+ 条作品，独立撰写口播逐字稿 2800+ 条，最高单条播放 622 万。主责的【郑州律师魏涛】账号，三年从 46.7 万涨到 157.2 万，净增 110.5 万。",
      "也在用 AI 提效：ChatGPT、豆包、WorkBuddy 做选题扩写和脚本初稿，把一条内容从选题到成片的时间，从大约 6 小时压到 3 小时以内。",
    ],
    contact: {
      phone: "15516035875",
      wechat: "xwdbdrj323",
      email: "",
      location: "北京",
    },
    stats: [
      { value: "6", unit: "年", label: "垂类编导经验" },
      { value: "5500+", unit: "条", label: "参与产出作品" },
      { value: "2800+", unit: "条", label: "独立口播逐字稿" },
      { value: "622", unit: "万", label: "单条最高播放" },
    ],
  },

  works: {
    label: "02 — 精选作品",
    title: "我的作品集",
    note: "",
    items: [
      {
        id: "aigc-vlog",
        tag: "AIGC 影像",
        title: "AIGC 旅行 vlog",
        desc: "AI 生成的画面和实拍素材混着剪，一条完整的旅行短片。",
        video: v(`${VIDEO_ROOT}/AIGC生成/AIGC旅行vlog-最终版.mp4`),
        poster: `${MEDIA_ROOT}/cover-01-aigc-vlog.jpg`,
        ratio: 0.562,
      },
      {
        id: "interview",
        tag: "实战经验",
        title: "账号作品",
        desc: "自己账号作品，在小红书平台浏览量达51W+，点赞2.7W+，收藏3.2W+。",
        video: v(`${VIDEO_ROOT}/账号作品/小红书-账号作品.mp4`),
        poster: `${MEDIA_ROOT}/cover-account-xhs.jpg`,
        ratio: 0.562,
      },
      {
        id: "digital-human",
        tag: "数字人",
        title: "数字人口播",
        desc: "法律科普类内容，用数字人完成出镜与口播。",
        video: v(`${VIDEO_ROOT}/访谈口播/律师数字人剪辑-协议离婚和诉讼离婚.mp4`),
        poster: `${MEDIA_ROOT}/cover-03-digital-human.jpg`,
        ratio: 0.562,
      },
      {
        id: "ecommerce",
        tag: "带货营销",
        title: "产品营造短片",
        desc: "把一个卖点拆开讲清楚，短平快，适合挂小黄车。",
        video: v(`${VIDEO_ROOT}/商业带货/营销成品-红豆奶酪味面包.mp4`),
        poster: `${MEDIA_ROOT}/cover-04-ecommerce.jpg`,
        ratio: 0.562,
      },
      {
        id: "doc",
        tag: "访谈口播",
        title: "自然流访谈",
        desc: "不摆拍，靠剪辑从一段长访谈里找节奏和情绪落点。",
        video: v(`${VIDEO_ROOT}/访谈口播/留学口播剪辑.mp4`),
        poster: `${MEDIA_ROOT}/cover-05-account.jpg`,
        ratio: 0.562,
      },
      {
        id: "portrait",
        tag: "商业营销",
        title: "服装视频",
        desc: "运用AI让服装匹配场景展示服装，降低成本。",
        video: v(`${VIDEO_ROOT}/商业带货/罗马风服装视频.mp4`),
        poster: `${MEDIA_ROOT}/cover-06-clothes.jpg`,
        ratio: 0.562,
      },
      {
        id: "mmugjv5c7ebgv9",
        tag: "AI动画",
        title: "异世界少女",
        desc: "运用AI制作2D动画，让脑中的想法变成现实。",
        video: v(`${VIDEO_ROOT}/AIGC生成/AI制作动画.mp4`),
        poster: `${MEDIA_ROOT}/cover-07-anime.jpg`,
        ratio: 1.778,
      },
      {
        id: "mmugjvedcixtsf",
        tag: "场景对话",
        title: "便利店场景",
        desc: "运用AI制作场景对话。",
        video: v(`${VIDEO_ROOT}/访谈口播/便利店对话.mp4`),
        poster: `${MEDIA_ROOT}/cover-08-store.jpg`,
        ratio: 1.78,
      },
      {
        id: "mmugjves7ftc2x",
        tag: "视频调色",
        title: "调色作品",
        desc: "利用达芬奇进行一级调色。",
        video: v(`${VIDEO_ROOT}/剪辑技法/调色作品-高清版.mp4`),
        poster: `${MEDIA_ROOT}/cover-09-color.jpg`,
        ratio: 1.778,
      },
      {
        id: "mmugk7j8f42y5i",
        tag: "剪辑技法",
        title: "四屏开场",
        desc: "运用剪映剪辑转场，让视频看起来不单调。",
        video: v(`${VIDEO_ROOT}/剪辑技法/剪辑-四屏开场.mp4`),
        poster: `${MEDIA_ROOT}/cover-10-sisplit.jpg`,
        ratio: 1.778,
      },
      {
        id: "mmv2gueqq7qaen",
        tag: "新作品",
        title: "京剧传承短片",
        desc: "利用AI制作京剧非遗宣传片",
        video: v(`${VIDEO_ROOT}/AIGC生成/京剧宣传.mp4`),
        poster: `${MEDIA_ROOT}/cover-11-jingju.jpg`,
        ratio: 1.78,
      },
      {
        id: "mmv2gxyjsz3kqy",
        tag: "新作品",
        title: "普法小短片：一张藏起来的通知单",
        desc: "运用AI制作关于离婚后抚养权的小短片，让法律条款变得通俗易懂。",
        video: v(`${VIDEO_ROOT}/AIGC生成/普法小短剧.mp4`),
        poster: `${MEDIA_ROOT}/cover-12-pufa.jpg`,
        ratio: 1.778,
      },
    ],
  },

  records: {
    label: "03 — 垂类战绩",
    title: "我的战绩",
    note: "",
    highlights: [
      { value: "5500+", label: "参与产出作品" },
      { value: "2800+", label: "独立口播逐字稿" },
      { value: "622 万", label: "单条最高播放" },
      { value: "157.2 万", label: "魏涛账号粉丝（46.7 万起）" },
    ],
    fields: ["婚姻家事", "合同纠纷", "刑事辩护", "劳动争议", "公司治理"],
    funnel: ["短视频引流", "评论激发", "置顶承接", "私信留资", "移交谈案"],
    timeline: [
      {
        period: "2023.09 — 2026.08",
        org: "河南光法律师事务所",
        role: "短视频编导",
        points: [
          "负责律师个人 IP 账号【郑州律师魏涛】的选题定位、脚本撰写、拍摄统筹、发布与数据复盘",
          "围绕婚姻家事 / 离婚单赛道搭建 500 条选题库：离婚、彩礼、夫妻共同财产、房产分割、抚养权、家暴出轨、婚内财产保护，推动账号由综合普法转向单赛道聚焦",
          "把律师的专业判断翻译成「用户问题—常见误区—关键事实/证据—下一步准备」的口播结构",
          "独立撰写逐字稿 60 条/月，按律师档期统筹每周拍摄排期；月均发布 120 条",
          "任职期间单条播放最高 622 万，破 100 万共 23 条；粉丝由 46.7 万增长至 157.2 万，净增 110.5 万",
          "内容侧月均约 3300+ 条有效留资，转案率 3% 左右，月均约 100 条转案，移交谈案团队",
          "成交链路：置顶位落地页 + 评论引导 + 私域承接入口 + 用户信息采集 + 电话回访 + 邀约到店成交",
        ],
      },
      {
        period: "2020.07 — 2023.08",
        org: "四川循定律师事务所",
        role: "短视频编导",
        points: [
          "负责律所企业账号【四川循定律师事务所】，承担账号定位、栏目结构与发布节奏的落地执行",
          "搭建 8 大内容合集：循定案例、循定普法、劳动争议、公司治理、刑事辩护、合同纠纷、婚姻继承、实用文书，把散点内容沉淀成可检索、可复用的选题资产",
          "在职 3 年多累计发布 1000+ 条，粉丝增长 50 万，月均更新约 30 条",
          "形成多律师真人口播与栏目化生产机制；每月获取有效客户留资 500+ 条，移交业务团队跟进",
        ],
      },
    ],
  },

  strengths: {
    label: "04 — 个人优势",
    title: "六年沉淀下来的，是能复用的一套做法",
    note: "从选题到成片，再到转化和复盘，这条路上的每一段我都自己跑过。",
    items: [
      { no: "01", title: "垂类内容策划", desc: "选题策划、脚本撰写、拍摄统筹、成片审核、爆款拆解、系列栏目搭建。围绕婚姻家事单赛道搭过 500 条选题库，把散点内容沉淀成可检索、可复用的选题资产。" },
      { no: "02", title: "口播逐字稿", desc: "独立写过 2800+ 条口播逐字稿，稳定 60 条/月。我知道怎么把律师的专业判断翻译成「用户问题—常见误区—关键事实/证据—下一步准备」。" },
      { no: "03", title: "承接与转化", desc: "设计过「短视频引流→评论激发→置顶承接→私信留资→移交谈案」的完整链路，落地到置顶位落地页、评论引导、私域承接、信息采集、电话回访、邀约到店。内容侧月均约 3300+ 条有效留资。" },
      { no: "04", title: "剪映 / PR / AE / 达芬奇", desc: "剪映精通，PR 熟练，AE 能做基础图文动画和包装模板套用，达芬奇做一级校色与输出。" },
      { no: "05", title: "AI 工具提效", desc: "ChatGPT、豆包、WorkBuddy、LibTV、千问日常用。选题扩写、脚本初稿撰写，一条片子从 6 小时压到 3 小时以内。" },
      { no: "06", title: "数据复盘", desc: "抖音创作者中心（日常）、巨量算数（选题与热词）。每周跟 5 秒完播率、评论关键词、私信来源，把跑出来的选题沉淀成系列复用。" },
    ],
  },

  contact: {
    label: "05 — 联系",
    big: "有想法，别只在脑子里过。\n发我一句，我回你一条能拍的。",
    footerNote: "北京 · 随时到岗",
  },
}

export const navItems = defaultContent.nav
