# homepage

Chen-Wei Hsiung 的個人網頁。純靜態，無建置流程，無外部相依。

## 檔案

```
index.html          唯一的頁面
assets/styles.css   樣式（深／淺色主題）
assets/main.js      主題切換、捲動顯現、導覽高亮
.nojekyll           讓 GitHub Pages 原樣輸出靜態檔
```

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
- 親職立場：個人 Notion 教育筆記

## 刻意排除的內容

本頁只描述方法論與流程，**不含**：

- 任何淨值、金額、資產配置比例
- 任何個股名稱或持倉部位
- 任何即時市場判讀或投資建議
- 孩子的姓名、暱稱與就讀機構名稱

修改內容直接編輯 `index.html`；全部文字都是硬編碼的，沒有資料層。
