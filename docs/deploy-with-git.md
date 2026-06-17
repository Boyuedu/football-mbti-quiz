# Git 部署指南（推荐）

推送代码到 GitHub 后自动发布：

| 站点 | 方式 | 触发 |
|------|------|------|
| **国际站** | Cloudflare Pages 连接 GitHub | 每次 `git push` |
| **中国站** | GitHub Actions → 阿里云 OSS | 每次 `git push`（需先配 Secret） |

---

## 第一步：初始化 Git 并推到 GitHub

在项目根目录执行：

```bash
git init
git add .
git commit -m "Initial commit: Football DNA quiz"
```

在 GitHub 新建空仓库（不要勾选 README），然后：

```bash
git remote add origin https://github.com/你的用户名/football-mbti-quiz.git
git branch -M main
git push -u origin main
```

---

## 第二步：国际站 — Cloudflare Pages 连接 Git

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
2. 授权 GitHub，选择 `football-mbti-quiz` 仓库。
3. 构建设置：

   | 项 | 值 |
   |----|-----|
   | Production branch | `main` |
   | Framework preset | Vite |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node version | `20`（Environment variables → 添加 `NODE_VERSION` = `20`） |

4. **Save and Deploy**，等待约 2 分钟。
5. 获得地址：`https://football-mbti-quiz.pages.dev`（或你设的项目名）。
6. （可选）**Custom domains** 绑定自己的域名，如 `quiz.example.com`。

之后每次 `git push` 到 `main`，Cloudflare 会自动重新构建并发布。

> **不要**同时启用 Cloudflare Git 连接和 `.github/workflows/deploy-cloudflare.yml` 的自动推送，否则会重复部署。本仓库的 Cloudflare workflow 已改为仅手动触发。

---

## 第三步：中国站 — GitHub Actions 上传 OSS

### 3.1 阿里云准备（一次性）

1. 创建 OSS Bucket（公共读 + 静态网站，404 → `index.html`）。
2. 配置 CDN 加速域名。
3. 创建 RAM 子账号，仅授予该 Bucket 的读写权限，拿到 AccessKey。

详见 [deployment-dual-static.md](./deployment-dual-static.md) 第三节。

### 3.2 在 GitHub 配置 Secrets

仓库 → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**：

| Secret 名称 | 示例值 |
|-------------|--------|
| `ALIYUN_OSS_REGION` | `oss-cn-hangzhou` 或 `oss-cn-hongkong` |
| `ALIYUN_OSS_BUCKET` | 你的 Bucket 名称 |
| `ALIYUN_OSS_ACCESS_KEY_ID` | RAM AccessKey ID |
| `ALIYUN_OSS_ACCESS_KEY_SECRET` | RAM AccessKey Secret |
| `ALIYUN_OSS_PREFIX` | 可选，如 `football-dna`（留空则传到 Bucket 根目录） |

配置完成后，workflow `.github/workflows/deploy-china.yml` 会在每次 push 时自动上传 `dist/`。

也可在 GitHub **Actions** 页手动运行 **Deploy to Aliyun OSS (China)**。

### 3.3 验证

推送一次小改动：

```bash
git commit --allow-empty -m "Trigger deploy"
git push
```

在 GitHub **Actions** 查看绿色 ✓，浏览器打开国内 CDN 域名确认更新。

---

## 日常发布流程

```bash
# 改完代码后
git add .
git commit -m "描述你的修改"
git push
```

- Cloudflare：在 Pages 项目 **Deployments** 查看进度。
- 中国站：在 GitHub **Actions** 查看 **Deploy to Aliyun OSS**。

---

## 推广链接

| 用户 | 链接 |
|------|------|
| 海外 | Cloudflare 域名 |
| 国内 | 阿里云 CDN 域名 |

---

## 可选：评分 API

静态部署默认不显示评分区块。若日后有香港 API，在 Cloudflare Pages 项目 **Settings → Environment variables** 添加：

- `VITE_API_BASE_URL` = `https://api.example.com`

并在 GitHub Secrets 里为 `deploy-china` workflow 添加同名 `VITE_API_BASE_URL`，然后重新部署。

---

## 故障排查

| 问题 | 处理 |
|------|------|
| Cloudflare 构建失败 | 查看 Build log；确认 `NODE_VERSION=20` |
| 中国 Actions 未运行 | 检查是否已配置 `ALIYUN_OSS_BUCKET` Secret |
| 中国站页面旧 | CDN 控制台刷新缓存 |
| 只有国际站、暂不做中国站 | 不配阿里云 Secret 即可，仅 Cloudflare 会部署 |
