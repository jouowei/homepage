/* 瓶頸圖譜資料層。
   來源：個人 Notion 知識庫「投資系統 3.0」之 DOC-3（物理瓶頸圖譜）、
   DOC-9（分子側機制圖譜）、DOC-8（Thread Digest Index），
   再以 2026-09-03 的公開資料補上最新讀數。
   刻意排除：任何持倉、部位比例、金額、進場價位與買賣動作。 */
window.ATLAS = {
  asOf: '2026-09-03',
  notionAsOf: { doc3: '2026-08-28', doc9: '2026-09-01', doc8: '2026-09-03' },

  /* ───────────── 信用流（分子側的來源，DOC-3 §1） ───────────── */
  flows: [
    { id: 'f_ai', name: 'AI 基建', driver: 'Hyperscaler 資本支出軍備競賽', scale: '約 $725B/yr（2026，四大雲端商合計，較 2025 +77%）',
      note: 'Notion §1 表原載 ~$700B/yr（v3.1），2026-07-26 標記為方向性低估；公開資料顯示四家 2026 指引合計約 $725B。',
      reading: { text: 'Amazon ~$200-220B、Google $195-205B、Meta $130-145B、Microsoft $110-120B；MSFT 指引 Q1 FY27 單季 >$50B。', date: '2026-08', source: 'valueaddvc / CNBC / 各公司法說', url: 'https://valueaddvc.com/ai-spending' } },
    { id: 'f_def', name: '再軍備', driver: 'NATO 2% + 歐洲再武裝 + NDAA', scale: '約 $1.2T/yr（v3.1 讀數，2026-05）', note: '距今 >80 天未重驗，Notion 自標 [STALE DATA]。' },
    { id: 'f_energy', name: '能源轉型', driver: 'IRA + EU Green Deal + 碳稅', scale: '約 $500B/yr（v3.1）', note: '[STALE DATA]' },
    { id: 'f_reind', name: '再工業化', driver: 'CHIPS Act + onshoring', scale: '約 $200B/yr（v3.1）', note: '[STALE DATA]' },
    { id: 'f_aging', name: '人口老化', driver: '嬰兒潮退休 + GLP-1 + 醫療', scale: '持續加速（未量化）', note: '2026-08-27 於 G-Sweep 第二軸判「關掉」：付款人是制度，制度既是需求保證也是價格天花板。' },
    { id: 'f_sov', name: '主權 AI 基建', driver: '國家安全／技術主權 → 政府補貼 + 主權基金直投', scale: '約 $100-115B/yr（2026-05 新增）',
      note: '與 AI 基建撞同一組瓶頸（EUV／先進製程／電力），但不受 ROI 殺開關控制：政治不可撤回。韓國 K-Belt、日本 Rapidus、歐盟、沙特／UAE。' },
    { id: 'f_law', name: '法定強制需求', driver: '需求由法律創造、由私部門付費（環保合規、廢棄物、強制投保、消防、檢驗認證）', scale: '未量化（2026-08-28 立欄）',
      note: '信用源是「法律強制力」而非任何買家的預算：不縮減、不延後，但也不成長。⑦ 欄五格目前零覆蓋。' }
  ],

  /* ───────────── 瓶頸層（DOC-3 §1–§5 碰撞矩陣的列） ───────────── */
  layers: [
    { id: 'L1', name: '§1 能量 / 電力', short: '能量' },
    { id: 'L2', name: '§2 關鍵材料與礦物', short: '材料' },
    { id: 'L3', name: '§3 製造產能', short: '製造' },
    { id: 'L4', name: '§4 傳輸與互連', short: '傳輸' },
    { id: 'L5', name: '§5 人力與時間', short: '人力' }
  ],

  /* 碰撞矩陣 §1.1（🔴=3+ 條信用流、🟡=2、🟢=1；✅已覆蓋 ⚠️部分 ❌缺口）。
     符號讀作「碰撞流數」而非「當前緊缺度」（2026-07-26 裁決）。 */
  matrix: {
    cols: ['主權 AI', 'AI 基建', '再軍備', '能源轉型', '再工業化', '人口老化', '法定強制需求 ⑦'],
    rows: [
      { layer: 'L1', cells: ['🟡 新 fab 電力 ❌', '🔴 DC 電力 ✅', '🟡 海軍 ⚠️', '🔴 電網 ⚠️', '🟡 工廠 ❌', '🟢 醫療 ❌', '🟢 掩埋場沼氣發電 ❌'] },
      { layer: 'L2', cells: ['🟡 特氣/化學品 ❌', '🔴 銅/光纖 ❌', '🔴 鈦/稀土 ❌', '🔴 鈾/鋰 ❌', '🟡 鋼/水泥 ❌', '🟢 同位素 ❌', '🟢 危廢處理資格 ❌'] },
      { layer: 'L3', cells: ['🔴 EUV/製程設備 ⚠️', '🔴 CoWoS ✅', '🟡 船塗 ❌', '🟡 變壓器 ✅', '🔴 廠建 ⚠️', '🟡 CDMO ❌', '🟡 收運車隊/掩埋場土地 ❌'] },
      { layer: 'L4', cells: ['🟢 出口管制 ❌', '🟡 CPO/AEC ✅', '🟢 軍事 ❌', '🟡 HVDC ⚠️', '🟢 供應鏈 ❌', '⚪ 冷鏈 ❌', '🟢 市政特許權 ❌'] },
      { layer: 'L5', cells: ['🟡 先進製程工程師 ❌', '🟢 AI 工程 ❌', '🟡 核工 ❌', '🟢 電工 ❌', '🟡 技工 ❌', '🔴 護理 ❌', '🟢 持照操作員 ❌'] }
    ],
    note: '第 ⑦ 欄為 2026-08-28 文字登記，矩陣本體尚未插欄（期限 2026-09-30）。'
  },

  /* ───────────── 分母側：物理瓶頸節點 ───────────── */
  bottlenecks: [
    /* Tier 1：多重碰撞 + 長時鐘（每週盯） */
    { id: 'euv', name: 'EUV / 先進製程設備', layer: 'L3', tier: 1, rank: 1, flows: ['f_sov', 'f_ai', 'f_reind'],
      collision: '🔴 五方爭搶（日／韓／美／台主權計畫 + Hyperscaler）ASML 低 NA EUV 年出貨硬上限', clock: '🟢 >7 年', wave: 'W2',
      durability: 4.3, sde: '◼ 穩固',
      desc: '壟斷者 ASML（獨家）。追趕者上海微電子 + 華為系 LDP 光源原型，目標 2028；CSIS 評估差距未實質縮小。主權投資不具價格彈性（政治任務不砍單），先被擠出的是企業客戶，設備層剛性反而強化。',
      controllers: [
        { name: 'ASML', role: 'EUV 微影機（獨佔）', share: '100%' },
        { name: 'Lasertec', role: 'EUV 光罩檢測（獨佔）', share: '—' },
        { name: 'KLA', role: '製程檢測', share: '雙寡佔' },
        { name: '信越化學 / TOK', role: 'EUV 光阻', share: '~95%' },
        { name: 'Tokyo Electron', role: '塗佈／蝕刻', share: '—' }
      ],
      notionReading: { text: 'ASML 2026 低 NA EUV 出貨上限 60 台（ASML CFO，Tier 1）；五方爭搶碰撞確認。', date: '2026-07-16' },
      publicReading: { text: 'ASML Q2 2026：淨銷售 €9.3B、毛利 54%；2026 EUV 出貨規劃約 65 台低 NA（EUV 業務 +45%），全年營收指引上修至 €43-45B。', date: '2026-07-15', source: 'ASML Q2 2026 results / Investing.com transcript', url: 'https://www.asml.com/en/news/press-releases/2026/q2-2026-financial-results' },
      triggers: ['2027 若中國國產 EUV 出現商業 fab trial wafer → 時鐘降 🟡'],
      threads: ['t_decouple', 't_tollbooth', 't_relay'], notion: 'DOC-3 §0.0 Tier1 #1、§6.3 EUV、EUV 生態系 Layer B' },

    { id: 'cowos', name: 'CoWoS 先進封裝', layer: 'L3', tier: 1, rank: 2, flows: ['f_ai', 'f_sov'],
      collision: '🔴 sold-out + NVDA×AVGO 雙買方爭搶（§1.3）', clock: '🟡 4-6 年', wave: 'W2', durability: 4.6, sde: '◼ 穩固',
      desc: 'TSMC >90%。系統裡研究最深的賽道。追趕者 SMIC + JCET + 通富微電；2024/12 出口管制新增封裝設備。TSMC 主動扶植 5-8 家本土濕製程設備廠，屬控制者親手擴大供給基盤（稀釋訊號 🟡）。非 TSMC OSAT（ASE/SPIL/Amkor）2027 底約 8 萬片／月；矽品雲林新廠 2028 啟用，尚未跨越「長約綁定或繞過分配」的重驗觸發線。',
      controllers: [
        { name: 'TSMC', role: 'CoWoS 唯一源', share: '>90%' },
        { name: 'Disco', role: '研磨／切割（路線免疫）', share: '—' },
        { name: 'TOWA', role: 'HBM 壓縮成型（W2W 混合鍵合會繞過）', share: '~100% HBM 成型' },
        { name: '弘塑 / 辛耘', role: 'CoWoS 濕製程設備', share: '50-60% / 30-40%' },
        { name: 'ASE (日月光/矽品) / Amkor', role: 'OSAT 委外承接', share: '2027 底 ~8 萬片/月' }
      ],
      notionReading: { text: 'CoWoS 交期 52-78 週且售罄；2026 底 ~140k wpm；缺口 20%→10%（TrendForce 6/15，單源 [SOURCE_ECHO]，降 watch-only）。', date: '2026-08-17' },
      publicReading: { text: 'TSMC 三座先進封裝後段廠 sold out 至 2027，交期 52-78 週；2026 底目標 125-140k wpm，2027 傳出至少 200k；NVIDIA 約占 60% 產能。', date: '2026-07-10', source: 'Digitimes / TrendForce / Silicon Analysts', url: 'https://www.digitimes.com/news/a20260710PD226/tsmc-cowos-2027-packaging-capacity.html' },
      threads: ['t_decouple', 't_relay', 't_kyber', 't_airoi'], notion: 'DOC-3 §0.0 Tier1 #2、§6.3 CoWoS、Layer B 2026-08-17 註記' },

    { id: 'hbm', name: 'HBM / 記憶體牆', layer: 'L3', tier: 1, rank: 2, flows: ['f_ai', 'f_sov'],
      collision: '🔴 Stargate 鎖單 + 雙買方', clock: '🟡 3-5 年', wave: 'W2', durability: 4.2, sde: '◻↑ 侵蝕 watch（週期型 3 年上行，非永久壟斷）',
      desc: '瓶頸遷移接力的第三棒（2024-25）。真收費站在 NAND/DRAM 原廠；下游獨立 SSD 控制器層是溫度計（騎短缺紅利）。追趕者 CXMT HBM3 時程滑落，2026 量產無望；華為自研 HBM 為平行路線。Samsung HBM4 已通過 NVIDIA 認證（名稱層威脅，非寡頭解體）。',
      controllers: [
        { name: 'SK hynix', role: 'HBM 龍頭', share: '~50-62%' },
        { name: 'Micron', role: 'HBM #2（超越 Samsung）', share: '~21%' },
        { name: 'Samsung', role: 'HBM #3，HBM4 已認證', share: '—' },
        { name: 'Advantest', role: 'HBM 測試機（相鄰收費站）', share: '—' }
      ],
      notionReading: { text: 'HBM 三家 2026 全數售罄；SK hynix 拆長約價格上限；DRAM like-for-like +250-300%（GS Exhibit 9，Tier 3）。', date: '2026-08-17' },
      publicReading: { text: 'SK hynix、Micron 2026 HBM 全數售罄；三家 2027 DRAM/HBM 產能亦已售罄，客戶僅拿到需求量的 60-70%；HBM4 2026-02 量產，新產能 2027 才有感。', date: '2026-08', source: 'Introl / Notebookcheck / Mark LaPedus', url: 'https://introl.com/blog/south-korea-hbm4-stargate-memory-supercycle-2026' },
      threads: ['t_memory', 't_relay', 't_kyber'], notion: 'DOC-3 §6.3 HBM、DRAM/HBM/SOCAMM Layer B、瓶頸節點動態表「第二棒 記憶體牆」' },

    { id: 'abf', name: 'ABF 載板 / 玻纖布 / 銅箔', layer: 'L2', tier: 1, rank: 2, flows: ['f_ai'],
      collision: '🔴（7/16 升級）漲價 30%、缺口延至 2027、三年上行週期', clock: '🟡 3-5 年', wave: 'W2', durability: 3.6, sde: '◼ 穩固',
      desc: 'organic 基板化學三大單一供應商 >80%：ABF 介電膜、高端 HVLP4 銅箔、Low-Dk/T-glass 玻纖布。載板本體為 Ibiden/Shinko/欣興/南電寡佔。玻璃芯是 ABF 的 D-Bypass 繼任者（2028-29 量產）。建廠 2-3 年大於設備交期，比後段設備更剛性。',
      controllers: [
        { name: 'Ajinomoto Fine-Techno', role: 'ABF 介電膜', share: '~80-95%' },
        { name: 'Mitsui Kinzoku', role: 'HVLP4+ 高端銅箔', share: '>80%' },
        { name: 'Nittobo', role: 'Low-CTE T-glass 玻纖布', share: '~80%（頂級唯一）' },
        { name: 'Ibiden / Shinko / 欣興 / 南電', role: 'ABF 載板', share: '日系 >80%' },
        { name: '台光電', role: 'M8/M9 CCL', share: 'Vera Rubin 平台 100%' }
      ],
      notionReading: { text: 'Ajinomoto ABF 膜漲價 30%、供給缺口延至 2027（DigiTimes 4/8、5/20）；ABF +30-35%、CCL +35-40%、T-glass +20-30%（GS Exhibit 9，6 月）。', date: '2026-07-16' },
      threads: ['t_abf', 't_glass', 't_cpo', 't_relay'], notion: 'DOC-3 §6.3 ABF、ABF/FC-BGA Layer B、HVLP4 Layer B' },

    { id: 'transformer', name: '變壓器 / 電網設備 / GOES', layer: 'L1', tier: 1, rank: 3, flows: ['f_ai', 'f_energy', 'f_reind', 'f_def'],
      collision: '🔴🔴 唯一雙紅（AI + 能源轉型；再工業化與再軍備疊加）', clock: '🟡 3-5 年', wave: 'W2', durability: 5.0, sde: '◼ 穩固',
      desc: '無單一壟斷，但全球僅數家 GOES 電工鋼廠 + 手工繞線工藝；美國 80% 高壓變壓器靠進口，CLF 為全美唯一 GOES 生產商。最硬層的純玩家不在中國（不可及）就在韓國（不可交易）[OVERSMOOTH]。侵蝕向量：非晶鐵芯、固態變壓器 SST，皆慢。新產能 2027 投產（Eaton SC / Siemens NC / Hitachi VA；HD Hyundai AL 2026 擴 30%）。',
      controllers: [
        { name: 'Hitachi Energy', role: 'LPT 全球龍頭', share: '寡佔' },
        { name: 'GE Vernova / Prolec', role: 'LPT', share: '寡佔' },
        { name: 'Siemens Energy', role: 'LPT + 燃機', share: '寡佔' },
        { name: 'Mitsubishi Electric', role: 'LPT', share: '寡佔' },
        { name: 'Hyundai Electric / Hyosung', role: 'LPT（猛擴美國出口）', share: '韓，不可交易' },
        { name: 'Baowu / Shougang', role: 'GOES 電工鋼（產能最大）', share: '中，不可及' },
        { name: 'Nippon Steel / JFE / POSCO', role: 'GOES', share: '~15-18% / 寡佔' },
        { name: 'Cleveland-Cliffs', role: 'GOES 美國唯一', share: '區域壟斷' }
      ],
      notionReading: { text: '高壓變壓器交期 3 年→4 年（~208 週）；全美約半數 DC 建案因電力設備延遲；W3 反向確認閾值「交期 <80 週」遠未觸發。乙腿（變壓器）當期可比交期序列在遷移線內登記為無讀數 [RELAY_LEG_B_NOREAD]。', date: '2026-08-28' },
      publicReading: { text: '大型電力變壓器交期平均 128 週、發電機升壓變壓器 144 週（Wood Mackenzie Q2 2025 調查）；2026 年變電站級變壓器交期已逾 160 週；典型 LPT 3-5 年，部分 4 年。2026 排定上線的 ~12GW 美國 DC 僅約三分之一在建，變壓器/開關/電池短缺為主因（Bloomberg）。', date: '2026-08', source: 'Industrial Sage / POWER Magazine / EnkiAI', url: 'https://www.industrialsage.com/power-transformer-lead-times-us-grid-shortage/' },
      triggers: ['全球變壓器交期 <80 週 = 確認 Wave 3（2027 Q4 證偽期限）'],
      threads: ['t_800v', 't_relay', 't_tollbooth', 't_twetf'], notion: 'DOC-3 §0.0 Tier1 #3、§6.3 電網變壓器、電力設備 Layer B 2026-07-13' },

    { id: 'uranium', name: '鈾 / 核電執照 / HALEU', layer: 'L2', tier: 1, rank: 4, flows: ['f_energy', 'f_ai', 'f_def'],
      collision: '🟡→🔴 CONFIRMED（term 市場主導）', clock: '🟢 >7-10 年', wave: 'W2', sde: '◼ 穩固（制度分量軟化中）',
      desc: '地質 + 制度雙重瓶頸：新鈾礦 7-10 年、核電廠 10-15 年。接力第三棒「核燃料 SWU」。制度剛性首現軟化（NRC 史上最快 license renewal、新反應爐審批流程）→ Regulatory 分量降權，Alpha 重心移向物理段（長交期設備／燃料／HALEU）。HALEU 仍是 SMR 瓶頸中的瓶頸（Centrus 擴產、DOE 濃縮授標、DOE Paducah 4.6GW 2032）。',
      controllers: [
        { name: 'Kazatomprom', role: '鈾礦', share: '~25%' },
        { name: 'Cameco', role: '鈾礦', share: '~15%' },
        { name: 'Tenex / TVEL (俄)', role: '濃縮', share: '壟斷級' },
        { name: 'Urenco / Orano / Centrus', role: '西方濃縮 / HALEU', share: '—' },
        { name: 'BWXT', role: 'NNSA HEU 唯一來源、SMR', share: '獨源' }
      ],
      notionReading: { text: '2026/1 spot 見頂 $101.41 → Q2 回落 $84-87；term $94（2008 以來新高）；Kazatomprom 下調 2026 產量（硫酸約束）；Goldman 累計缺口 19.1 億磅。', date: '2026-07-16' },
      publicReading: { text: '現貨約 $90.39/lb（2026-08 底）；長期合約價 $97.00/lb（2026-07-01，歷史新高）。', date: '2026-08-31', source: 'carboncredits.com / TradeTech', url: 'https://carboncredits.com/uranium-prices-today/' },
      triggers: ['鈾現貨 >$100/lb（持續監控）'],
      threads: ['t_relay'], notion: 'DOC-3 §0.0 Tier1 #4、§6.3 鈾燃料 / 核電執照、核燃料濃縮 HALEU Layer B' },

    { id: 'copper', name: '銅', layer: 'L2', tier: 1, rank: 5, flows: ['f_ai', 'f_def', 'f_energy', 'f_reind'],
      collision: '🔴→🟡（7/16 降級：Goldman 2026 小過剩 160kt，結構缺口延至 2029+）；四流仍撞，流數未變', clock: '🟢 >7 年（地質性）', wave: '—',
      desc: '無單一壟斷，瓶頸是地質性的：新銅礦從勘探到投產 10-15 年。碰撞可以雙向（銅是儀表板唯一反向 delta），每季驗證不做單向外推。',
      controllers: [{ name: '（無單一控制者）', role: 'FCX / SCCO 等礦商', share: '—' }],
      notionReading: { text: 'LME 紀錄 $11,771/t（2025/12/8）；2026 區間 $10-11k；2035 目標 $15,000/t（Goldman）。觸發「>$12,000/t + LME 庫存 <150kt」未觸發。', date: '2026-07-16' },
      threads: ['t_relay'], notion: 'DOC-3 §0.0 Tier1 #5、§6.3 銅' },

    /* Tier 2：升溫中（月度盯） */
    { id: 'helium', name: '氦氣', layer: 'L2', tier: 2, rank: 6, flows: ['f_ai', 'f_sov'],
      collision: '🔴 已實現（3 月伊朗戰爭切斷 Qatar，fab 配給中）', clock: '🟢 5 年+', wave: '—',
      desc: 'Qatar Ras Laffan 約全球 30-38% 氦產能，無 Hormuz 以外物流線；美國 BLM 儲備耗竭；俄 Amur 延遲。氦佔晶片成本 <0.04%，傷的是供給節奏不是成本。無直接可投資收費站標的。',
      controllers: [{ name: 'QatarEnergy', role: 'Ras Laffan 氦', share: '30-38% 全球' }, { name: 'Air Liquide / Linde / Air Products', role: '分銷', share: '—' }],
      notionReading: { text: '「6-7 月臨界」提前於 3 月實現；fab 端進入配給；業界庫存緩衝 <1 至 6 個月。', date: '2026-07-16' },
      publicReading: { text: '2026-03-02 QatarEnergy 於 Ras Laffan 宣告不可抗力；部分客戶僅拿到正常量一半；韓國 fab 約 6 個月庫存；現貨價已翻倍；QatarEnergy 稱全產能恢復需 3-5 年。', date: '2026-06', source: 'IUMI / Gowling WLG / WestAir', url: 'https://iumi.com/newsletter-june-2026/qatari-helium-shortages/' },
      threads: ['t_hormuz'], notion: 'DOC-3 §0.0 Tier2 #6、§6.3 氦氣' },

    { id: 'cpo', name: 'CPO / 光通訊', layer: 'L4', tier: 2, rank: 7, flows: ['f_ai'],
      collision: 'L1 YELLOW；CPO 量產 = 相變觸發', clock: '2027 Q2 遷移裁判', wave: 'W2', durability: 3.6, sde: '◻↑ 上行中',
      desc: '第四棒分岔候選。chip-chip 光互連結構遷移，CCL 載板瓶頸。Spectrum-X CPO 已開始出貨（2027-28 放量）。',
      controllers: [
        { name: 'Lumentum / Coherent', role: 'InP EML / 6 吋 InP EPI', share: '~70% 雙寡佔' },
        { name: 'Soitec', role: 'Photonics-SOI 晶圓', share: '95%+' },
        { name: 'Fujikura', role: '光纖融著機', share: '~50%+' },
        { name: 'Credo', role: 'AEC DSP', share: '~80%' },
        { name: 'Broadcom', role: 'CPO 交換晶片', share: '—' }
      ],
      threads: ['t_cpo', 't_3081', 't_relay'], notion: 'DOC-3 §0.0 Tier2 #7、CPO 光通訊 Layer B' },

    { id: 'hdd', name: 'HDD nearline 雙寡佔', layer: 'L3', tier: 2, rank: 8, flows: ['f_ai'],
      collision: 'AI 冷數據需求', clock: '—', wave: 'W2',
      desc: 'AI 訓練集與推論日誌的冷數據層。HDD helium BOM 為物質性獨佔錨。',
      controllers: [{ name: 'Seagate / Western Digital', role: 'nearline HDD', share: '雙寡佔' }],
      threads: [], notion: 'DOC-3 §0.0 Tier2 #8、HDD nearline Layer B' },

    { id: 'gasturbine', name: '燃氣渦輪 OEM 與熱段鑄鍛件', layer: 'L1', tier: 2, rank: 9, flows: ['f_ai', 'f_energy'],
      collision: '🟡→🔴 實質售罄（BofA：大型燃機賣到 2030）', clock: '供給回應鐘 2028-31', wave: 'W2',
      desc: '三家 OEM（GEV / Siemens Energy / MHI）共用同一組上游：熱段單晶葉片鑄造（Howmet + PCC ~70-80%，正在解封，時鐘 3-5 年）與大型轉子一體鍛件（JSW 等，無解封證據）。部分大型機組已在沒有轉子或葉片的情況下出廠，現場後裝。OEM 對新上游產能的認證週期 18-24 個月不可壓縮。遷移偵測器的「甲腿」。',
      controllers: [
        { name: 'GE Vernova', role: '燃氣輪機 OEM', share: '三寡佔' },
        { name: 'Siemens Energy', role: '燃氣輪機 OEM', share: '三寡佔' },
        { name: 'Mitsubishi Heavy Industries', role: '燃氣輪機 OEM', share: '三寡佔' },
        { name: 'Howmet / Precision Castparts', role: '熱段單晶葉片鑄造', share: '~70-80%' },
        { name: 'Japan Steel Works', role: '大型轉子鍛件（單源指認，未驗）', share: '[UNVERIFIED]' }
      ],
      notionReading: { text: '甲腿交期三時點：2029（2025-12）→ 2030（2026-04）→ 2031（2026-07-22 Q2）：方向為延長。產能 20GW(\'26)→24(\'28)→30(\'30)。', date: '2026-08-24' },
      publicReading: { text: 'GE Vernova Q2 2026 燃機 backlog 116GW（53GW 設備 + 63GW 付費 slot 預約），2031 年產能格子預計年底前簽掉過半，年底合約量 ≥125GW。', date: '2026-07-22', source: 'Utility Dive / GE Vernova 8-K', url: 'https://www.utilitydive.com/news/ge-vernova-gas-turbine-backlog-climbs-to-116-gw/826039/' },
      threads: ['t_800v', 't_relay'], notion: 'DOC-3 §0.0 Tier2 #9、燃氣渦輪 Layer B、電力設備 Layer B 2026-07-24 熱段鑄鍛件層' },

    { id: 'hvdc800', name: '800V HVDC / SiC 配電', layer: 'L1', tier: 2, rank: 10, flows: ['f_ai'],
      collision: 'DOC-6 #1 畢業承接', clock: '—', wave: 'W2',
      desc: '800V DC 物理正確且不可逆，但真收費站不在 SiC/GaN device 層（NVIDIA 刻意建 14+ 可互換矽供應商 = 溫度計），已遷移至電網／能源層。標準分岔已實現：OCP Mt. Diablo ±400V（Google/Meta/Microsoft/Amazon）vs NVIDIA MGX 單極 800V。判準：凡規格隨陣營或電壓改變者為溫度計；兩陣營都要且與電壓無關者為候選收費站（合格化與責任、熱與液冷、毫秒暫態儲能、併網與發電）。閘門不在矽、不在銅，在紙：800VDC 尚無 UL 認證。',
      controllers: [
        { name: '（device 層 14+ 供應商）', role: 'SiC/GaN 功率元件', share: '溫度計' },
        { name: 'Wolfspeed / Coherent / SICC', role: 'SiC 基板（侵蝕中）', share: '—' },
        { name: 'UL Solutions / NFPA / IEEE / IEC', role: '合格化與責任（無股票）', share: '—' },
        { name: 'ABB / Schneider / Siemens / Hitachi Energy', role: '中壓 / 固態變壓器（在位者）', share: '—' }
      ],
      threads: ['t_800v', 't_relay'], notion: 'DOC-3 §0.0 Tier2 #10、800V HVDC Layer B、DOC-8 800V thread 2026-08-17' },

    { id: 'power', name: '電力 / 資料中心併網', layer: 'L1', tier: 1, rank: 0, flows: ['f_ai', 'f_sov', 'f_energy', 'f_reind'],
      collision: '🔴 DC 電力（§1×AI 基建）', clock: '併網佇列 4-5 年', wave: 'W2', durability: 5.0, sde: '◼ 穩固（merchant 租金段 Regulatory ◻↓）',
      desc: '收費站耐久度指數 #1（5.0）。第一棒（2025-26）：瓶頸自晶片遷移至電力（powered-MW 牆）。政治天花板分層：賣鏟子（電網設備）最高、BTM 自供（核 PPA/廠址燃氣/SMR）高、受監管公用事業中、merchant 發電最低（電價暴衝 → 民意反彈 → 成本分攤改革）。電力量測鏈三支儀表（併網佇列中位數／變壓器交期／已宣布 MW 之 COD 達成率）在系統內至 2026-08-26 為零讀數，2026-09-02 首筆 COD 讀數已寫入。',
      controllers: [
        { name: 'Constellation / Vistra', role: '核電 / 發電（PPA）', share: '—' },
        { name: 'Quanta / Eaton', role: '電力工程 / 設備', share: '—' },
        { name: 'PJM / ERCOT', role: '併網閘門（制度）', share: '—' }
      ],
      notionReading: { text: '全美約半數 DC 建案延遲／取消；併網佇列 4-5 年；電網每年可併入 DC 新產能上限約 7.1GW。腿(a) 首筆 COD 讀數：Goldman on-time 72%→50%、Sightline 16GW→5GW。', date: '2026-09-02' },
      publicReading: { text: '美國併網佇列 2,600GW（超過既有裝置容量兩倍）；達商轉中位數約 5 年，DC 專案延遲 24-72 個月；ERCOT 大負載佇列 410GW 中 87% 為資料中心；2026 年 30-50% 的 DC 站點面臨延遲或取消。', date: '2026-08', source: 'EnkiAI / RMI / Verse', url: 'https://rmi.org/resources/interconnection-reform-ai-data-centers-generator-queues/' },
      threads: ['t_800v', 't_relay', 't_tollbooth', 't_airoi', 't_twetf'], notion: 'DOC-3 §0.5 脊柱、耐久度指數 #1、Layer B/§0.0 電力收費站更新 2026-07-09' },

    /* Tier 3：紅色碰撞但零覆蓋（盲區） */
    { id: 'rareearth', name: '稀土 / 鈦 / 鎵 / 鍺（反向收費站）', layer: 'L2', tier: 3, rank: 11, flows: ['f_def', 'f_ai', 'f_energy'],
      collision: '🔴❌ §2×再軍備；稀土出口禁令 = 即時觸發', clock: '🟢 >7 年（非中國全鏈重建）', wave: '—',
      desc: '中國控制關鍵材料加工（稀土 91% 精煉 / 94% 磁體、鎵、鍺、石墨、鎢、銻）= 反向收費站：下游西方國防與 EV 是受威脅方，非受益方。管制擴大至 NdFeB 磁體；一年後瓶頸 2026 持續。',
      controllers: [{ name: '中國（國家）', role: '稀土分離 / 磁體', share: '~91% / ~94%' }, { name: 'MP Materials / Lynas', role: '非中國礦與分離', share: '—' }],
      threads: ['t_capflow'], notion: 'DOC-3 §0.0 Tier3、§6.3 稀土/磁體、反向收費站 Layer B 2026-07-18' },

    { id: 'hvcable', name: '高壓電纜 / HVDC 長距輸電', layer: 'L4', tier: 3, rank: 12, flows: ['f_energy', 'f_ai'],
      collision: '🔴 CONFIRMED（§4×能源轉型 ⚠️）', clock: '🟡 3-5 年', wave: 'W2',
      desc: '海底電纜製造 backlog 12 年+，三家歐企控 75% HVDC，交期翻倍（>800 天），CLV 鋪纜船 2026 後零新造，HVDC 高純銅冶煉浮現為上游約束。歐洲交易所標的為主。',
      controllers: [{ name: 'Prysmian / Nexans / NKT', role: 'HVDC 電纜', share: '~75%' }, { name: 'Fujikura', role: '日股替代候選', share: '—' }],
      threads: [], notion: 'DOC-3 §0.0 Tier3、§6.3 高壓電纜、整合瓶頸 DB BN-048' },

    { id: 'fertilizer', name: '肥料 / 硫酸', layer: 'L2', tier: 3, rank: 13, flows: ['f_aging', 'f_energy'],
      collision: '🔴 強化（Hormuz 切斷中東肥料出口）', clock: '🟡 3-5 年', wave: '—',
      desc: '硫酸為 DOC-3 最大盲區之一。World Bank（6/23）：若中斷持續，2026 肥料價格漲幅可 >30%；全球肥料指數 3 月起 +12%。缺乏壟斷者，無可投資收費站。',
      controllers: [{ name: '（無壟斷者）', role: '—', share: '—' }],
      threads: ['t_hormuz'], notion: 'DOC-3 §0.0 Tier3、§6.3 肥料/硫酸' },

    { id: 'nursing', name: '護理人力', layer: 'L5', tier: 3, rank: 14, flows: ['f_aging'],
      collision: '🔴❌ §5×老化', clock: '時間常數最長', wave: '—',
      desc: '人力型瓶頸：訓練週期 + 制度執照。人口老化流 2026-08-27 已於 G-Sweep 關掉（付款人是制度），本節點維持盲區登記。',
      controllers: [], threads: [], notion: 'DOC-3 §0.0 Tier3、§5 人力與時間' },

    { id: 'specialtygas', name: '特氣 / 廠務化學品', layer: 'L2', tier: 3, rank: 15, flows: ['f_sov', 'f_ai'],
      collision: '❌ §2×主權 AI', clock: '政策可逆（中國鎢出口管制）', wave: '—',
      desc: '廠務「工程」已覆蓋、「耗材」層（特氣、濕化學品、CMP slurry、過濾）整格缺口。WF₆ 六氟化鎢 Layer B 已建：控制者為中／韓（不可交易），軸為中國鎢出口管制，非耐久 moat。',
      controllers: [{ name: 'Entegris / Resonac / Cabot', role: '先進材料 / 過濾 / CMP slurry（候選）', share: '—' }, { name: 'SK Specialty / Foosung / CSSC', role: 'WF₆ 特氣', share: '不可交易' }],
      threads: [], notion: 'DOC-3 §0.5 三個真空白 ③、WF₆ Layer B' },

    /* 其他關鍵節點（來自耐久度指數、追趕時鐘、遷移接力） */
    { id: 'glasscore', name: '玻璃芯載板（ABF 繼任者）', layer: 'L2', tier: 0, flows: ['f_ai'],
      collision: 'D-Bypass 繼任', clock: '2028-29 量產', wave: 'W1',
      desc: '玻璃芯最硬收費站 = 玻璃材料三雄（>90%）+ 金屬化（MEC/JCU），非 TGV 設備（競爭性題材）。2028-29 為接力棒的遠端節點。',
      controllers: [{ name: 'Corning / Schott / AGC', role: '玻璃材料', share: '>90%' }, { name: 'MEC / JCU', role: '金屬化', share: '—' }],
      threads: ['t_glass', 't_relay'], notion: '玻璃芯載板上游 Layer B 2026-07-06' },

    { id: 'hvlp4', name: 'HVLP4 高端銅箔', layer: 'L2', tier: 0, flows: ['f_ai'],
      collision: '短時鐘 × 熱碰撞並存', clock: '🔴 <3 年（條件性；系統唯一 🔴）', wave: 'W1→W2', sde: '◻ Temporal 侵蝕 watch',
      desc: 'Mitsui HVLP4+ >80%，訂單排至 2027H2。Defu 收購 Circuit Foil Luxembourg 被盧森堡 FDI 審查否決（2026-01-08）→ 中國最快追趕路徑切斷，須有機追趕，最早 2027-28。中媒稱銅冠/德福 HVLP4 量產（Tier 3-4）與 Hunter「僅 CCL 認證/試板」衝突：Tier 高者優先，前提暫存活。世代跑步機：前沿已移 HVLP5（Rubin）。',
      controllers: [{ name: 'Mitsui Kinzoku', role: 'HVLP4/5', share: '>80%' }, { name: '銅冠 / 德福 / 諾德 / 嘉元', role: '追趕者', share: '—' }],
      threads: ['t_capflow'], notion: 'DOC-3 §6.3 HVLP4、HVLP4 Layer B 2026-06-20' },

    { id: 'mlcc', name: '伺服器級 MLCC', layer: 'L3', tier: 0, flows: ['f_ai'],
      collision: 'AI server 單機用量數量級跳升', clock: '—', wave: 'W2',
      desc: '泛 MLCC 是「無處不在 ≠ 收費站」的陷阱（耐久度 2.7），但高容值伺服器級 MLCC 為日系寡佔，物理「印不出來」。',
      controllers: [{ name: 'Murata', role: '高容值 MLCC', share: '~40%' }, { name: 'TDK / Taiyo Yuden', role: '—', share: '—' }],
      threads: [], notion: '被動元件 MLCC Layer B 2026-06-22、耐久度指數對帳' },

    { id: 'aichip', name: 'AI 訓練晶片 / CUDA 生態 / 自研 ASIC', layer: 'L3', tier: 0, flows: ['f_ai', 'f_sov'],
      collision: '🟡 W2 中後 [NARRATIVE_DRIFT_WATCH]', clock: '🟡 3-5 年（系統級追趕快於晶片級）', wave: 'W2',
      desc: '第四棒分岔候選。merchant GPU >80%，追趕者華為昇騰（950/960/970 路線圖至 2028，CANN 已開源）。同節點換持牌人：自研推論 ASIC（Google TPU / AWS Trainium / Meta MTIA / MSFT Maia，皆在 TSMC + 先進封裝同一條隊伍）→ 雙邊交期差對此型遷移結構性失明。2023 顯示卡為接力第一棒（已交棒）。',
      controllers: [{ name: 'NVIDIA', role: 'merchant GPU', share: '>80%' }, { name: 'Broadcom / Marvell', role: 'custom ASIC 設計', share: '—' }, { name: '華為昇騰', role: '追趕者', share: '—' }],
      threads: ['t_airoi', 't_relay', 't_tollbooth'], notion: 'DOC-3 §6.3 AI 訓練晶片 / CUDA、Custom AI ASIC Layer B、DOC-8 relay 2026-08-26' },

    { id: 'hybridbond', name: '混合鍵合 / SoIC（第五棒候選）', layer: 'L3', tier: 0, flows: ['f_ai'],
      collision: '第五棒候選（2026-08-23 具名，缺交期腿）', clock: '期限 2026-11-19', wave: 'W1',
      desc: '瓶頸遷移接力的第五棒尚未具名。候選為混合鍵合／SoIC 產能。W2W 混合鍵合無凸塊無膠，會繞過模封（TOWA）而非餵養它：目的地內部分歧。HBM4 全面轉混合鍵合因 JEDEC 放寬封裝高度至 775μm 而遞延，落點指向 HBM5。',
      controllers: [{ name: 'BESI / AMAT', role: '混合鍵合設備', share: '—' }, { name: 'TSMC', role: 'SoIC', share: '—' }],
      threads: ['t_relay', 't_kyber'], notion: '混合鍵合設備 Layer B 2026-06-10、DOC-8 relay 2026-08-22 / 08-28' },

    { id: 'liquidcool', name: '液冷（被跨過的一格）', layer: 'L1', tier: 0, flows: ['f_ai'],
      collision: '不是缺口，是不該覆蓋的格子', clock: '可壓縮', wave: 'W2', durability: 4.0, sde: '◻ 新進入者',
      desc: '2026-08-22 裁決：液冷對「租金流向 需求存續 × 交期最長 × 最不可壓縮」三項只滿足一項；買方用資本直接壓縮（三條複製路徑 12 個月內各自完成）。遷移路徑上被跨過的一格，非第五棒。',
      controllers: [{ name: 'Vertiv / Eaton (Boyd) / Modine / AAON', role: 'CDU / 冷板', share: '競爭性' }],
      threads: ['t_relay'], notion: 'DOC-3 液冷圖譜 §8–§13、DOC-8 relay 2026-08-22' },

    { id: 'socket', name: 'CPU Socket（世代重取型偽收費站）', layer: 'L3', tier: 0, flows: ['f_ai'],
      collision: '分類失效模式', clock: '每世代重新競標', wave: '—',
      desc: '教科書級收費站外觀（協同開發 + 2-3 年認證 + GM 50%），但每個世代重新競標一次：認證資產不跨世代結轉為排他權。判定公式：當「認證週期 ≈ 平台換代週期」，Temporal 稀缺性無法累積。TE 在 SP7 已在場；面對銅金塑料上漲選擇吸收成本不漲價 = 願意讓渡定價權。',
      controllers: [{ name: 'Lotes / Foxconn / TE Connectivity', role: 'CPU socket', share: '三方在場' }],
      threads: ['t_lotes'], notion: '伺服器 CPU Socket Layer B 2026-07-23' },

    { id: 'odm', name: '組裝 / ODM 層（過路費支付者）', layer: 'L3', tier: -1, flows: ['f_ai'],
      collision: '需求側 W2 確認儀表板，非建倉層', clock: '—', wave: 'W2',
      desc: '脊柱八段是「印不出來」的收費站；rack 組裝／ODM 是把上游瓶頸整合成整櫃的下游流量承接層，向 TSMC/HBM/載板/電源買路。同層皆 ~2% GM 結構。rack 出貨翻倍 = 上游需求 RED。',
      controllers: [{ name: '鴻海 / 廣達 / 緯創 / 緯穎 / Dell / SMCI', role: '組裝', share: '~2% GM' }],
      threads: ['t_airoi'], notion: 'DOC-3 §0.5「組裝／ODM 層 ≠ 瓶頸層」2026-07-06' },

    { id: 'nandctl', name: 'NAND 控制器層（溫度計）', layer: 'L3', tier: -1, flows: ['f_ai'],
      collision: '騎 NAND 短缺紅利', clock: 'S-Kill 已材料化', wave: '—',
      desc: '獨立 SSD 控制器騎 NAND 短缺（HBM 排擠 NAND 產能）+ 低價庫存紅利 = 溫度計特徵；真收費站在 NAND 原廠。原廠自研控制器（Samsung PM1763、Micron 9650）直攻企業戰場。',
      controllers: [{ name: '群聯 / 慧榮', role: '獨立控制器', share: '—' }, { name: 'SK hynix / Micron / Samsung', role: 'NAND 原廠（真收費站）', share: '—' }],
      threads: ['t_memory'], notion: 'DOC-3 分類註記 2026-07-27' }
  ],

  /* ───────────── 瓶頸遷移接力（DOC-8 BOTTLENECK-MIGRATION-RELAY） ───────────── */
  relay: {
    rule: '租金流向「需求仍然存續 × 交期最長 × 最不可壓縮」的節點。前一棒交期壓縮的同時後一棒延長，總租金守恆甚至擴大：遷移 = 租金輪動，不是租金蒸發。',
    batons: [
      { n: 1, year: '2023', name: '顯示卡 / GPU', node: 'aichip', state: 'done' },
      { n: 2, year: '2024', name: '先進封裝 CoWoS', node: 'cowos', state: 'done' },
      { n: 3, year: '2024-25', name: '高頻寬記憶體 HBM', node: 'hbm', state: 'done' },
      { n: 4, year: '2025-26', name: '電力（發電 → 輸配電）', node: 'power', state: 'live' },
      { n: 5, year: '?', name: '尚未具名（候選：混合鍵合／SoIC；人才／審批不可投資）', node: 'hybridbond', state: 'open', deadline: '2026-11-19' }
    ],
    types: [
      { name: '供給追上', desc: '該節點稀缺性歸零，租金蒸發。' },
      { name: '需求繞道（= 遷移）', desc: '需求還在，改走另一個節點，總量守恆。對持倉造成相對表現轉負，非絕對虧損。' },
      { name: '信用斷裂致凍結', desc: '整條接力鏈中途停擺，下游同步失去瓶頸。機率估約四分之一；觸發向量 2026-07-16 由「升息型」改判為「財政／長端期限溢價型」。這是唯一會造成嚴重虧損的型別。' }
    ],
    detector: {
      name: '雙邊交期差',
      rule: '節點甲的交期壓縮，而節點乙持平或延長 → 租金正從甲流向乙。必須雙邊；兩邊都延長是共同吃緊，兩邊都壓縮是共同消解。禁以價格或被遷離者的財報為輸入。',
      legA: { name: '甲腿：燃氣輪機交機格子', notion: '2029 → 2030 → 2031（GEV 三次法說，Tier 1-2）＝延長中，與線內原句「即將壓縮」相反（頁內矛盾已登記）', trend: '▲ 延長' },
      legB: { name: '乙腿：大型變壓器交期', notion: '系統內登記為無當期可比讀數 [RELAY_LEG_B_NOREAD]（既有 128/144 週一筆自身不自洽且無序列）', publicText: '公開資料：LPT 128 週、GSU 144 週（Wood Mackenzie Q2 2025）；2026 年變電站級 >160 週；典型 3-5 年', trend: '▲ 延長（公開資料判讀）' },
      verdict: '以公開資料補上乙腿後，兩腿皆延長 → 依線內規則讀作「共同吃緊」而非遷移訊號。此判讀由本站以公開資料作成，不是 Notion 內的裁決。'
    },
    blindspots: [
      { n: 1, date: '2026-08-06', name: '融資展期可得性', desc: '制度型剛性、零感測器，壽命短於 Regulatory：可於利差跳升當日歸零。' },
      { n: 2, date: '2026-08-26', name: '同節點換持牌人', desc: '自研推論 ASIC 與通用 GPU 排在同一條 TSMC + 先進封裝隊伍，彼此無交期差，偵測器讀數恆為零而遷移確實在發生。' },
      { n: 3, date: '2026-08-28', name: '自用未外售部署量', desc: '第一最佳客戶模式（Trainium 藏在託管服務底下）：規模不進入任何公開讀數。' },
      { n: 4, date: '2026-08-28', name: '目的地內部分歧', desc: 'W2W 混合鍵合繞過模封：承載遷移的條件假設目的地齊一，實則成分層不成立。' },
      { n: 5, date: '2026-08-28', name: '以承擔尾部風險換來的租金', desc: '同一實體同時是股東、擔保人與賣方；實際租金 = 帳面租金 − 尾部風險期望值，後者不入損益表也不進交期。' },
      { n: 6, date: '2026-08-31', name: '制度閘門（安全審批）首個數字', desc: '前沿實驗室自陳新增監控系統成本約為受監控 run 的 20%；單點、無序列，三個口徑未閉合。' }
    ]
  },

  /* ───────────── 分子側（DOC-9 分子側機制圖譜） ───────────── */
  numerator: {
    principle: '母原理 Alpha = f(信用彈性 / 瓶頸剛性)。分子 = 信用彈性，分母 = 瓶頸剛性。DOC-3 是分母側機制層，DOC-9 是分子側機制層；DOC-7-N 管讀數與態。',
    dims: [
      { id: 'd_qty', name: '① 數量', q: '錢被創造了多少', carrier: 'DOC-7-N N2 管道腿（準備金／RRP／SOFR−IORB）', status: '✅ 有閾值', fail: '母原理證偽條件原本只問這一維：錢的價格可以翻倍而假設仍「未被推翻」。' },
      { id: 'd_price', name: '② 價格', q: '錢本身多貴', carrier: 'DOC-7-N N1 + §1.2 + §1.3 信用價格', status: '🟡 部分鎖定', fail: '既有四項全為利差與波動率，無一量價格水準。' },
      { id: 'd_growth', name: '③ 成長率', q: '錢漲得多快', carrier: '無專屬載體', status: '🔴 缺', fail: '學界預測力最強的一組用的正是這一維；新興市場適用性相反。' },
      { id: 'd_comp', name: '④ 組成', q: '錢從哪個出口流出來、誰拿到', carrier: '無（維度診斷，不作即時狀態變數）', status: '🔴 缺', fail: '兩個信用環境可在前三維完全相同而收到租金的瓶頸完全不同，只因注入點不一樣。外部序列年頻且公開版止於 2020。' }
    ],
    sources: [
      { id: 's_fed', name: '公部門：財政部 × Fed 接力', short: '財政部 × Fed 接力', desc: '財政部賣新短券籌現金 → Fed 以新造準備金買短券（QT 止後每月淨買入）→ 財政部以現金買回 10-30Y 舊債。每段單獨看皆非印鈔，接通後與 QE 足跡同構。', misnode: 'm2' },
      { id: 's_bank', name: '銀行資本規則', short: '銀行資本規則', desc: '誰有資格放這筆款：投資級與否決定保險與退休金資本能否在資本費用規則下持有它。', misnode: 'm3' },
      { id: 's_asia', name: '貨幣區：亞洲資金地板', short: '貨幣區：亞洲資金地板', desc: 'BOJ 2026-06-16 升至 1.0%（31 年新高）、BOK 2026-07-16 升至 2.75%、CBC 維持 2.0%；台灣金管會逼壽險降美元曝險（監管腿）。分子儀表對這三者全部零讀數。', misnode: 'm4' },
      { id: 's_broad', name: '廣義信用環境（HY 利差 / IG 指數）', short: '廣義信用環境（HY / IG）', desc: '四支分子儀表全量這一層：對 AI-capex 邊際融資 SILENT。', misnode: 'm1' }
    ],
    pipes: [
      { id: 'p_ig', name: '公開發債（投資級）', short: '公開發債（投資級）', who: '大型雲端商主力', gauge: '✅ 有儀表（N3 腿③ IG 發債窗）', dir: '⬇️ 佔比下降',
        publicText: 'Alphabet、Amazon、Meta 三家 2026 年迄今發債近 $220B（2025 全年 $108B）；五大 hyperscaler 2025 發 $121B（2020-24 年均 $28B）；AI 相關債務 2026 預估近 $570B（Morgan Stanley）。', source: 'Vanguard / Morningstar / Forbes', url: 'https://corporate.vanguard.com/content/corporatesite/us/en/corp/vemo/ai-buildout-comes-to-bond-market.html', width: 6 },
      { id: 'p_pc', name: '私募信貸基金', short: '私募信貸基金', who: '邊際建置資金', gauge: '🔴 無儀表', dir: '⬆️ 上升',
        publicText: 'BIS 年報：私募信貸 AI 放款餘額近零 → >$200B（佔私募信貸總量 <1% → ~8%）；4(a)(2) 私募市場成 AI 融資新戰場，保險資本直接進場（Notion 2026-07-02 融資註）。', source: 'BIS 2026 年報 / Bloomberg（經 Notion 轉載）', width: 4 },
      { id: 'p_abs', name: '證券化（資料中心資產擔保 ABS/CMBS）', short: '證券化（DC ABS / CMBS）', who: '建置資金', gauge: '🔴 無儀表', dir: '⬆️ 上升',
        publicText: 'DC 證券化存量 $4B → $61B（ABS + CMBS）；2025 ABS 年流量約 $15B（CREFC，經 Notion 2026-08-08 直查更正為存量非流量）。', source: 'CREFC（經 Notion）', width: 2 },
      { id: 'p_bank', name: '銀行工商放款', short: '銀行工商放款', who: '中型企業、部分建置', gauge: '🟡 有公開周頻序列，未接入任何儀表', dir: '→ 平',
        publicText: '銀行 + 公開債市角色大於原預期的私募信貸主導；GS co-lead 德州 5GW 私有燃氣發電專案（股權 + 信貸並募）＝資本市場已為電力瓶頸定價。', source: 'Forbes（經 Notion 2026-07-02）', width: 3 },
      { id: 'p_vendor', name: '供應商殘值擔保 / SPV（賣方融資）', short: '供應商殘值擔保 / SPV', who: '無評等承租人（AI 實驗室）之算力融資', gauge: '🟡 替代節點：供應商或有負債揭露、有無擔保分層票息差', dir: '⬆️ 新前線',
        publicText: 'IREN $2.1B 私募 + $3.65B GPU 融資包（Fitch A、混合成本 6.00%，擔保 = MSFT 五年合約）＝美國私募市場首見 GPU 融資；NVIDIA 於 PORTS-Pike 園區出資入股並提供上限 $105B 殘值擔保、同為排他算力供應商；FT 2026-08-04《Google $200bn finance machine for Anthropic》。', source: 'Bloomberg / FT（經 Notion §14、FC-COMPUTE-CREDIT-STRUCTURE-01）', width: 3 }
    ],
    tenants: [
      { id: 'n_hyper', name: 'Hyperscaler 資本支出', desc: '2026 四家合計約 $725B（+77%）；2028 預計 capex 1.29 兆 vs FCF 2,300 億 = 五倍剪刀差，差額只能靠借。2026 capex ≈ 100% 營運現金流（十年均 40%，UBS）。', flow: 'f_ai' },
      { id: 'n_lab', name: 'AI 實驗室 / neocloud 租戶', desc: '真正的閥門：大型租戶信用集中度。新建 build-to-suit 以 yield-on-cost 承作、15 年三重淨租，久期錯配、MTBF、產出通縮四項風險依合約留在租戶資產負債表上。', flow: 'f_ai' },
      { id: 'n_sov', name: '主權 AI 基建', desc: '政治不可撤回；建廠期緩衝強、量產爬坡期中→弱、成熟期取決於是否僵屍化。', flow: 'f_sov' }
    ],
    fork: {
      name: '可抵押性分界（§8.1）',
      tangible: { name: '有形腿（可抵押）', items: '資料中心、加速器、電力設備、變壓器', accounting: '資本化上表；可設定擔保；通道 = 專案型發行體、算力融資平台殘值支持、表外租賃；資金來源 = 信用市場', elasticity: '近乎無限' },
      intangible: { name: '無形腿（不可抵押）', items: '流程重設計、員工訓練、組織重組、內部資料管線', accounting: '費用化，表上不存在；結構上不可設定擔保；外部融資通道 = 零；資金唯一來源 = 營運現金流（與股東回報直接競爭）', elasticity: '近乎為零' },
      warning: '兩腿之間隔著會計準則與擔保物權法：「分子端寬鬆會加速無形腿」與「無形腿進度慢代表分子端緊」皆不成立。有利面（信用只流向可抵押腿，而可抵押腿正是實體瓶頸）與不利面（生產力 J 曲線上行段可能被無限推遲 → 高利率維持更久）為同一機制的兩面。'
    },
    rentFork: {
      name: '收租端鏡像（§13.3）',
      infra: '基建租：算力、電力、機房使用計費；有邊際成本；底層為可抵押實體資產；隨資產與需求持續。',
      contract: '合約租：戰略夥伴協議收入分成；邊際成本零；無資產只有合約；設累計上限，預計 2028 年後某時點歸零（自毀時鐘）。外部觀察者無法在報表上分離兩者。'
    },
    chain: {
      note: '依 DOC-9 §7.1 文字重建的六段傳導鏈（原 SVG 圖存於 Notion 附件）。閥門不在產出價格，在租戶信用。鏈長的那一段恰好是看不見的那一段：前兩格發生在租戶自己的損益表上，第三格顯形時前兩格已走完。',
      steps: [
        { n: 1, name: '租戶 AI 營收 / 使用量', visible: false },
        { n: 2, name: '租戶損益表與現金流', visible: false },
        { n: 3, name: '大型租戶信用集中度（閥門）', visible: false, valve: true },
        { n: 4, name: '外部融資堆疊定價（發行量 × 利差）', visible: true },
        { n: 5, name: '建置支出續行 / 取消', visible: true },
        { n: 6, name: '瓶頸租金', visible: true }
      ]
    },
    quadrant: { name: '判別器：發行量 × 利差（§7.3，格線 2026-08-17 事前寫定）', now: '右上格：2025 資料中心債 >$200B、2026 hyperscaler 預估 $250-300B × 低利差 → 要求報酬率紀律不構成約束。對稱鎖：右上格同時是風險累積最快之象限（資本被強迫部署時，最差的專案亦取得融資）。Fed 主席 2026-08-28 Jackson Hole 演說給出同向定性陳述，來源層級升為 Tier 0-2，格線未動。' },
    misnodes: [
      { id: 'm1', n: '①', name: '私部門節點', what: '四支儀表量廣義信用，閥門在大型租戶信用集中度', fix: '可補線（換節點）。§14 規格缺陷：當承租人結構上沒有信用評等（SPV + 殘值擔保結構的存在理由），提案讀數「大型租戶 IG 利差」永遠是空的；替代節點 = 供應商或有負債揭露。', sec: '§7.2 / §14' },
      { id: 'm2', n: '②', name: '公部門節點', what: '機制跨財政部與 Fed 兩機構接力，單機構口徑只見一段', fix: '可補線（跨機構口徑）。判別開關：購債窗 2026-09-09 至 11-04，WALCL × 金價三結局表，事前寫死。', sec: '§10.1' },
      { id: 'm3', n: '③', name: '銀行資本規則', what: '誰有資格放這筆款；受監管資本之持有資格', fix: '未表態。演繹路徑：受監管資本資格規則 → 評等 → 供應商擔保 → 該筆訂單能否被融資 → 供應商營收。', sec: '§0.2 2026-08-24 / §14.3' },
      { id: 'm4', n: '④', name: '貨幣區', what: '四支儀表全量美國信用，而多數曝險以 TWD／JPY 計價', fix: '可補線（補亞洲腿）。亞洲利率地板上抬與台幣升值為同一組力量的兩個出口，互抵不完全時殘差方向未知。', sec: '§11.1 / §11.7' },
      { id: 'm5', n: '⑤', name: '恆等式偽裝', what: '無節點：分子由分母定義。比率的分子與分母取自同一組假設，恆為真、資訊量恆為零', fix: '⛔ 不可補線：唯一處置為停用該比率。「讀起來正常」失效模式的上界。', sec: '§13.1' }
    ],
    gates: [
      { name: '一 · 資格', desc: '歷次救援機制只收投資級、大型、公開發行人；本輪脆弱層結構上落在門檻之外 → 指數與資本支出脫鉤。' },
      { name: '二 · 時序', desc: '救援永遠在破裂之後：追繳在第三週，機制在第六週。' },
      { name: '三 · 流量', desc: '借款人活著 ≠ 資本支出續行。收費站收的是流量的租金，不是借款人的存活。' }
    ],
    gatesNote: '最重要的一條：央行的反應函數需要的確認變數（利差走闊、融資市場失能、波動率跳升）與系統自己的信用收縮儀表是同一批。不能用「央行會出手」當早期訊號，因為兩者同時亮：確認門檻 = 傷害門檻。',
    topform: {
      name: '融資側頂部：七訊號組合（FRAMEWORK-TURNINGPOINT-PIVOT）',
      thesis: '頂部可以從融資側先開始，而實物側判準全綠。W3 三判準（CapEx 暴增／新產能投產／價格滯漲）全在實物供需側，零融資判準。',
      score: '2026-08-07 首讀約 1/7（買家加槓桿一項 [UNDEFINED]）；組合不支持「泡沫式頂部已到」。',
      ceilings: ['物理天花板', '融資天花板（現領先物理一個身位）', '報酬天花板', '會計天花板'],
      signals: ['資產價格明顯偏高（待填）', '市場相信高價續快速上漲（否）', '看漲情緒普遍（否）', '買家大量加槓桿（[UNDEFINED]）', '新買家湧入（否）', '企業提前囤貨（明確反向）', '寬鬆貨幣繼續助推（明確反向：分子收緊）']
    },
    warsh: { name: '分子側行為者自陳（§12）', desc: 'Fed 主席 2026-08-28 宣布前瞻指引退場、改讀「未經過濾的市場訊號」（市場內部結構、板塊資產價格、公債價格與成交量、美元、信用成本與可得性、商品籃）。逐格對照：所點名的儀表在 ①③④ 三個接錯節點上皆未接上。鏡廳並未被打破，而是換了一面本頁已具名盲區的鏡子。推論（草案）：若 AI-capex 邊際融資實際收緊，該收緊在其儀表上不會顯形 → 政策錯誤方向可預測地偏向過度緊縮，且為無聲。' }
  },

  /* ───────────── DOC-8 threads（登記簿，摘要已去除持倉與價位） ───────────── */
  threads: [
    { id: 't_relay', name: 'BOTTLENECK-MIGRATION-RELAY-2026Q3', status: '⏳ 活躍（續留，期限 2026-11-19）', domain: '框架／AI 算力（跨主題線）', keywords: ['瓶頸遷移', '交期差', '四棒接力', '租金輪動', '凍結'], nodes: ['aichip', 'cowos', 'hbm', 'power', 'gasturbine', 'transformer', 'hybridbond', 'liquidcool', 'glasscore', 'cpo'],
      summary: '瓶頸不會消失只會換節點；四次交棒證明遷移是租金輪動非租金蒸發；會造成嚴重虧損的是信用斷裂致遷移鏈凍結。偵測器是雙邊交期差。三日內偵測器射程縮小四次（六個具名盲區）。第五棒未具名。' },
    { id: 't_800v', name: '800V-HVDC-POWER-TOLLBOOTH-2026Q3', status: '⏳ 活躍', domain: 'AI 算力／電力基建／材料', keywords: ['800V', 'HVDC', '變壓器', 'GOES', '燃氣輪機', 'SiC'], nodes: ['hvdc800', 'transformer', 'gasturbine', 'power'],
      summary: 'device 層溫度計 vs 電網收費站；變壓器/GOES 最硬但無乾淨可交易純玩家；燃機層上游熱段鑄鍛件兩條腿；800V/±400V 標準分岔已實現，新增合格化與毫秒暫態儲能兩層。正式研究問題：2027-31 遷移租金由哪一層取得。' },
    { id: 't_tollbooth', name: 'FRAMEWORK-TOLLBOOTH-2026Q3', status: '✅ 結案・FC 掛監控', domain: '框架／母原理', keywords: ['收費站', '無可替代', '電力牆', '幽靈庫存', 'capex-OCF'], nodes: ['power', 'euv', 'aichip', 'transformer'],
      summary: '收費站母命題 8-model 壓測：核心活、「無可替代」降為溢價收斂；瓶頸遷移晶片→電力；記憶體最尖 W3。' },
    { id: 't_airoi', name: 'AI-ROI-NARRATIVE-AMMO-2026Q2', status: '⏳ 活躍（2026-09-03 升為雙軸：時間軸 + 層間軸）', domain: 'AI 算力', keywords: ['AI capex', '引信', 'hyperscaler', 'neocloud', 'TPU'], nodes: ['aichip', 'cowos', 'power', 'odm'],
      summary: '四引信 0/4 維持第 14 次；能源化率（已簽 MW ≠ 已通電）為真缺口而非融資流；TPU 分潤結構取得條款級基礎（warrant 以營收計價 vesting）；分供化的結構性受益者是唯一不被分供的那一層（TSMC 2nm）。' },
    { id: 't_turning', name: 'FRAMEWORK-TURNINGPOINT-PIVOT-2026Q3', status: '⏳ 活躍', domain: '框架／系統', keywords: ['泡沫訊號', 'W2→W3', '融資側判準', 'GPU 抵押債', 'IG 發債窗'], nodes: [],
      summary: '頂部可從融資側先開始而實物側判準全綠；七訊號組合首讀 ~1/7；融資側五條條件皆已存在但未接進任何計分格；「AI 佔 IG 發債近半」出處錯誤，兩個 Tier 1 反向讀數約 8% 與 5.7%。' },
    { id: 't_capflow', name: 'FRAMEWORK-CAPITALFLOW-CORRELATION-2026Q2', status: '⏳ 活躍（母原理傘）', domain: '框架／母原理', keywords: ['反身性', '資本流', '剛性 taxonomy', '租金封頂', '反向收費站'], nodes: ['rareearth', 'hvlp4'],
      summary: '母原理挑戰傘：資本流 vs 評級相關性、反身性均值回歸、九種互不相同的租金封頂機制全部發生在瓶頸完好之前提下（剛性與收租能力近乎正交）；分母剛性是否存在最適點。' },
    { id: 't_memory', name: 'MEMORY-COMPLEX-2026', status: '⏳ 活躍', domain: '記憶體／AI 算力', keywords: ['HBM', 'DRAM', 'agentic', '溫度計', 'W3 供給鐘'], nodes: ['hbm', 'nandctl'],
      summary: '三軸：週期溫度計、HBM 純度席位、agentic 供需重建。一般 DRAM 2030 = 敘事非物理；HBM 才是真收費站；2028 W3 灌爆風險。' },
    { id: 't_decouple', name: 'DECOUPLE-TOLLBOOTH-2026Q3', status: '⏳ 活躍', domain: '地緣／半導體', keywords: ['台海脫鉤', 'TSMC', 'ASML', 'EUV', 'CoWoS', 'HBM'], nodes: ['euv', 'cowos', 'hbm'],
      summary: '對中貿易收費站（薄、萎縮）與全球先進製程收費站（EUV = 5 年跨不過的閘）是兩個不同物件；護城河遷移 CoWoS + HBM。' },
    { id: 't_kyber', name: 'KYBER-SUPPLYCHAIN-DURABILITY-2026Q3', status: '⏳ 活躍', domain: 'AI 算力／後段封測設備', keywords: ['Kyber', 'Disco', 'TOWA', 'Advantest', 'hybrid bonding'], nodes: ['cowos', 'hbm', 'hybridbond'],
      summary: 'Kyber 延後 = 良率非需求；訓練側完好；混合鍵合對模封是繞道而非餵養（目的地內部分歧）。' },
    { id: 't_abf', name: 'AJINOMOTO-ABF-TOLLBOOTH-2026Q3', status: '✅ F 結案・掛區監控', domain: 'AI 算力／材料（封裝）', keywords: ['ABF', 'build-up film', '載板', 'glass core'], nodes: ['abf', 'glasscore'],
      summary: 'ABF 膜 >95% 獨源收費站；被繼任的那一棒（玻璃芯 D-Bypass）。' },
    { id: 't_glass', name: 'GLASSCORE-TGV-TOLLBOOTH-2026Q3', status: '✅ 已結案', domain: 'AI 算力／材料（封裝）', keywords: ['玻璃芯', 'TGV', 'Corning', '金屬化'], nodes: ['glasscore', 'abf'],
      summary: '玻璃芯最硬收費站 = 玻璃材料三雄 + 金屬化，非 TGV 設備；量產 2028-29。' },
    { id: 't_cpo', name: 'CPO-OPTICAL-STRUCTURE-2026Q2', status: '⏳ 活躍', domain: 'AI 算力／材料', keywords: ['CPO', 'CCL', '光互連', '載板'], nodes: ['cpo', 'abf'],
      summary: 'chip-chip 光互連結構遷移；CCL 載板瓶頸；2027Q2 遷移裁判；第四棒候選。' },
    { id: 't_3081', name: '3081-TOLLBOOTH-VS-THERMOMETER-2026Q2', status: '✅ 已結案', domain: 'AI 算力／光通訊', keywords: ['InP', 'CW laser', '磊晶', '溫度計'], nodes: ['cpo'],
      summary: '時間性收費站（非永久）：moat = 設備提前下單 + CSP 認證 head-start，decaying。' },
    { id: 't_lotes', name: 'LOTES-3533-SOCKET-TOLLBOOTH-2026Q3', status: '⏳ 掛區監控', domain: 'AI 算力／連接器', keywords: ['socket', 'CPU 插槽', 'Temporal', '吸收成本'], nodes: ['socket'],
      summary: '收費站旁便利店：Temporal 非 Atomic，吸收成本不漲價為鐵證；世代重取型偽收費站的原型案例。' },
    { id: 't_hormuz', name: 'HORMUZ-PHYSICAL-2026Q2', status: '⏳ 活躍', domain: '地緣／能源', keywords: ['荷莫茲', '油輪', 'Brent', '暗艦隊'], nodes: ['helium', 'fertilizer'],
      summary: '7 月急性再升級後市場押可證偽的重開基線；仲裁 = 庫存抽取速率非通行數；氦氣與肥料為其物理外溢。' },
    { id: 't_rates', name: 'RATES-WARSH-2026', status: '⏳ 活躍（2026-09-01 協議 E 畢業回落）', domain: '利率／通膨', keywords: ['Warsh', 'Fed', '期限溢價', '準備金', '短債買長債'], nodes: [],
      summary: '財政部發短債買長債：壓力不消失，從長端遷移至準備金（隔夜逆回購緩衝見底，直接自銀行準備金出）。既有準備金地板條件係在「單抽水管」假設下設定；準備金四週降幅兩讀數差 3.5 倍未調和。' },
    { id: 't_wealth', name: 'WEALTHPUMP-THREEARMS-2026Q3', status: '⏳ 活躍', domain: '框架／政治經濟', keywords: ['財富泵', 'Turchin', '勞動力 K 分化', 'Pettis', 'term premium'], nodes: ['nursing'],
      summary: '一台財富泵三政治臂 + 勞動力 K 斷層基座（焊工悖論：印不出來的是有經驗的人）；佩蕾絲轉折點 = Turchin 釋放閥。' },
    { id: 't_miltech', name: 'MIL-TECH-TOLLBOOTH-2026Q2', status: '⏳ 活躍', domain: '國防', keywords: ['seeker', '導引頭', '框架協議', 'CAS repricing', 'SRM'], nodes: ['rareearth', 'gasturbine'],
      summary: '軍事科技複合體收費站；seeker 核心真但無乾淨純表達；固體火箭推進器雙寡佔為上游轉換閘；框架協議 margin-retention 建立在最短命的 Regulatory 剛性軸。' },
    { id: 't_nonai', name: 'NONAI-TOLLBOOTH-SWEEP-2026Q3', status: '⏳ 活躍', domain: '配置／篩選', keywords: ['wide moat', '非 AI 收費站', '信用源不相關', '交易所', '評等'], nodes: [],
      summary: '單一驅動源集中是結構事實，需一個信用源與 hyperscaler capex 機制上不相關的第二收費站（政府預算／rate base／人口結構／法定強制需求）。MOAT ETF 疊加折價篩選與目標結構性反向相關 → 改用評級全集。第七流「法定強制需求」由此線開欄。' },
    { id: 't_twetf', name: 'CORP-TWETF-POWER-DEFENSE-2026Q3', status: '✅ 結案', domain: '法人配置／台掛 ETF', keywords: ['電力基建 ETF', '航太防衛 ETF', '稅務載體'], nodes: ['power', 'transformer'],
      summary: '台掛主題 ETF 作為既有瓶頸曝險的稅務載體，非新控制者、非新瓶頸。' },
    { id: 't_atkr', name: 'ATKR-DC-HYPERSCALER-CONCENTRATION-2026Q2', status: '⏳ 活躍（子問題已結案）', domain: '工業／電氣基建', keywords: ['cable management', 'conduit', 'me-too'], nodes: ['power'],
      summary: 'DC 真實但佔比小；兩張 DC 專屬榜單皆缺席 = 共同供應商，非收費站。' },
    { id: 't_13b', name: 'FRAMEWORK-13B-STRANGERTEST-WITNESS-2026Q3', status: '🔻 已退役（結論升為常駐紀律 R9 外部執行點原則）', domain: '框架／方法論', keywords: ['Stranger Test', 'Lakatos', '量測層失效', '外部執行點'], nodes: [],
      summary: '只有外部強制點（schema 驗證／SQL dedup／前置 fetch 閘門）有非零執行率，內部自律規則執行率接近零。' },
    { id: 't_north', name: 'FRAMEWORK-NORTH-INSTITUTIONAL-CHANGE-2026Q3', status: '教材（常青）', domain: '框架／方法論', keywords: ['North', '制度變遷', 'adaptive efficiency'], nodes: [],
      summary: '諾斯《制度變遷》機制展開；拆「制度 = 基因／週期宿命」敘事的常青教材。' },
    { id: 't_routing', name: 'MODEL-ROUTING-INSTRUMENT-2026Q3', status: '⏳ 活躍（operational）', domain: '系統／協議', keywords: ['模型檔位', 'R2 一次完成率', '建儀器非下結論'], nodes: [],
      summary: '模型檔位對重型協議一次完成率的影響是否大於 prompt 版本效應：建儀器，非下結論；預判 [INSUFFICIENT_SAMPLE]。' },
    { id: 't_proty', name: 'PROTOCOL-Y-ADOPTION-CR-2026Q2', status: '⏳ 續停至 2026-09-30', domain: '系統／協議', keywords: ['Protocol Y', 'Kelly', 'dry-run'], nodes: [],
      summary: '拆 Y 為 Y-Far + Y-Mid；兩輪 sandbox dry-run 骨架可行；Stranger Test 從未執行。' },
    { id: 't_quarantine', name: 'TAIWAN-QUARANTINE-2026', status: '⏳ 活躍', domain: '地緣', keywords: ['台海', '海警', '登船', 'EEZ'], nodes: ['euv', 'cowos'],
      summary: '海警對台東商船廣播未登船；觀察「登船扣留 ≥7 天」= 即時 🔴。' }
  ],

  /* ───────────── 系統自身的量測瓶頸（DOC-8 / DOC-9 登記） ───────────── */
  gaps: [
    { name: '電力量測鏈三支儀表分屬兩條 thread', detail: '併網佇列中位數／變壓器交期／已宣布 MW 之 COD 達成率，四條具名取數路徑，至 2026-08-26 零筆讀數；2026-09-02 首筆 COD 讀數寫入。無任何機制會跨線盤點同一物理量的儀表是否全空。', where: 'DOC-8 800V ↔ AI-ROI cross-link' },
    { name: '乙腿（變壓器）當期可比交期讀數', detail: '[RELAY_LEG_B_NOREAD] 自 2026-08-24 登記，四度未取得；雙邊交期差偵測器只有一腿在動。本站以公開資料（128/144 週、>160 週）暫補。', where: 'DOC-8 relay' },
    { name: '瓶頸節點動態表 18 個節點全部 ⬜ 無讀數', detail: '交期讀數欄全為 [MISSING] 待 G-Patrol 首刷；四個節點缺對應圖譜（先進製程晶圓代工、能源航道、merchant GPU、對映待裁）。', where: 'DOC-3 瓶頸節點動態表' },
    { name: 'Layer B 電力設備頁的 FC 列出率 6.4%', detail: '頁面點名 3 條，Falsification DB 實際 47 條（含 JSW 轉子鍛件四條，而頁面仍標 [UNVERIFIED]）。', where: 'DOC-3 Layer B 2026-08-26 稽核' },
    { name: '制度閘門（安全審批）無時間序列', detail: '20% 監控 overhead 為單點、單一實驗室、單次揭露，三個口徑未閉合 [INSTITUTIONAL_GATE_NOSERIES]。', where: 'DOC-8 relay 2026-08-31' },
    { name: 'DOC-9 敘述層落後機制層七節', detail: '專案檔 v3.6 之後 §8/§8.9/§10/§11/§12/§13/§14 皆未反映，且無儀表會亮。', where: 'DOC-9 §14.8' },
    { name: '「答案早已在自家 DB」家族第 13 例', detail: '同型第五次：處理純分子側素材時未檢索 DOC-9；既有防線攔截力經四次實測為零。', where: 'DOC-9 §13.7' },
    { name: 'Research Queue 逾期 173 筆', detail: 'P0 95 + P1 78，全部帶 Legacy Source ID = 遷移債；進得比清得快。', where: 'DOC8-L11 2026-09-02' }
  ],

  /* ───────────── 公開資料來源（本站補充，2026-09-03 檢索） ───────────── */
  sources: [
    { name: 'Industrial Sage：Power transformer lead times hit 128 weeks', url: 'https://www.industrialsage.com/power-transformer-lead-times-us-grid-shortage/', topic: 'transformer' },
    { name: 'POWER Magazine：Transformers in 2026', url: 'https://www.powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis/', topic: 'transformer' },
    { name: 'EnkiAI：Grid interconnection delays 2026', url: 'https://enkiai.com/ai-market-intelligence/grid-interconnection-delays-2026-a-threat-to-us-energy/', topic: 'power' },
    { name: 'RMI：Interconnection queue and AI data centers', url: 'https://rmi.org/resources/interconnection-reform-ai-data-centers-generator-queues/', topic: 'power' },
    { name: 'Digitimes：TSMC CoWoS 2027 capacity', url: 'https://www.digitimes.com/news/a20260710PD226/tsmc-cowos-2027-packaging-capacity.html', topic: 'cowos' },
    { name: 'TrendForce：CoWoS gap narrowing 20%→10%', url: 'https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/', topic: 'cowos' },
    { name: 'Introl：South Korea HBM4 moment', url: 'https://introl.com/blog/south-korea-hbm4-stargate-memory-supercycle-2026', topic: 'hbm' },
    { name: 'carboncredits.com：Uranium price today', url: 'https://carboncredits.com/uranium-prices-today/', topic: 'uranium' },
    { name: 'Sprott：Uranium outlook 2026', url: 'https://sprottetfs.com/insights/uranium-outlook-2026/', topic: 'uranium' },
    { name: 'Utility Dive：GE Vernova gas turbine backlog 116 GW', url: 'https://www.utilitydive.com/news/ge-vernova-gas-turbine-backlog-climbs-to-116-gw/826039/', topic: 'gasturbine' },
    { name: 'GE Vernova Q2 2026 8-K', url: 'https://www.sec.gov/Archives/edgar/data/0001996810/000199681026000147/gev2q2026form8-k.pdf', topic: 'gasturbine' },
    { name: 'ASML Q2 2026 results', url: 'https://www.asml.com/en/news/press-releases/2026/q2-2026-financial-results', topic: 'euv' },
    { name: 'IUMI：Qatari helium shortages', url: 'https://iumi.com/newsletter-june-2026/qatari-helium-shortages/', topic: 'helium' },
    { name: 'Gowling WLG：Helium, Hormuz and the chip supply chain', url: 'https://gowlingwlg.com/en/insights-resources/articles/2026/helium-hormuz-and-the-chip-supply-chain', topic: 'helium' },
    { name: 'valueaddvc：$725B AI capex 2026', url: 'https://valueaddvc.com/ai-spending', topic: 'f_ai' },
    { name: 'CNBC：Hyperscalers face capex scrutiny', url: 'https://www.cnbc.com/2026/07/28/hyperscalers-face-higher-capex-scrutiny-after-alphabet-report-panned.html', topic: 'f_ai' },
    { name: 'Vanguard：The AI buildout comes to the bond market', url: 'https://corporate.vanguard.com/content/corporatesite/us/en/corp/vemo/ai-buildout-comes-to-bond-market.html', topic: 'p_ig' },
    { name: 'Morningstar：AI bond issuance tops $250B', url: 'https://www.morningstar.com/bonds/bond-issuance-backing-ai-investment-tops-250b-testing-limits-voracious-investor-demand', topic: 'p_ig' },
    { name: 'Forbes：AI debt heads toward $570 billion', url: 'https://www.forbes.com/sites/robertszczerba/2026/07/17/bond-investors-push-back-as-ai-debt-heads-toward-570-billion/', topic: 'p_ig' }
  ]
};

