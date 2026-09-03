# homepage

Chen-Wei Hsiung 的個人網頁。純靜態，無建置流程，無外部相依。

## 檔案

```
index.html          首頁
assets/styles.css   樣式（深／淺色主題）
assets/main.js      主題切換、捲動顯現、導覽高亮
atlas/index.html    互動版瓶頸圖譜（子頁）
atlas/data.js       圖譜資料層：瓶頸節點、信用流、分子側機制、threads、公開讀數
atlas/atlas.js      力導向圖、流向圖、儀表板、側欄與路由（無外部相依）
atlas/atlas.css     圖譜樣式（沿用主站色彩代號）
.nojekyll           讓 GitHub Pages 原樣輸出靜態檔
```

## 瓶頸圖譜（atlas/）

五個視圖，網址以 hash 定位（例如 `atlas/#graph/transformer`、`atlas/#flow/p_pc`）：

- **圖譜**：信用流 → 融資管道 → 承載者 → 物理瓶頸 → thread 的力導向圖，可縮放、搜尋、依類型篩選。
- **分子端信用流向**：DOC-9 的管道地圖、六段傳導鏈、五種接錯節點、可抵押性分界、救援閘門。
- **目前的瓶頸**：Tier 1/2/3 儀表板、瓶頸遷移接力、雙邊交期差偵測器、碰撞矩陣、系統自身的量測瓶頸。
- **Threads**：DOC-8 登記簿，每條線一列。
- **來源**：Notion 章節對照與公開資料連結。

每個節點分開標示「Notion 讀數（含裁決日期）」與「公開讀數（含來源與日期）」，兩者互不覆寫。
更新方式：直接編輯 `atlas/data.js`；資料截止日在檔頭 `asOf` 欄。

## 本機預覽

直接開 `index.html` 即可，或起一個簡單伺服器：

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## 部署到 GitHub Pages

Settings → Pages → Source 選 **Deploy from a branch**，
分支選要發布的分支、資料夾選 `/ (root)`。

## 內容來源

- 職涯與學歷：LinkedIn 個人檔案
- 方法論、世界模型、決策協議、認識論紀律：個人 Notion 知識庫「投資系統 3.0」
- 瓶頸圖譜：同一知識庫的 DOC-3（物理瓶頸圖譜）、DOC-9（分子側機制圖譜）、DOC-8（Thread Digest Index），加上 2026-09 檢索的公開資料（交期、產能、價格、發債量）
- 親職立場：個人 Notion 教育筆記

## 刻意排除的內容

本頁只描述方法論與流程，**不含**：

- 任何淨值、金額、資產配置比例
- 任何持倉部位、部位比例、股數與金額（圖譜中出現的公司只作為公開的瓶頸控制者，不代表持有）
- 任何即時市場判讀或投資建議
- 孩子的姓名、暱稱與就讀機構名稱

首頁內容直接編輯 `index.html`，全部文字硬編碼；圖譜內容編輯 `atlas/data.js`。
