# 双静态部署：Cloudflare Pages（国际）+ 国内云 CDN（中国）

> **用 Git 自动发布？** 请看 **[deploy-with-git.md](./deploy-with-git.md)**（推荐）。

同一份 `npm run build` 产物 `dist/`，部署到两个区域，中美用户各走就近节点。

| 区域 | 平台 | 典型用户 |
|------|------|----------|
| 国际 | Cloudflare Pages | 美国、欧洲、海外华人 |
| 中国 | 阿里云 OSS + CDN | 大陆用户 |

测验逻辑在浏览器内运行，**不需要**服务器即可做题。评分 API 为可选项（见文末）。

---

## 一、本地构建（两个站点共用）

```bash
npm ci
npm run build
```

产物在 `dist/`。任何环境都只构建一次，再分别上传。

---

## 二、国际站 — Cloudflare Pages

### 方式 A：GitHub 自动部署（推荐）

1. 将代码推送到 GitHub。
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
3. 选择仓库，构建设置：
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. 保存并部署。默认域名：`https://football-mbti-quiz.pages.dev`（可改项目名）。
5. **自定义域名**（可选）：Pages 项目 → **Custom domains** → 添加如 `quiz.example.com`。

#### GitHub Actions（仓库已含 workflow）

在 GitHub **Settings → Secrets → Actions** 配置：

| Secret | 说明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token（Pages Edit 权限） |
| `CLOUDFLARE_ACCOUNT_ID` | 账户 ID |
| `VITE_API_BASE_URL` | 可选，评分 API 地址 |

推送 `main` / `master` 分支后自动部署。

### 方式 B：命令行一次性部署

```bash
npm run build
npx wrangler login
npm run deploy:cloudflare
```

首次需在 Cloudflare 创建 Pages 项目名 `football-mbti-quiz`（与 `wrangler.toml` 一致）。

---

## 三、中国站 — 阿里云 OSS + CDN

### 1. 创建 OSS 存储桶

1. [阿里云 OSS 控制台](https://oss.console.aliyun.com/) → 创建 Bucket。
2. **区域**：有 ICP 备案用大陆节点（如华东）；暂无备案可用 **香港** 节点（仍比单美国源快）。
3. 读写权限：**公共读**（静态网站）。
4. **传输加速** / **CDN 加速域名**：建议开启 CDN。

### 2. 静态网站托管

Bucket → **基础设置** → **静态页面**：

- 默认首页：`index.html`
- 默认 404页：`index.html`（与 `public/_redirects` 作用相同）

### 3. 绑定 CDN 域名

1. 阿里云 CDN → 添加加速域名，源站选该 OSS Bucket。
2. 大陆节点 + 自定义域名通常需要 **ICP 备案**。
3. 配置 HTTPS 证书（阿里云免费证书即可）。

### 4. 上传 dist/

复制 `.env.example` 为 `.env`，填写：

```env
ALIYUN_OSS_REGION=oss-cn-hangzhou
ALIYUN_OSS_BUCKET=your-bucket-name
ALIYUN_OSS_ACCESS_KEY_ID=...
ALIYUN_OSS_ACCESS_KEY_SECRET=...
ALIYUN_OSS_PREFIX=football-dna
```

```bash
npm run build
npm run deploy:china
```

上传后若页面仍是旧版，在 CDN 控制台 **刷新缓存**。

### 腾讯云 COS（替代方案）

流程类似：COS 静态网站 + CDN + `coscli` 或控制台上传 `dist/`。构建产物相同，无需改代码。

---

## 四、推广时分发链接

| 受众 | 链接 |
|------|------|
| 海外社群、Twitter、Reddit | Cloudflare 域名，如 `https://quiz.example.com` |
| 微信、微博、国内社群 | 国内 CDN 域名，如 `https://quiz.example.cn` |

两个链接打开的是**同一套测试**，结果一致。

---

## 五、评分 API（可选）

纯静态部署下，结果页**不会显示**评分区块（未配置 API 时自动隐藏）。

若日后在香港 VPS 部署 `server/rating-api-example.js`：

1. 构建时注入 API 地址：

```bash
VITE_API_BASE_URL=https://api.example.com npm run build
```

2. **国际站与中国站需用同一份带该变量的 build**，或分别构建两次（同一 `VITE_API_BASE_URL`）。
3. API 服务器需配置 CORS 允许两个前端域名。

---

## 六、检查清单

- [ ] `npm run build` 无报错
- [ ] 国际 URL 可打开 intro → 答题 → 结果
- [ ] 中国 URL 同样流程顺畅
- [ ] 静态资源 HTTPS 正常
- [ ] 分享 / 下载卡片功能正常
- [ ] （可选）评分 API + `VITE_API_BASE_URL` 已配置

---

## 七、常用命令

```bash
npm run build              # 构建 dist/
npm run deploy:cloudflare  # 部署到 Cloudflare Pages（CLI）
npm run deploy:china       # 上传到阿里云 OSS
npm run preview            # 本地预览 dist/
```