/* ───────────── 關係邊（有方向、有型別、有解釋） ─────────────
   rel 語意：a depends_on b = a 的上游是 b；a constrains b = a 限制 b；a supplies b = a 供應 b；
   a enables b = a 促成 b；a competes_with b = 橫向爭搶同一資源；a migrates_to b = 瓶頸租金由 a 遷往 b。
   信用側：funds（融資）、spends（支出成信用流）、collides（信用流撞上瓶頸）、tracks（thread 追蹤）。 */
window.ATLAS.edges = [
  /* 算力鏈 */
  { a: 'aichip', b: 'euv', rel: 'depends_on', strength: 'high', why: '先進製程是 GPU 與自研 ASIC 共用的第一道閘；四家 ASIC 夥伴全在 TSMC 2nm 同一條隊伍。' },
  { a: 'aichip', b: 'cowos', rel: 'depends_on', strength: 'high', why: 'NVIDIA 約占 CoWoS 六成產能；merchant GPU 與自研 ASIC 排同一條封裝隊伍，彼此無交期差。' },
  { a: 'aichip', b: 'hbm', rel: 'depends_on', strength: 'high', why: '每顆加速器綁 HBM 堆疊；2026 與 2027 HBM 產能皆已售罄，客戶只拿到需求量六到七成。' },
  { a: 'aichip', b: 'abf', rel: 'depends_on', strength: 'medium', why: 'AI 加速器與伺服器主板吃 ABF 載板、T-glass 與 HVLP 銅箔，層數翻倍。' },
  { a: 'euv', b: 'helium', rel: 'depends_on', strength: 'medium', why: '先進製程 fab 的冷卻與載氣依賴氦；Qatar 不可抗力後亞洲 fab 進入配給。' },
  { a: 'euv', b: 'specialtygas', rel: 'depends_on', strength: 'medium', why: '特氣、濕化學品、CMP slurry 為廠務耗材層，系統內仍是整格缺口。' },
  { a: 'cowos', b: 'abf', rel: 'depends_on', strength: 'high', why: 'CoWoS 的 S 段落在 ABF 載板；建廠 2-3 年大於設備交期，比後段設備更剛性。' },
  { a: 'abf', b: 'hvlp4', rel: 'depends_on', strength: 'medium', why: '高階載板與 CCL 用 HVLP4/5 銅箔，Mitsui >80%，訂單排至 2027H2。' },
  { a: 'hybridbond', b: 'hbm', rel: 'enables', strength: 'medium', why: 'W2W 混合鍵合是 HBM5 世代的候選路徑；HBM4 因 JEDEC 放寬高度至 775μm 而遞延。' },
  { a: 'glasscore', b: 'cowos', rel: 'enables', strength: 'low', why: '玻璃芯載板是 CoPoS 面板級封裝的繼任基材，2028-29 量產。' },
  { a: 'hbm', b: 'nandctl', rel: 'constrains', strength: 'medium', why: '原廠把產能排給 HBM，NAND 短缺是被動結果；獨立控制器騎的是這個紅利。' },
  { a: 'hdd', b: 'helium', rel: 'depends_on', strength: 'low', why: '氦封 HDD 為 nearline 主流，氦是 BOM 裡的物質性獨佔錨。' },
  { a: 'cpo', b: 'aichip', rel: 'enables', strength: 'medium', why: 'scale-out 頻寬牆由 CPO 解，Spectrum-X CPO 2027-28 放量。' },
  { a: 'rareearth', b: 'hvdc800', rel: 'constrains', strength: 'low', why: '鎵、鍺出口管制直接壓在 GaN / 化合物半導體的材料源頭。' },
  { a: 'rareearth', b: 'cpo', rel: 'constrains', strength: 'low', why: 'InP / 鍺為光通訊磊晶與光纖材料，管制擴大即為反向收費站。' },
  /* 組裝層與相鄰層 */
  { a: 'odm', b: 'aichip', rel: 'depends_on', strength: 'high', why: '機櫃組裝向上游買路，rack 出貨翻倍即上游需求 RED。' },
  { a: 'odm', b: 'hbm', rel: 'depends_on', strength: 'medium', why: '整櫃 BoM 裡記憶體佔比最高的一段。' },
  { a: 'odm', b: 'mlcc', rel: 'depends_on', strength: 'low', why: '伺服器級高容值 MLCC 單機用量數量級跳升。' },
  { a: 'odm', b: 'socket', rel: 'depends_on', strength: 'low', why: 'CPU socket 每世代重新競標，供應商三方在場。' },
  { a: 'odm', b: 'liquidcool', rel: 'depends_on', strength: 'low', why: '液冷是被跨過的一格：需求存續但可壓縮，買方用資本直接壓。' },
  { a: 'odm', b: 'hvdc800', rel: 'depends_on', strength: 'low', why: '800V 或 ±400V 兩陣營都要，device 層 14+ 可互換供應商。' },
  /* 電力鏈 */
  { a: 'power', b: 'transformer', rel: 'depends_on', strength: 'high', why: '每座資料中心與電廠都要 GSU 與電力變壓器，128-144 週交期是通電日期的硬約束。' },
  { a: 'power', b: 'gasturbine', rel: 'depends_on', strength: 'high', why: 'BTM 與新建燃氣機組是 firm 電力的主要來源，GEV 格子排到 2031。' },
  { a: 'power', b: 'uranium', rel: 'depends_on', strength: 'medium', why: '核電 PPA 與重啟是 firm 電力的另一腿，燃料端卡在 SWU 與 HALEU。' },
  { a: 'power', b: 'hvcable', rel: 'depends_on', strength: 'medium', why: '長距輸電與離岸併網靠 HVDC 電纜，三家歐企控 75%，backlog 12 年。' },
  { a: 'power', b: 'copper', rel: 'depends_on', strength: 'medium', why: '電網與設備的基礎金屬，新礦 10-15 年，2026 小過剩後缺口延至 2029+。' },
  { a: 'transformer', b: 'copper', rel: 'depends_on', strength: 'medium', why: '繞組用銅，銅關稅被點名將惡化變壓器瓶頸。' },
  { a: 'gasturbine', b: 'transformer', rel: 'competes_with', strength: 'medium', why: '燃機 OEM 的電氣化部門與 Eaton 等同時搶 GOES、銅與變壓器產能。' },
  { a: 'hvdc800', b: 'transformer', rel: 'depends_on', strength: 'low', why: '機櫃端的 800V 架構改變不了上游中壓變壓器的交期；閘門在紙（UL 認證）不在矽。' },
  { a: 'transformer', b: 'power', rel: 'constrains', strength: 'high', why: '2026 排定上線的美國 DC 僅三分之一在建，變壓器與開關短缺為主因。' },
  { a: 'power', b: 'aichip', rel: 'constrains', strength: 'high', why: '瓶頸自晶片遷至電力：已簽 MW 不等於已通電，COD 達成率是真缺口。' },
  { a: 'helium', b: 'hbm', rel: 'constrains', strength: 'low', why: '韓國 fab 六成氦來自 Qatar，約六個月庫存。' },
  /* 橫向爭搶 */
  { a: 'f_sov', b: 'f_ai', rel: 'competes_with', strength: 'high', why: '主權計畫與 Hyperscaler 爭搶同一批 EUV、先進製程與電力，前者不受 ROI 殺開關控制。' },
  { a: 'f_def', b: 'f_energy', rel: 'competes_with', strength: 'medium', why: '再軍備與能源轉型在銅、稀土、變壓器上撞同一批供給。' },
  /* 瓶頸遷移接力 */
  { a: 'aichip', b: 'cowos', rel: 'migrates_to', strength: 'high', why: '第一棒 → 第二棒（2023 → 2024）：顯示卡交期壓縮，先進封裝交期延長。' },
  { a: 'cowos', b: 'hbm', rel: 'migrates_to', strength: 'high', why: '第二棒 → 第三棒（2024 → 2024-25）。' },
  { a: 'hbm', b: 'power', rel: 'migrates_to', strength: 'high', why: '第三棒 → 第四棒（2024-25 → 2025-26）：powered-MW 牆。' },
  { a: 'power', b: 'hybridbond', rel: 'migrates_to', strength: 'low', why: '第五棒未具名；混合鍵合／SoIC 為候選，缺交期腿，期限 2026-11-19。' },
  { a: 'abf', b: 'glasscore', rel: 'migrates_to', strength: 'medium', why: 'ABF 的 D-Bypass 繼任者，2028-29 量產。' },
  { a: 'gasturbine', b: 'transformer', rel: 'migrates_to', strength: 'medium', why: '電力側第一棒：發電端 → 輸配電端。兩腿目前皆延長，依線內規則讀作共同吃緊。' }
];

/* ───────────── 故事線（有序節點清單，圖層照順序排） ───────────── */
window.ATLAS.stories = [
  { id: 'st_relay', name: '瓶頸遷移四棒接力', desc: '租金流向「需求存續 × 交期最長 × 最不可壓縮」的節點。四次交棒都發生在持有期內，第五棒未具名。', nodes: ['aichip', 'cowos', 'hbm', 'power', 'hybridbond'] },
  { id: 'st_power', name: '電力遷移：機櫃 → 電網 → 發電', desc: '800V 在 device 層是溫度計；收費站往上游走到變壓器、GOES 與燃氣輪機的熱段鑄鍛件。', nodes: ['hvdc800', 'transformer', 'gasturbine', 'power', 'uranium'] },
  { id: 'st_pkg', name: '封裝材料鏈', desc: '從 GPU 到載板化學的三個單一供應商，再到玻璃芯繼任者。', nodes: ['aichip', 'cowos', 'abf', 'hvlp4', 'glasscore', 'hybridbond'] },
  { id: 'st_credit', name: '信用 → 資本支出 → 瓶頸', desc: '分子側：信用來源經管道流到承載者，再撞上分母側的物理瓶頸。閥門在租戶信用，不在產出價格。', nodes: ['s_fed', 's_bank', 'p_ig', 'p_pc', 'p_vendor', 'n_lab', 'n_hyper', 'f_ai', 'aichip', 'power'] },
  { id: 'st_hormuz', name: '航道衝擊傳導到晶圓廠', desc: 'Ras Laffan 不可抗力 → 氦配給 → 亞洲 fab 與 HBM 產線；同一條航道也切斷肥料。', nodes: ['helium', 'euv', 'hbm', 'hdd', 'fertilizer'] },
  { id: 'st_taiwan', name: '台海 → 先進製程斷鏈', desc: '對中貿易收費站薄而萎縮；全球先進製程收費站是另一個物件，EUV 是五年跨不過的閘。', nodes: ['euv', 'cowos', 'hbm', 'aichip', 'odm'] },
  { id: 'st_reverse', name: '反向收費站與材料管制', desc: '對方控制的不可繞過關卡：稀土、鎵、鍺、鎢。下游西方國防與功率半導體是受威脅方。', nodes: ['rareearth', 'hvdc800', 'cpo', 'specialtygas', 'hvlp4'] }
];

/* ───────────── 逐筆事實（每筆帶值、日期、來源層級、來源） ─────────────
   tier：T0-1 一手／官方，T2 法說與主流財經媒體，T3 研調與產業媒體，T4 部落格與轉述。Notion 為系統內裁決。 */
window.ATLAS.facts = {
  transformer: [
    { text: '大型電力變壓器平均交期 128 週、發電機升壓變壓器 144 週；自 2019 年電力變壓器需求 +119%、GSU +274%，2025 供給缺口約 30%。', value: '128 / 144 週', date: '2025-Q2', tier: 'T3', source: 'Wood Mackenzie 調查（經 Industrial Sage）', url: 'https://www.industrialsage.com/power-transformer-lead-times-us-grid-shortage/' },
    { text: '2026 年變電站級變壓器交期已逾 160 週；典型 LPT 3-5 年。', value: '>160 週', date: '2026-08', tier: 'T3', source: 'POWER Magazine', url: 'https://www.powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis/' },
    { text: '美國約 80% 電力變壓器靠進口；Hitachi Energy、Siemens Energy、Eaton 近 18 億美元新產能於 2027-28 開出，交期才可能鬆動。', value: '80% 進口', date: '2026', tier: 'T3', source: 'Wood Mackenzie opinion', url: 'https://www.woodmac.com/news/opinion/transformer-troubles-manufacturing-and-policy-constraints-hit-us-transformer-supply/' },
    { text: 'GOES 占變壓器成本約 20%；美國僅 Butler Works 一家生產，鐵芯進口自 2018 年 1.26 億升至 2025 年 5.24 億美元。', value: '美國單一 GOES 廠', date: '2026', tier: 'T3', source: 'Breakthrough Journal / Cleveland-Cliffs', url: 'https://www.breakthroughjournal.org/p/america-makes-the-wrong-steel-for' },
    { text: '高壓變壓器交期 3 年 → 4 年（~208 週）；W3 反向確認閾值「交期 <80 週」遠未觸發；乙腿當期可比序列登記為無讀數。', value: '無序列讀數', date: '2026-08-28', tier: 'Notion', source: 'DOC-3 §0.0 / DOC-8 relay' }
  ],
  power: [
    { text: '美國併網佇列 2,600GW，達商轉中位數約 5 年；ERCOT 大負載佇列 410GW 中 87% 為資料中心。', value: '2,600 GW', date: '2026', tier: 'T2', source: 'LBL Queued Up 2026 / RMI', url: 'https://rmi.org/resources/interconnection-reform-ai-data-centers-generator-queues/' },
    { text: '2026 年 30-50% 的資料中心站點面臨延遲或取消，變壓器與開關短缺為主因。', value: '30-50% 延遲', date: '2026-07', tier: 'T2', source: 'Reuters / Latitude Media', url: 'https://www.latitudemedia.com/news/up-to-half-of-the-worlds-data-centers-may-be-delayed-this-year/' },
    { text: '腿(a) 首筆 COD 讀數：Goldman on-time 72%→50%、Sightline 16GW→5GW；電力量測鏈三支儀表此前零讀數 63 天。', value: 'on-time 50%', date: '2026-09-02', tier: 'Notion', source: 'DOC-8 AI-ROI / 800V cross-link' }
  ],
  gasturbine: [
    { text: 'GE Vernova Q2 2026 燃機 backlog 116GW（53GW 設備 + 63GW 付費 slot），2031 格子年底前簽過半。', value: '116 GW', date: '2026-07-22', tier: 'T1', source: 'GE Vernova 8-K / Utility Dive', url: 'https://www.utilitydive.com/news/ge-vernova-gas-turbine-backlog-climbs-to-116-gw/826039/' },
    { text: '交機格子三時點 2029 → 2030 → 2031：方向為延長，與線內原句「即將壓縮」相反。', value: '延長', date: '2026-08-24', tier: 'Notion', source: 'DOC-8 relay 2026-08-24' },
    { text: '熱段單晶葉片鑄造 Howmet + PCC 約 70-80%；部分大型機組在沒有轉子或葉片的情況下出廠，現場後裝。', value: '~70-80% 雙寡佔', date: '2026-07-24', tier: 'Notion(T2-3)', source: 'DOC-3 電力設備 Layer B（EPRI）' }
  ],
  cowos: [
    { text: 'TSMC 三座先進封裝後段廠 sold out 至 2027，交期 52-78 週；2026 底 125-140k wpm，2027 傳出 ≥200k。', value: '52-78 週', date: '2026-07-10', tier: 'T3', source: 'Digitimes / TrendForce', url: 'https://www.digitimes.com/news/a20260710PD226/tsmc-cowos-2027-packaging-capacity.html' },
    { text: 'CoWoS 供需缺口 20% → 10%（2026 底）；單源且穿四條 FC，降 watch-only，不得單獨擊發。', value: '缺口 10%', date: '2026-06-15', tier: 'T3', source: 'TrendForce（Notion 標 SOURCE_ECHO）', url: 'https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/' },
    { text: '矽品雲林新廠 2028 啟用，非 TSMC OSAT 2027 底約 8 萬片／月；尚未跨越「長約綁定或繞過分配」的重驗觸發線。', value: '8 萬片/月（2027）', date: '2026-08-17', tier: 'Notion(T3)', source: 'DOC-3 Layer B 2026-08-17' }
  ],
  hbm: [
    { text: 'SK hynix、Micron 2026 HBM 全數售罄；三家 2027 產能亦已售罄，客戶僅拿到需求量的 60-70%。', value: '2027 售罄', date: '2026-08', tier: 'T3', source: 'Introl / Notebookcheck', url: 'https://introl.com/blog/south-korea-hbm4-stargate-memory-supercycle-2026' },
    { text: 'DRAM like-for-like +250-300%、NAND +200-250%，very tight 延至 2027。', value: '+250-300%', date: '2026-06', tier: 'T3', source: 'Goldman Exhibit 9（經 Notion 2026-07-09）' },
    { text: 'HBM4 2026-02 量產，新產能 2027 才有感；Samsung HBM4 已通過 NVIDIA 認證。', value: 'HBM4 量產', date: '2026', tier: 'T2-3', source: 'Mark LaPedus / 產業媒體' }
  ],
  euv: [
    { text: 'ASML Q2 2026 淨銷售 €9.3B、毛利 54%；2026 EUV 出貨規劃約 65 台低 NA，全年營收指引 €43-45B。', value: '~65 台', date: '2026-07-15', tier: 'T1', source: 'ASML Q2 2026 results', url: 'https://www.asml.com/en/news/press-releases/2026/q2-2026-financial-results' },
    { text: 'ASML 2026 低 NA EUV 出貨上限 60 台（CFO）；五方爭搶碰撞確認。', value: '60 台上限', date: '2026-07-16', tier: 'Notion(T1)', source: 'DOC-3 §6.3' }
  ],
  uranium: [
    { text: '現貨約 $90.39/lb；長期合約價 $97.00/lb（2026-07-01，歷史新高）。', value: '$90 / $97', date: '2026-08-31', tier: 'T3', source: 'carboncredits.com / TradeTech', url: 'https://carboncredits.com/uranium-prices-today/' },
    { text: 'Kazatomprom 下調 2026 產量（硫酸約束）；Goldman 累計缺口 19.1 億磅。', value: '缺口 19.1 億磅', date: '2026-07-16', tier: 'Notion(T2-3)', source: 'DOC-3 §6.3' }
  ],
  helium: [
    { text: '2026-03-02 QatarEnergy 於 Ras Laffan 宣告不可抗力；部分客戶僅拿到正常量一半；韓國 fab 約 6 個月庫存；全產能恢復需 3-5 年。', value: '恢復 3-5 年', date: '2026-06', tier: 'T2-3', source: 'IUMI / Gowling WLG', url: 'https://iumi.com/newsletter-june-2026/qatari-helium-shortages/' },
    { text: 'Qatar 約占全球 30-38% 氦產能；現貨價已翻倍，合約價估 +40-60%。', value: '30-38%', date: '2026', tier: 'T3', source: 'WestAir / Fusion', url: 'https://westairgases.com/blog/helium-shortage/' }
  ],
  abf: [
    { text: 'Ajinomoto ABF 膜漲價 30%、供給缺口延至 2027；ABF +30-35%、CCL +35-40%、T-glass +20-30%。', value: '+30%', date: '2026-07-16', tier: 'Notion(T3)', source: 'DOC-3 §6.3 / GS Exhibit 9' },
    { text: 'Defu 收購 Circuit Foil Luxembourg 被盧森堡 FDI 審查否決，中國 HVLP4 最快追趕路徑切斷。', value: 'FDI 否決', date: '2026-01-08', tier: 'Notion(T1-2)', source: 'DOC-3 HVLP4 Layer B' }
  ],
  copper: [
    { text: 'LME 紀錄 $11,771/t（2025-12-08）；2026 區間 $10-11k；Goldman 2026 小過剩 160kt，缺口延至 2029+。', value: '$10-11k/t', date: '2026-07-16', tier: 'Notion(T2-3)', source: 'DOC-3 §6.3 銅' }
  ]
};
