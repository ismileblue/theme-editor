import React, { useState, useEffect } from 'react';
import JSZip from 'jszip'; // 추가된 부분
import { Download, Plus, Trash2, Settings, List, Smartphone, Type, Image as ImageIcon, ChevronLeft, MousePointer2, Play, Upload } from 'lucide-react';

// 다국어 번역 사전
const translations = {
  en: {
    language: "Language",
    preview: "Preview",
    editMode: "Edit Mode",
    playMode: "Play Mode",
    clickToEdit: "Click or drag an element to edit/move.",
    playModeActive: "Play Mode is active. Hover over buttons!",
    globalSettings: "Global Settings",
    elements: "Elements",
    themeName: "Theme Name",
    customFont: "Custom Font (e.g., font.ttf)",
    fontPlaceholder: "Leave blank for default",
    fontUpload: "Load Font",
    fontNotice: "※ Font will be previewed and included in the ZIP.",
    colorStyles: "Colors & Styles (Android Hex)",
    textPrimary: "Text Primary",
    textSecondary: "Text Secondary",
    bgOverlay: "Background Overlay",
    statusBarBg: "Status Bar Bg",
    btnNormal: "Button Normal Bg",
    btnFocused: "Button Focused Bg",
    btnFocusedText: "Button Focused Text",
    defaultRadius: "Default Button Radius",
    clickLeftPreview: "Click an element on the left\npreview screen to edit!",
    addElement: "Add New Element",
    currentElements: "Current Placed Elements",
    delete: "Delete",
    idLabel: "ID (Unique string)",
    typeLabel: "Type",
    typeButton: "Standard Button",
    typeClock: "Widget: Digital Clock",
    typeAnalogClock: "Widget: Analog Clock",
    typeAlbum: "Widget: Album Art",
    typeBattery: "Widget: Battery Bar",
    typeCircularBattery: "Widget: Circular Battery",
    typeBox: "Design Box (Background Split)",
    layoutCoords: "Layout & Coordinates",
    gravityLabel: "Gravity (Anchor)",
    xLabel: "X (Horiz Offset)",
    yLabel: "Y (Vert Offset)",
    widthLabel: "Width",
    heightLabel: "Height",
    heightPlaceholder: "0 = Auto",
    indivDesign: "Individual Design (Bg/Box)",
    bgColorLabel: "Bg Color (Hex)",
    radiusLabel: "Radius",
    radiusPlaceholder: "-1 = Global",
    paddingLabel: "Inner Padding",
    titleTextSize: "Title/Main Text Size",
    albumProps: "Album Text Properties",
    textPos: "Text Position",
    textAlign: "Text Align",
    subTextSize: "Sub Text Size",
    albumPreview: "Album Cover Preview (Test)",
    loadImage: "Load Image from PC",
    btnSettings: "Button Settings",
    btnText: "Button Text",
    actionLabel: "Action",
    focusIndexLabel: "Focus Order (Index)", // 🚀 영문 추가
    iconLabel: "Icon (Image Preview)",
    iconPlaceholder: "icon_name.png",
    imageNotice: "※ PC images will be previewed and included in the ZIP.",
    importBtn: "Import Config",
    downloadBtn: "Download Theme (.zip)",
    zipProgress: "Creating ZIP...",
    importSuccess: "Configuration imported successfully!",
    importFail: "Invalid config.json format.",
    alpha: "Alpha",
    alphaAdjust: "Adjust Alpha",
    actNowPlaying: "Now Playing",
    actLibrary: "Music Library",
    actBluetooth: "Bluetooth",
    actSettings: "Settings Menu",
    actWeb: "Web Server",
    actWifi: "Wi-Fi Settings",
    actBrightness: "Display Brightness",
    actStorage: "Storage Info",
    actWidget: "Widget Settings",
    actBg: "Background Settings",
    actTheme: "Theme Selection",
    actTime: "Date & Time Settings",
    actRoot: "Root Folder (File Manager)"
  },
  ko: {
    language: "언어",
    preview: "미리보기",
    editMode: "편집 모드",
    playMode: "플레이 모드",
    clickToEdit: "요소를 클릭하거나 드래그하여 이동/수정하세요.",
    playModeActive: "플레이 모드 동작 중입니다. 버튼에 마우스를 올려보세요!",
    globalSettings: "글로벌 설정",
    elements: "메뉴/위젯 요소",
    themeName: "테마 이름 (Theme Name)",
    customFont: "커스텀 폰트 (예: font.ttf)",
    fontPlaceholder: "기본 폰트 사용 시 비워두세요",
    fontUpload: "폰트 불러오기",
    fontNotice: "※ 폰트가 미리보기에 즉시 적용되며, 압축 파일(.zip)에 포함됩니다.",
    colorStyles: "색상 및 스타일 (Android Hex)",
    textPrimary: "기본 글자색 (Text Primary)",
    textSecondary: "보조 글자색 (Text Secondary)",
    bgOverlay: "배경 오버레이 (Bg Overlay)",
    statusBarBg: "상태바 배경 (Status Bar Bg)",
    btnNormal: "버튼 기본 배경 (Btn Normal)",
    btnFocused: "버튼 포커스 배경 (Btn Focused)",
    btnFocusedText: "버튼 포커스 글자색",
    defaultRadius: "기본 버튼 둥글기 (Radius)",
    clickLeftPreview: "왼쪽 미리보기 화면에서\n수정할 요소를 클릭하세요!",
    addElement: "새 요소 추가하기",
    currentElements: "현재 배치된 요소 목록",
    delete: "삭제",
    idLabel: "ID (영문 고유값)",
    typeLabel: "Type (종류)",
    typeButton: "일반 버튼 (Button)",
    typeClock: "위젯: 디지털 시계",
    typeAnalogClock: "위젯: 아날로그 시계",
    typeAlbum: "위젯: 앨범 아트 (Album)",
    typeBattery: "위젯: 배터리 바",
    typeCircularBattery: "위젯: 원형 배터리",
    typeBox: "디자인 박스 (배경 분할용)",
    layoutCoords: "레이아웃 및 좌표",
    gravityLabel: "Gravity (기준점)",
    xLabel: "X (가로 여백)",
    yLabel: "Y (세로 여백)",
    widthLabel: "Width (너비)",
    heightLabel: "Height (높이)",
    heightPlaceholder: "0 = 자동(Auto)",
    indivDesign: "개별 디자인 (배경/박스)",
    bgColorLabel: "배경색 (Bg Color)",
    radiusLabel: "둥글기 (Radius)",
    radiusPlaceholder: "-1 = 글로벌 설정 따름",
    paddingLabel: "안쪽 여백 (Padding)",
    titleTextSize: "메인 글자 크기 (Title/Text)",
    albumProps: "앨범 텍스트 속성",
    textPos: "텍스트 위치 (Position)",
    textAlign: "텍스트 정렬 (Align)",
    subTextSize: "서브 글자 크기",
    albumPreview: "앨범 커버 미리보기 (테스트용)",
    loadImage: "PC에서 이미지 불러오기",
    btnSettings: "버튼 설정",
    btnText: "버튼 글자 (Text)",
    actionLabel: "실행 동작 (Action)",
    focusIndexLabel: "포커스 순서 (고유 번호)", // 🚀 한글 추가
    iconLabel: "아이콘 (Icon)",
    iconPlaceholder: "icon_name.png",
    imageNotice: "※ PC에서 이미지를 선택하면 표시되며, 압축 파일(.zip)에 포함됩니다.",
    importBtn: "설정 불러오기",
    downloadBtn: "테마 다운로드 (.zip)",
    zipProgress: "압축 파일 생성 중...",
    importSuccess: "설정 파일이 성공적으로 적용되었습니다!",
    importFail: "올바르지 않은 config.json 파일입니다.",
    alpha: "투명도",
    alphaAdjust: "투명도 조절",
    actNowPlaying: "Now Playing (현재 재생)",
    actLibrary: "Music Library (음악 목록)",
    actBluetooth: "Bluetooth (블루투스)",
    actSettings: "Settings (설정 메인)",
    actWeb: "Web Server (웹 서버)",
    actWifi: "Wi-Fi 설정 (바로가기)",
    actBrightness: "화면 밝기 (바로가기)",
    actStorage: "저장소 용량 정보 (바로가기)",
    actWidget: "위젯 ON/OFF 설정 (바로가기)",
    actBg: "배경화면 설정 (바로가기)",
    actTheme: "테마 선택 화면 (바로가기)",
    actTime: "날짜 및 시간 설정 (바로가기)",
    actRoot: "전체 폴더 (파일 탐색기)"
  },
  ja: {
    language: "言語",
    preview: "プレビュー",
    editMode: "編集モード",
    playMode: "プレイモード",
    clickToEdit: "要素をクリックまたはドラッグして編集・移動します。",
    playModeActive: "プレイモード起動中。ボタンにカーソルを合わせてください！",
    globalSettings: "グローバル設定",
    elements: "要素設定",
    themeName: "テーマ名 (Theme Name)",
    customFont: "カスタムフォント (例: font.ttf)",
    fontPlaceholder: "デフォルトの場合は空欄",
    fontUpload: "フォント読込",
    fontNotice: "※ プレビューに適用され、ZIPに含まれます。",
    colorStyles: "色とスタイル (Android Hex)",
    textPrimary: "基本テキスト (Text Primary)",
    textSecondary: "補助テキスト (Text Secondary)",
    bgOverlay: "背景オーバーレイ (Bg Overlay)",
    statusBarBg: "ステータスバー背景",
    btnNormal: "ボタン通常背景 (Btn Normal)",
    btnFocused: "ボタンフォーカス背景",
    btnFocusedText: "ボタンフォーカステキスト",
    defaultRadius: "デフォルトのボタン丸み",
    clickLeftPreview: "左側のプレビュー画面で\n編集する要素をクリックしてください！",
    addElement: "新しい要素を追加",
    currentElements: "現在の要素リスト",
    delete: "削除",
    idLabel: "ID (固有の英数字)",
    typeLabel: "Type (種類)",
    typeButton: "標準ボタン (Button)",
    typeClock: "ウィジェット: デジタル時計",
    typeAnalogClock: "ウィジェット: アナログ時計",
    typeAlbum: "ウィジェット: アルバム (Album)",
    typeBattery: "ウィジェット: バッテリーバー",
    typeCircularBattery: "ウィジェット: 円形バッテリー",
    typeBox: "デザインボックス (背景分割用)",
    layoutCoords: "レイアウトと座標",
    gravityLabel: "Gravity (基準点)",
    xLabel: "X (水平余白)",
    yLabel: "Y (垂直余白)",
    widthLabel: "Width (幅)",
    heightLabel: "Height (高さ)",
    heightPlaceholder: "0 = 自動",
    indivDesign: "個別デザイン (背景/ボックス)",
    bgColorLabel: "背景色 (Bg Color)",
    radiusLabel: "丸み (Radius)",
    radiusPlaceholder: "-1 = グローバル",
    paddingLabel: "内側余白 (Padding)",
    titleTextSize: "メイン文字サイズ",
    albumProps: "アルバムテキスト属性",
    textPos: "テキスト位置",
    textAlign: "テキスト揃え",
    subTextSize: "サブ文字サイズ",
    albumPreview: "カバープレビュー (テスト用)",
    loadImage: "PCから画像を読み込む",
    btnSettings: "ボタン設定",
    btnText: "ボタンテキスト",
    actionLabel: "動作 (Action)",
    focusIndexLabel: "フォーカス順序 (番号)",
    iconLabel: "アイコン (Icon)",
    iconPlaceholder: "icon_name.png",
    imageNotice: "※ 画像はプレビューされ、ZIPに自動的に含まれます。",
    importBtn: "設定を読込",
    downloadBtn: "テーマダウンロード (.zip)",
    zipProgress: "ZIP作成中...",
    importSuccess: "設定が正常に適用されました！",
    importFail: "無効な config.json ファイルです。",
    alpha: "不透明度",
    alphaAdjust: "不透明度を調整",
    actNowPlaying: "Now Playing (再生中)",
    actLibrary: "Music Library (音楽)",
    actBluetooth: "Bluetooth",
    actSettings: "Settings (設定)",
    actWeb: "Web Server",
    actWifi: "Wi-Fi 設定",
    actBrightness: "画面の明るさ",
    actStorage: "ストレージ情報",
    actWidget: "ウィジェット設定",
    actBg: "背景設定",
    actTheme: "テーマ選択",
    actTime: "日付と時刻の設定",
    actRoot: "ルートフォルダ (ファイル管理)"
  },
  zh: {
    language: "语言",
    preview: "预览",
    editMode: "编辑模式",
    playMode: "播放模式",
    clickToEdit: "点击或拖动元素进行编辑或移动。",
    playModeActive: "播放模式已激活。请将鼠标悬停在按钮上！",
    globalSettings: "全局设置",
    elements: "元素设置",
    themeName: "主题名称 (Theme Name)",
    customFont: "自定义字体 (例: font.ttf)",
    fontPlaceholder: "留空使用默认字体",
    fontUpload: "加载字体",
    fontNotice: "※ 字体将应用到预览，并包含在ZIP下载包中。",
    colorStyles: "颜色与样式 (Android Hex)",
    textPrimary: "主要文本颜色",
    textSecondary: "次要文本颜色",
    bgOverlay: "背景遮罩 (Bg Overlay)",
    statusBarBg: "状态栏背景",
    btnNormal: "按钮默认背景",
    btnFocused: "按钮焦点背景",
    btnFocusedText: "按钮焦点文本",
    defaultRadius: "默认按钮圆角",
    clickLeftPreview: "请在左侧预览区\n点击要编辑的元素！",
    addElement: "添加新元素",
    currentElements: "当前元素列表",
    delete: "删除",
    idLabel: "ID (唯一英文字符)",
    typeLabel: "Type (类型)",
    typeButton: "标准按钮 (Button)",
    typeClock: "小部件：数字时钟",
    typeAnalogClock: "小部件：模拟时钟",
    typeAlbum: "小部件：专辑 (Album)",
    typeBattery: "小部件：电池条",
    typeCircularBattery: "小部件：圆形电池",
    typeBox: "装饰盒子 (背景分割用)",
    layoutCoords: "布局与坐标",
    gravityLabel: "Gravity (锚点)",
    xLabel: "X (水平偏移)",
    yLabel: "Y (垂直偏移)",
    widthLabel: "Width (宽度)",
    heightLabel: "Height (高度)",
    heightPlaceholder: "0 = 自动",
    indivDesign: "独立设计 (背景/盒子)",
    bgColorLabel: "背景色 (Bg Color)",
    radiusLabel: "圆角 (Radius)",
    radiusPlaceholder: "-1 = 全局",
    paddingLabel: "内边距 (Padding)",
    titleTextSize: "主要字体大小",
    albumProps: "专辑文本属性",
    textPos: "文本位置",
    textAlign: "文本对齐",
    subTextSize: "副标题字体大小",
    albumPreview: "封面预览 (测试用)",
    loadImage: "从电脑加载图片",
    btnSettings: "按钮设置",
    btnText: "按钮文本",
    actionLabel: "动作 (Action)",
    focusIndexLabel: "焦点顺序 (编号)",
    iconLabel: "图标 (Icon)",
    iconPlaceholder: "icon_name.png",
    imageNotice: "※ 选择电脑中的图片后将进行预览，并包含在ZIP中。",
    importBtn: "导入配置",
    downloadBtn: "下载主题包 (.zip)",
    zipProgress: "正在创建ZIP...",
    importSuccess: "配置文件导入成功！",
    importFail: "无效的 config.json 文件格式。",
    alpha: "透明度",
    alphaAdjust: "调整透明度",
    actNowPlaying: "Now Playing (正在播放)",
    actLibrary: "Music Library (音乐库)",
    actBluetooth: "Bluetooth (蓝牙)",
    actSettings: "Settings (设置)",
    actWeb: "Web Server (Web服务器)",
    actWifi: "Wi-Fi 设置",
    actBrightness: "显示亮度",
    actStorage: "存储信息",
    actWidget: "小部件设置",
    actBg: "背景设置",
    actTheme: "主题选择",
    actTime: "日期和时间设置",
    actRoot: "根目录 (文件管理)"
  }
};

const androidHexToWeb = (hex) => {
  if (!hex || typeof hex !== 'string') return 'transparent';
  if (hex.length === 9) {
    return '#' + hex.slice(3, 9) + hex.slice(1, 3);
  }
  return hex;
};

const loadJSZip = async () => {
  if (window.JSZip) return window.JSZip;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    script.onload = () => resolve(window.JSZip);
    script.onerror = () => reject(new Error("Failed to load JSZip"));
    document.head.appendChild(script);
  });
};

export default function ThemeEditor() {
  const [language, setLanguage] = useState('en'); 
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key; 

  // 🚀 초기 데이터에 버튼별 focus_index 명시 추가
  const [themeData, setThemeData] = useState({
    name: "Classic Split (480x360)",
    font: "",
    textPrimary: "#FFFFFFFF",
    textSecondary: "#FFBBBBBB",
    bgOverlay: "#BB000000",
    statusBarBg: "#FF000000",
    btnNormal: "#00000000",
    btnFocused: "#DDFFFFFF",
    btnFocusedText: "#FF000000",
    button_radius: 10,
    main_menu: [
      {
        id: "my_clock", type: "widget_clock",
        x: 20, y: 25, width: 220, height: 0,
        gravity: "top|right",
        text_size: 22,
        bg_color: "", radius: -1, padding: 0
      },
      {
        id: "my_album", type: "widget_album",
        x: 20, y: 110, width: 220, height: 220,
        gravity: "top|right",
        text_position: "bottom", text_align: "center",
        bg_color: "#22FFFFFF", radius: 15, padding: 10,
        text_size: 16, text_secondary_size: 12
      },
      {
        id: "btn_player", type: "button",
        x: 15, y: 55, width: 180, height: 45,
        text_normal: "Now Playing", icon_normal: "icon_now_playing.png",
        gravity: "top|left", text_size: 16,
        bg_color: "", radius: -1, padding: 0, action: "OPEN_PLAYER",
        focus_index: 0
      },
      {
        id: "btn_music", type: "button",
        x: 15, y: 115, width: 180, height: 45,
        text_normal: "Library", icon_normal: "icon_music.png",
        gravity: "top|left", text_size: 16,
        bg_color: "", radius: -1, padding: 0, action: "OPEN_BROWSER",
        focus_index: 1
      },
      {
        id: "btn_bt", type: "button",
        x: 15, y: 175, width: 180, height: 45,
        text_normal: "Bluetooth", icon_normal: "icon_bluetooth.png",
        gravity: "top|left", text_size: 16,
        bg_color: "", radius: -1, padding: 0, action: "OPEN_BLUETOOTH",
        focus_index: 2
      },
      {
        id: "btn_set", type: "button",
        x: 15, y: 235, width: 180, height: 45,
        text_normal: "Settings", icon_normal: "icon_setting.png",
        gravity: "top|left", text_size: 16,
        bg_color: "", radius: -1, padding: 0, action: "OPEN_SETTINGS",
        focus_index: 3
      }
    ]
  });

  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('global'); 
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  
  const [previewImages, setPreviewImages] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fontUrl, setFontUrl] = useState(null); 
  const [fontFamilyName, setFontFamilyName] = useState(''); 
  const [isZipping, setIsZipping] = useState(false);

  const [dragInfo, setDragInfo] = useState({ isDragging: false, id: null, startX: 0, startY: 0, initialElementX: 0, initialElementY: 0 });

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!dragInfo.isDragging) return;
      const clientX = e.clientX ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientX : undefined);
      const clientY = e.clientY ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientY : undefined);
      if (clientX === undefined) return;

      setThemeData(prev => {
        const el = prev.main_menu.find(elem => elem.id === dragInfo.id);
        if (!el) return prev;

        let deltaX = clientX - dragInfo.startX;
        let deltaY = clientY - dragInfo.startY;

        const g = el.gravity ? el.gravity.toLowerCase() : 'top|left';

        if (g.includes('right')) deltaX = -deltaX;
        if (g.includes('bottom')) deltaY = -deltaY;

        return {
          ...prev,
          main_menu: prev.main_menu.map(item =>
            item.id === dragInfo.id
              ? { ...item, x: dragInfo.initialElementX + deltaX, y: dragInfo.initialElementY + deltaY }
              : item
          )
        };
      });
    };

    const handlePointerUp = () => {
      if (dragInfo.isDragging) {
        setDragInfo(prev => ({ ...prev, isDragging: false, id: null }));
      }
    };

    if (dragInfo.isDragging) {
      document.body.style.userSelect = 'none';
      document.body.style.WebkitUserSelect = 'none';

      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.addEventListener('touchend', handlePointerUp);
    } else {
      document.body.style.userSelect = '';
      document.body.style.WebkitUserSelect = '';
    }

    return () => {
      document.body.style.userSelect = '';
      document.body.style.WebkitUserSelect = '';
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [dragInfo]);

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (importedData && importedData.main_menu) {
          setThemeData(importedData);
          setSelectedId(null); 
          alert(t('importSuccess'));
        } else {
          alert(t('importFail'));
        }
      } catch (error) {
        alert(t('importFail'));
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  };

  const handleImageUpload = (id, file, targetField) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewImages(prev => ({ ...prev, [id]: url }));
    setUploadedFiles(prev => ({ ...prev, [file.name]: file }));
    if (targetField) {
      handleElementChange(id, targetField, file.name); 
    }
  };

  const handleFontUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    const familyName = 'CustomFont_' + Date.now();
    
    setFontUrl(url);
    setFontFamilyName(familyName);
    setUploadedFiles(prev => ({ ...prev, [file.name]: file }));
    handleGlobalChange('font', file.name);
  };

  const handleGlobalChange = (key, value) => {
    setThemeData({ ...themeData, [key]: value });
  };

  const handleElementChange = (id, key, value) => {
    setThemeData({
      ...themeData,
      main_menu: themeData.main_menu.map(el =>
        el.id === id ? { ...el, [key]: value } : el
      )
    });
  };

  const handleElementClick = (e, id) => {
    e.stopPropagation();
    if (!isPlayMode) {
      setSelectedId(id);
      setActiveTab('elements');
    }
  };

  const handlePointerDown = (e, id) => {
    if (isPlayMode) return;
    e.stopPropagation();
    setSelectedId(id);
    setActiveTab('elements');

    const el = themeData.main_menu.find(item => item.id === id);
    const clientX = e.clientX ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientX : undefined);
    const clientY = e.clientY ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientY : undefined);

    if (el && clientX !== undefined) {
      setDragInfo({
        isDragging: true,
        id: id,
        startX: clientX,
        startY: clientY,
        initialElementX: el.x || 0,
        initialElementY: el.y || 0
      });
    }
  };

  const handleAddElement = () => {
    const newId = `item_${Date.now()}`;
    const newElement = {
      id: newId, 
      type: "button",
      x: 0, y: 0, width: 150, height: 50,
      gravity: "top|left",
      text_normal: "New Item", text_size: 16,
      bg_color: "", radius: -1, padding: 0, action: "OPEN_PLAYER",
      focus_index: themeData.main_menu.filter(el => el.type === 'button').length // 새로 추가 시 제일 끝 번호 자동 부여!
    };
    
    setThemeData({
      ...themeData,
      main_menu: [...themeData.main_menu, newElement]
    });
    
    setSelectedId(newId);
  };

  const handleDeleteElement = (id) => {
    setThemeData({
      ...themeData,
      main_menu: themeData.main_menu.filter(el => el.id !== id)
    });
    if (selectedId === id) setSelectedId(null);
  };

  const handleDownloadZIP = async () => {
    setIsZipping(true);
    try {
      const JSZip = await loadJSZip();
      const zip = new JSZip();

      // 🚀 [수정] 오토매틱 계산 로직 삭제! 회원이 직접 입력한 themeData를 그대로 굽습니다!
      zip.file("config.json", JSON.stringify(themeData, null, 2));

      Object.values(uploadedFiles).forEach(file => {
        zip.file(file.name, file);
      });

      const zipContent = await zip.generateAsync({ type: "blob" });

      const safeName = themeData.name ? themeData.name.replace(/[\/\\?%*:|"<>]/g, '_') : 'theme';
      const downloadName = `${safeName}.zip`;
      
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.href = URL.createObjectURL(zipContent);
      downloadAnchorNode.download = downloadName;
      document.body.appendChild(downloadAnchorNode); 
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
    } catch (error) {
      console.error("ZIP Generation failed:", error);
      alert("Failed to create ZIP file.");
    } finally {
      setIsZipping(false);
    }
  };

  const getStyleFromElement = (el) => {
    const style = {
      position: 'absolute',
      width: el.width > 0 ? `${el.width}px` : 'auto',
      height: el.height > 0 ? `${el.height}px` : 'auto',
      userSelect: 'none',
      WebkitUserSelect: 'none'
    };

    const g = el.gravity ? el.gravity.toLowerCase() : 'top|left';
    
    if (g.includes('center_horizontal') || g === 'center') {
      style.left = `calc(50% + ${el.x}px)`;
      style.transform = 'translateX(-50%)';
    } else if (g.includes('right')) {
      style.right = `${el.x}px`;
    } else {
      style.left = `${el.x}px`;
    }

    if (g.includes('center_vertical') || g === 'center') {
      style.top = `calc(50% + ${el.y}px)`;
      if (style.transform) style.transform += ' translateY(-50%)';
      else style.transform = 'translateY(-50%)';
    } else if (g.includes('bottom')) {
      style.bottom = `${el.y}px`;
    } else {
      style.top = `${el.y}px`;
    }

    return style;
  };

  const renderColorInput = (label, value, onChange) => {
    const hexVal = value || '';
    let alphaHex = 'FF';
    let rgbHex = '#000000';
    
    if (hexVal.length === 9) {
      alphaHex = hexVal.substring(1, 3);
      rgbHex = '#' + hexVal.substring(3, 9);
    } else if (hexVal.length === 7) {
      rgbHex = hexVal;
    }

    const alphaDec = hexVal ? (parseInt(alphaHex, 16) || 0) : 255;
    const alphaPercent = Math.round((alphaDec / 255) * 100);

    return (
      <div className="flex flex-col mb-1">
        <div className="flex justify-between items-end text-xs mb-1">
          <label className="text-neutral-400">{label}</label>
          {hexVal.length >= 7 && <span className="text-cyan-400 font-mono text-[10px] font-bold">{t('alpha')}: {alphaPercent}%</span>}
        </div>
        <div className="flex gap-2 mb-2">
          <input 
            type="color" 
            value={rgbHex} 
            onChange={(e) => {
              const newRgb = e.target.value.toUpperCase();
              onChange(`#${alphaHex}${newRgb.substring(1)}`);
            }}
            className="w-9 h-9 p-0 border-0 rounded cursor-pointer shrink-0 bg-transparent overflow-hidden"
            title="Color Picker"
          />
          <input 
            type="text" 
            className="flex-1 min-w-0 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm font-mono uppercase placeholder-neutral-600" 
            placeholder="#AARRGGBB"
            value={hexVal} 
            onChange={(e) => onChange(e.target.value.toUpperCase())} 
          />
        </div>
        {hexVal.length >= 7 && (
          <input 
            type="range" 
            min="0" max="255" 
            value={alphaDec} 
            onChange={(e) => {
              const newAlphaDec = parseInt(e.target.value);
              const newAlphaHex = newAlphaDec.toString(16).padStart(2, '0').toUpperCase();
              onChange(`#${newAlphaHex}${rgbHex.substring(1)}`);
            }}
            className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            title={`${t('alphaAdjust')}: ${alphaPercent}%`}
          />
        )}
      </div>
    );
  };

  const renderElement = (el) => {
    const isSelected = selectedId === el.id;
    const boxStyle = getStyleFromElement(el);
    
    const bgColorWeb = el.bg_color ? androidHexToWeb(el.bg_color) : 'transparent';
    const radius = el.radius !== undefined && el.radius !== -1 ? el.radius : themeData.button_radius;
    
    if (el.type === 'widget_analog_clock') {
        boxStyle.backgroundColor = 'transparent';
    } else {
        boxStyle.backgroundColor = bgColorWeb;
    }
    
    boxStyle.borderRadius = `${radius}px`;
    boxStyle.padding = el.padding ? `${el.padding}px` : '0px';
    
    boxStyle.border = (!isPlayMode && isSelected) ? '2px dashed #00FFFF' : '2px solid transparent';
    boxStyle.boxSizing = 'border-box';
    boxStyle.cursor = isPlayMode ? 'default' : (dragInfo.isDragging && dragInfo.id === el.id ? 'grabbing' : 'grab');

    if (el.type === 'box') {
      const previewImg = previewImages[el.id];
      return (
        <div 
          key={el.id} 
          style={{
            ...boxStyle, 
            overflow: 'hidden', // 🚀 둥근 모서리 밖으로 이미지가 삐져나가지 않게 자름
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }} 
          onMouseDown={(e) => handlePointerDown(e, el.id)}
          onTouchStart={(e) => handlePointerDown(e, el.id)}
        >
          {previewImg ? (
            <img src={previewImg} alt="box_img" draggable="false" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          ) : el.icon_normal ? (
            <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               <ImageIcon color="rgba(255,255,255,0.3)" size={32} />
            </div>
          ) : null}
        </div>
      );
    }

    if (el.type === 'button') {
      const isHovered = isPlayMode && hoveredId === el.id;
      const currentBg = isHovered ? androidHexToWeb(themeData.btnFocused) : (bgColorWeb === 'transparent' ? androidHexToWeb(themeData.btnNormal) : bgColorWeb);
      const currentTextColor = isHovered ? androidHexToWeb(themeData.btnFocusedText) : androidHexToWeb(themeData.textPrimary);
      
      const isIconOnly = !el.text_normal || el.text_normal.trim() === '';
      const previewImg = previewImages[el.id];
// 🚀 [추가] 버튼 내부 텍스트 정렬 로직
      let jc = 'flex-start';
      let ai = 'center';
      let ta = el.text_align ? el.text_align.toLowerCase() : 'left';
      
      if (isIconOnly) {
         jc = 'center';
      } else {
         if (ta === 'center') { jc = 'center'; ai = 'center'; }
         else if (ta === 'right') { jc = 'flex-end'; ai = 'center'; }
         else if (ta === 'top') { jc = 'center'; ai = 'flex-start'; }
         else if (ta === 'bottom') { jc = 'center'; ai = 'flex-end'; }
      }
      return (
        <div 
          key={el.id} style={boxStyle} 
          onMouseDown={(e) => handlePointerDown(e, el.id)}
          onTouchStart={(e) => handlePointerDown(e, el.id)}
          onMouseEnter={() => setHoveredId(el.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="flex items-center text-white overflow-hidden transition-all duration-200"
        >
          <div style={{ backgroundColor: currentBg, borderRadius: `${radius}px`, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: isIconOnly ? 'center' : 'flex-start', padding: isIconOnly ? '0' : '0 15px' }}>
            {previewImg ? (
               <img src={previewImg} alt="icon" draggable="false" style={{width: isIconOnly ? '50%' : '24px', height: isIconOnly ? '50%' : '24px', marginRight: isIconOnly ? '0' : '10px', objectFit: 'contain'}} />
            ) : el.icon_normal ? (
               <ImageIcon size={isIconOnly ? 32 : 20} className={isIconOnly ? '' : 'mr-2'} color={currentTextColor} />
            ) : null}
            {!isIconOnly && (
               <span style={{ fontSize: el.text_size > 0 ? `${el.text_size}px` : '16px', color: currentTextColor, fontWeight: '500' }}>
                 {el.text_normal}
               </span>
            )}
          </div>
        </div>
      );
    }

    if (el.type === 'widget_clock') {
      return (
        <div 
          key={el.id} 
          style={{...boxStyle, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} 
          onMouseDown={(e) => handlePointerDown(e, el.id)}
          onTouchStart={(e) => handlePointerDown(e, el.id)}
        >
          <div style={{ color: androidHexToWeb(themeData.textPrimary), textAlign: 'center', lineHeight: '1.2' }}>
            <div style={{ fontSize: el.text_size > 0 ? `${el.text_size * 2.1}px` : '42px', fontWeight: 'bold' }}>17:22</div>
            <div style={{ fontSize: el.text_size > 0 ? `${el.text_size}px` : '20px', fontWeight: 'bold' }}>Mon, Jun 15</div>
          </div>
        </div>
      );
    }

    if (el.type === 'widget_analog_clock') {
      const clockOuterSize = Math.min(el.width, el.height) > 0 ? Math.min(el.width, el.height) : 100;
      const internalPadding = 10; 
      const p = el.padding || 0;
      const clockSize = clockOuterSize - (p * 2) - (internalPadding * 2);
      const primaryColor = androidHexToWeb(themeData.textPrimary);
      const innerBgColor = el.bg_color ? androidHexToWeb(el.bg_color) : 'transparent';
      
      return (
        <div 
          key={el.id} 
          style={{...boxStyle, display: 'flex', justifyContent: 'center', alignItems: 'center'}} 
          onMouseDown={(e) => handlePointerDown(e, el.id)}
          onTouchStart={(e) => handlePointerDown(e, el.id)}
        >
           <div style={{
             width: `${clockSize}px`, height: `${clockSize}px`, 
             borderRadius: '50%', backgroundColor: innerBgColor,
             border: `3px solid ${primaryColor}`, position: 'relative'
           }}>
             <div style={{ position: 'absolute', top: '25%', left: 'calc(50% - 2px)', width: '4px', height: '25%', backgroundColor: primaryColor, transformOrigin: 'bottom center', transform: 'rotate(45deg)', borderRadius: '2px' }}></div>
             <div style={{ position: 'absolute', top: '15%', left: 'calc(50% - 1.5px)', width: '3px', height: '35%', backgroundColor: primaryColor, transformOrigin: 'bottom center', transform: 'rotate(180deg)', borderRadius: '2px' }}></div>
             <div style={{ position: 'absolute', top: '10%', left: 'calc(50% - 1px)', width: '2px', height: '40%', backgroundColor: 'red', transformOrigin: 'bottom center', transform: 'rotate(270deg)' }}></div>
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: primaryColor, zIndex: 10 }}></div>
           </div>
        </div>
      );
    }

    if (el.type === 'widget_album') {
      const isHorizontal = el.text_position === 'left' || el.text_position === 'right';
      const flexDir = el.text_position === 'left' ? 'row-reverse' : 
                      el.text_position === 'right' ? 'row' : 
                      el.text_position === 'top' ? 'column-reverse' : 'column';
      
      const textAlignMap = { left: 'flex-start', right: 'flex-end', center: 'center' };
      const alignItem = textAlignMap[el.text_align || 'center'];

      const pSubtract = (el.padding || 0) * 2;
      let imgSize = 110;

      if (isHorizontal) {
        imgSize = el.height - pSubtract;
      } else {
        const maxImgHeightByRate = (el.height - pSubtract) * 0.65;
        const w = el.width > 0 ? el.width - pSubtract : el.height;
        imgSize = w < maxImgHeightByRate ? w : maxImgHeightByRate;
      }
      if (imgSize <= 0) imgSize = 110;
                      
      const previewImg = previewImages[el.id];

      return (
        <div 
          key={el.id} 
          style={{...boxStyle, display: 'flex', flexDirection: flexDir, alignItems: 'center', justifyContent: 'center', gap: isHorizontal ? '15px' : '5px'}} 
          onMouseDown={(e) => handlePointerDown(e, el.id)}
          onTouchStart={(e) => handlePointerDown(e, el.id)}
        >
          <div style={{ flexShrink: 0, width: `${imgSize}px`, height: `${imgSize}px`, backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {previewImg ? (
              <img src={previewImg} alt="album" draggable="false" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            ) : (
              <div style={{width: '100%', height: '100%', background: 'linear-gradient(135deg, #440000, #110000)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                 <ImageIcon color="#ff5555" size={imgSize * 0.4} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: alignItem, justifyContent: 'center', flex: 1, overflow: 'hidden', width: isHorizontal ? 'auto' : '100%' }}>
            <span style={{ color: androidHexToWeb(themeData.textPrimary), fontWeight: 'bold', fontSize: `${el.text_size || 16}px`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: el.text_align || 'center' }}>
              like JENNIE
            </span>
            <span style={{ color: androidHexToWeb(themeData.textSecondary), fontSize: `${el.text_secondary_size || 12}px`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: el.text_align || 'center', marginTop: '2px' }}>
              제니 (JENNIE)
            </span>
          </div>
        </div>
      );
    }

    if (el.type === 'widget_battery') {
      return (
        <div 
          key={el.id} 
          style={{...boxStyle, display: 'flex', justifyContent: 'center', alignItems: 'center'}} 
          onMouseDown={(e) => handlePointerDown(e, el.id)}
          onTouchStart={(e) => handlePointerDown(e, el.id)}
        >
          <div style={{ width: '100%', height: '100%', border: `2px solid ${androidHexToWeb(themeData.textPrimary)}`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: androidHexToWeb(themeData.textPrimary) }}>
            <span style={{ fontSize: el.text_size > 0 ? `${el.text_size}px` : '12px', fontWeight: 'bold' }}>100%</span>
          </div>
        </div>
      );
    }

    if (el.type === 'widget_circular_battery') {
      const batSize = Math.min(el.width, el.height) > 0 ? Math.min(el.width, el.height) - (el.padding || 0) * 2 : 80;
      const strokeWidth = 6;
      const batRadius = (batSize - strokeWidth) / 2;
      const circumference = batRadius * 2 * Math.PI;
      const primaryColor = androidHexToWeb(themeData.textPrimary);
      const secondaryColor = androidHexToWeb(themeData.textSecondary);

      return (
        <div 
          key={el.id} 
          style={{...boxStyle, display: 'flex', justifyContent: 'center', alignItems: 'center'}} 
          onMouseDown={(e) => handlePointerDown(e, el.id)}
          onTouchStart={(e) => handlePointerDown(e, el.id)}
        >
          <div style={{ position: 'relative', width: `${batSize}px`, height: `${batSize}px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width={batSize} height={batSize} style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
              <circle cx={batSize/2} cy={batSize/2} r={batRadius} fill="transparent" stroke={secondaryColor} strokeWidth={strokeWidth} opacity={0.6} />
              <circle cx={batSize/2} cy={batSize/2} r={batRadius} fill="transparent" stroke={primaryColor} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={0} strokeLinecap="round" />
            </svg>
            <span style={{ color: primaryColor, fontSize: el.text_size > 0 ? `${el.text_size}px` : '18px', fontWeight: 'bold', zIndex: 1 }}>
              100
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  const selectedElement = themeData.main_menu.find(e => e.id === selectedId);

  return (
    <div className="flex h-screen bg-neutral-900 text-neutral-200 font-sans">
      
      {fontUrl && (
        <style>
          {`
            @font-face {
              font-family: '${fontFamilyName}';
              src: url('${fontUrl}');
            }
          `}
        </style>
      )}

      {/* LEFT: 프리뷰 패널 */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 border-r border-neutral-700 bg-black relative">
        
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-neutral-800 p-1 rounded-lg border border-neutral-700 shadow-lg z-50">
           <button
             onClick={() => { setIsPlayMode(false); setHoveredId(null); }}
             className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors ${!isPlayMode ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'}`}
           >
             <MousePointer2 size={16} /> {t('editMode')}
           </button>
           <button
             onClick={() => { setIsPlayMode(true); setSelectedId(null); }}
             className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors ${isPlayMode ? 'bg-green-600 text-white' : 'text-neutral-400 hover:text-white'}`}
           >
             <Play size={16} fill={isPlayMode ? "currentColor" : "none"} /> {t('playMode')}
           </button>
        </div>

        <h2 className="mb-4 text-xl font-bold text-neutral-400 flex items-center gap-2"><Smartphone size={24} /> {t('preview')} (480 x 360)</h2>
        
        <div 
          className="relative shadow-2xl ring-4 ring-neutral-800 overflow-hidden"
          style={{
            width: '480px', 
            height: '360px', 
            userSelect: 'none', 
            WebkitUserSelect: 'none',
            backgroundColor: androidHexToWeb(themeData.bgOverlay),
            backgroundImage: `linear-gradient(45deg, #111 25%, transparent 25%), linear-gradient(-45deg, #111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111 75%), linear-gradient(-45deg, transparent 75%, #111 75%)`,
            backgroundSize: `20px 20px`,
            backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
            fontFamily: fontFamilyName ? `'${fontFamilyName}', sans-serif` : 'sans-serif'
          }}
          onMouseDown={() => { if (!isPlayMode) setSelectedId(null); }}
          onTouchStart={() => { if (!isPlayMode) setSelectedId(null); }}
        >
          <div style={{ 
            height: '36px',
            backgroundColor: androidHexToWeb(themeData.statusBarBg), 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center', 
            padding: '0 12px', 
            fontSize: '15px', 
            fontWeight: 'bold',
            color: androidHexToWeb(themeData.textPrimary),
            position: 'relative',
            zIndex: 50
          }}>
            <div>05:22 PM</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', opacity: 0.8 }}>📶</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  backgroundColor: '#4ADE80', 
                  color: '#000', fontSize: '11px', fontWeight: '900',
                  padding: '1px 6px', borderRadius: '3px',
                  display: 'flex', alignItems: 'center', gap: '2px'
                }}>
                  100 <span style={{ fontSize: '10px' }}>⚡</span>
                </div>
                <div style={{ width: '3px', height: '8px', backgroundColor: '#4ADE80', borderRadius: '0 3px 3px 0' }}></div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 36px)' }}>
            {/* 🚀 Z-index(그려지는 순서) 자동 정렬 알고리즘: 박스를 1등, 위젯을 2등, 버튼을 맨 마지막(3등)에 그립니다! */}
            {themeData.main_menu.filter(el => el.type === 'box').map(el => renderElement(el))}
            {themeData.main_menu.filter(el => el.type !== 'button' && el.type !== 'box').map(el => renderElement(el))}
            {themeData.main_menu.filter(el => el.type === 'button').map(el => renderElement(el))}
          </div>
        </div>

        <div className="mt-8 text-neutral-500 text-sm text-center">
          {isPlayMode ? (
            <span className="text-green-400 font-bold">{t('playModeActive')}</span>
          ) : (
            <span>{t('clickToEdit')}</span>
          )}
        </div>
      </div>

      {/* RIGHT: 에디터 패널 */}
      <div className="w-[450px] flex flex-col bg-neutral-800 shadow-xl z-10">
        
        <div className="flex border-b border-neutral-700 items-stretch bg-neutral-900">
          <div className="flex-1 flex">
            <button className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'global' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-700/50'}`} onClick={() => setActiveTab('global')}>
              <Settings size={18} /> {t('globalSettings')}
            </button>
            <button className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'elements' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-700/50'}`} onClick={() => setActiveTab('elements')}>
              <List size={18} /> {t('elements')}
            </button>
          </div>
          <div className="px-3 flex items-center border-l border-neutral-700">
             <span className="text-xs text-neutral-400 mr-2">{t('language')}:</span>
             <select 
               className="bg-neutral-800 border border-neutral-600 text-white text-xs rounded px-2 py-1 outline-none cursor-pointer"
               value={language}
               onChange={(e) => setLanguage(e.target.value)}
             >
               <option value="en">English</option>
               <option value="ko">한국어</option>
               <option value="ja">日本語</option>
               <option value="zh">中文</option>
             </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-neutral-600">
          
          {/* 📌 글로벌 설정 탭 */}
          {activeTab === 'global' && (
            <div className="space-y-4">
              <div className="mb-6">
                <label className="block text-xs font-bold text-neutral-400 mb-1 uppercase tracking-wider">{t('themeName')}</label>
                <input type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white" value={themeData.name || ''} onChange={(e) => handleGlobalChange('name', e.target.value)} />
              </div>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-neutral-400 mb-1 uppercase tracking-wider">{t('customFont')}</label>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('fontPlaceholder')} value={themeData.font} onChange={(e) => handleGlobalChange('font', e.target.value)} />
                  <label className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-3 py-2 cursor-pointer flex items-center justify-center transition-colors text-sm whitespace-nowrap" title={t('fontUpload')}>
                    <Type size={16} className="mr-2"/> {t('fontUpload')}
                    <input type="file" accept=".ttf,.otf,.woff,.woff2" className="hidden" onChange={handleFontUpload} />
                  </label>
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">{t('fontNotice')}</p>
              </div>

              <h3 className="text-sm font-bold text-neutral-300 border-b border-neutral-700 pb-2 mb-4 mt-6">{t('colorStyles')}</h3>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  { key: 'textPrimary', label: t('textPrimary') },
                  { key: 'textSecondary', label: t('textSecondary') },
                  { key: 'bgOverlay', label: t('bgOverlay') },
                  { key: 'statusBarBg', label: t('statusBarBg') },
                  { key: 'btnNormal', label: t('btnNormal') },
                  { key: 'btnFocused', label: t('btnFocused') },
                  { key: 'btnFocusedText', label: t('btnFocusedText') }
                ].map(item => (
                  <React.Fragment key={item.key}>
                    {renderColorInput(item.label, themeData[item.key], (val) => handleGlobalChange(item.key, val))}
                  </React.Fragment>
                ))}
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('defaultRadius')}</label>
                  <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm font-mono" value={themeData.button_radius} onChange={(e) => handleGlobalChange('button_radius', parseInt(e.target.value))} />
                </div>
                {/* 🚀 [여기 추가됨!] 버튼 내부 텍스트 정렬 드롭다운 */}
                    <div className="col-span-2 mt-2">
                      <label className="block text-xs text-neutral-400 mb-1">{t('textAlign')}</label>
                      <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_align || 'left'} onChange={(e) => handleElementChange(selectedElement.id, 'text_align', e.target.value)}>
                        <option value="left">Left (왼쪽)</option>
                        <option value="center">Center (가운데)</option>
                        <option value="right">Right (오른쪽)</option>
                        <option value="top">Top (위쪽)</option>
                        <option value="bottom">Bottom (아래쪽)</option>
                      </select>
                    </div>
              </div>
            </div>
          )}

          {/* 📌 요소 목록 탭 */}
          {activeTab === 'elements' && !selectedElement && (
            <div className="space-y-4 animate-in fade-in">
              <button 
                onClick={handleAddElement}
                className="w-full py-3 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-white font-bold rounded flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={18} /> {t('addElement')}
              </button>

              <div className="space-y-2 mt-4">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t('currentElements')}</div>
                {themeData.main_menu.map(el => (
                  <div 
                    key={el.id} 
                    className="flex justify-between items-center bg-neutral-900 border border-neutral-700 p-3 rounded cursor-pointer hover:border-cyan-500 transition-colors"
                    onClick={() => { if(!isPlayMode) setSelectedId(el.id); }}
                  >
                    <div>
                      <div className="text-white font-bold text-sm">{el.id}</div>
                      <div className="text-xs text-neutral-500">
                         {el.type === 'button' && t('typeButton')}
                         {el.type === 'box' && t('typeBox')}
                         {el.type === 'widget_clock' && t('typeClock')}
                         {el.type === 'widget_analog_clock' && t('typeAnalogClock')}
                         {el.type === 'widget_album' && t('typeAlbum')}
                         {el.type === 'widget_battery' && t('typeBattery')}
                         {el.type === 'widget_circular_battery' && t('typeCircularBattery')}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteElement(el.id); }} 
                      className="text-red-400 hover:text-red-300 p-2 rounded hover:bg-neutral-800 transition-colors"
                      title={t('delete')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 📌 개별 요소 설정 탭 */}
          {activeTab === 'elements' && selectedElement && (
            <div className="space-y-5 animate-in fade-in">
              
              <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setSelectedId(null)} 
                    className="p-1 -ml-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                  >
                    <ChevronLeft size={20}/>
                  </button>
                  <h3 className="font-bold text-white flex items-center gap-2 ml-1">
                    <Type size={18} className="text-cyan-400"/> {selectedElement.id}
                  </h3>
                </div>
                
                <button 
                  onClick={() => handleDeleteElement(selectedElement.id)} 
                  className="text-xs flex items-center gap-1 text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-2 py-1 rounded transition-colors"
                >
                  <Trash2 size={14} /> {t('delete')}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('idLabel')}</label>
                  <input 
                    type="text" 
                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" 
                    value={selectedElement.id} 
                    onChange={(e) => {
                      const newId = e.target.value;
                      handleElementChange(selectedElement.id, 'id', newId);
                      setSelectedId(newId);
                    }} 
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('typeLabel')}</label>
                  <select 
                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm cursor-pointer" 
                    value={selectedElement.type} 
                    onChange={(e) => handleElementChange(selectedElement.id, 'type', e.target.value)}
                  >
                    <option value="button">{t('typeButton')}</option>
                    <option value="box">{t('typeBox')}</option>
                    <option value="widget_clock">{t('typeClock')}</option>
                    <option value="widget_analog_clock">{t('typeAnalogClock')}</option>
                    <option value="widget_album">{t('typeAlbum')}</option>
                    <option value="widget_battery">{t('typeBattery')}</option>
                    <option value="widget_circular_battery">{t('typeCircularBattery')}</option>
                  </select>
                </div>
                
                <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2">
                  <span className="text-xs font-bold text-neutral-300 uppercase">{t('layoutCoords')}</span>
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('gravityLabel')}</label>
                  <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.gravity || 'top|left'} onChange={(e) => handleElementChange(selectedElement.id, 'gravity', e.target.value)}>
                    <option value="top|left">Top | Left</option>
                    <option value="top|right">Top | Right</option>
                    <option value="bottom|left">Bottom | Left</option>
                    <option value="bottom|right">Bottom | Right</option>
                    <option value="top|center_horizontal">Top | Center(H)</option>
                    <option value="bottom|center_horizontal">Bottom | Center(H)</option>
                    <option value="center">Center</option>
                  </select>
                </div>
                <div></div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('xLabel')}</label>
                  <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.x || 0} onChange={(e) => handleElementChange(selectedElement.id, 'x', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('yLabel')}</label>
                  <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.y || 0} onChange={(e) => handleElementChange(selectedElement.id, 'y', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('widthLabel')}</label>
                  <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.width || 0} onChange={(e) => handleElementChange(selectedElement.id, 'width', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('heightLabel')}</label>
                  <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('heightPlaceholder')} value={selectedElement.height || 0} onChange={(e) => handleElementChange(selectedElement.id, 'height', parseInt(e.target.value))} />
                </div>

                <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2">
                  <span className="text-xs font-bold text-neutral-300 uppercase">{t('indivDesign')}</span>
                </div>
                <div className="col-span-2">
                  {renderColorInput(t('bgColorLabel'), selectedElement.bg_color, (val) => handleElementChange(selectedElement.id, 'bg_color', val))}
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('radiusLabel')}</label>
                  <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('radiusPlaceholder')} value={selectedElement.radius !== undefined ? selectedElement.radius : -1} onChange={(e) => handleElementChange(selectedElement.id, 'radius', parseInt(e.target.value))} />
                </div>
                {/* 🚀 [추가] 박스 전용 이미지 업로드 기능 */}
                {selectedElement.type === 'box' && (
                  <>
                    <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2">
                      <span className="text-xs font-bold text-neutral-300 uppercase">Box Image (Optional)</span>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-neutral-400 mb-1">{t('iconLabel')}</label>
                      <div className="flex gap-2">
                        <input type="text" className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('iconPlaceholder')} value={selectedElement.icon_normal || ''} onChange={(e) => handleElementChange(selectedElement.id, 'icon_normal', e.target.value)} />
                        <label className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-3 py-2 cursor-pointer flex items-center justify-center transition-colors" title={t('loadImage')}>
                          <ImageIcon size={16} />
                          <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={(e) => handleImageUpload(selectedElement.id, e.target.files[0], 'icon_normal')} />
                        </label>
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1">{t('imageNotice')}</p>
                    </div>
                  </>
                )}
                {selectedElement.type !== 'box' && (
                  <>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">{t('paddingLabel')}</label>
                      <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.padding || 0} onChange={(e) => handleElementChange(selectedElement.id, 'padding', parseInt(e.target.value))} />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">{t('titleTextSize')}</label>
                      <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_size || 0} onChange={(e) => handleElementChange(selectedElement.id, 'text_size', parseInt(e.target.value))} />
                    </div>
                  </>
                )}

                {selectedElement.type === 'widget_album' && (
                  <>
                    <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2">
                      <span className="text-xs font-bold text-neutral-300 uppercase">{t('albumProps')}</span>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">{t('textPos')}</label>
                      <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_position || 'bottom'} onChange={(e) => handleElementChange(selectedElement.id, 'text_position', e.target.value)}>
                        <option value="bottom">Bottom</option>
                        <option value="top">Top</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">{t('textAlign')}</label>
                      <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_align || 'center'} onChange={(e) => handleElementChange(selectedElement.id, 'text_align', e.target.value)}>
                        <option value="center">Center</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">{t('subTextSize')}</label>
                      <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_secondary_size || 0} onChange={(e) => handleElementChange(selectedElement.id, 'text_secondary_size', parseInt(e.target.value))} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-neutral-400 mb-1">{t('albumPreview')}</label>
                      <label className="w-full bg-neutral-700 hover:bg-neutral-600 text-white rounded p-2 cursor-pointer flex items-center justify-center gap-2 transition-colors text-sm">
                        <ImageIcon size={16} /> {t('loadImage')}
                        <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={(e) => handleImageUpload(selectedElement.id, e.target.files[0], null)} />
                      </label>
                    </div>
                  </>
                )}

                {selectedElement.type === 'button' && (
                  <>
                    <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2">
                      <span className="text-xs font-bold text-neutral-300 uppercase">{t('btnSettings')}</span>
                    </div>
                    
                    {/* 🚀 포커스 고유 번호 수동 입력 필드 추가 */}
                    <div className="col-span-2">
                      <label className="block text-xs text-neutral-400 mb-1">{t('focusIndexLabel')}</label>
                      <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm font-mono text-cyan-400" value={selectedElement.focus_index !== undefined ? selectedElement.focus_index : 0} onChange={(e) => handleElementChange(selectedElement.id, 'focus_index', parseInt(e.target.value))} />
                    </div>

                    <div className="col-span-2 mt-2">
                      <label className="block text-xs text-neutral-400 mb-1">{t('btnText')}</label>
                      <input type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_normal || ''} onChange={(e) => handleElementChange(selectedElement.id, 'text_normal', e.target.value)} />
                    </div>
                    <div className="col-span-2 mt-2">
                      <label className="block text-xs text-neutral-400 mb-1">{t('actionLabel')}</label>
                      <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.action || 'OPEN_PLAYER'} onChange={(e) => handleElementChange(selectedElement.id, 'action', e.target.value)}>
                        <option value="OPEN_PLAYER">{t('actNowPlaying')}</option>
                        <option value="OPEN_BROWSER">{t('actLibrary')}</option>
                        <option value="OPEN_ROOT_FOLDER">{t('actRoot')}</option>
                        <option value="OPEN_BLUETOOTH">{t('actBluetooth')}</option>
                        <option value="OPEN_WIFI">{t('actWifi')}</option>
                        <option value="OPEN_WEBSERVER">{t('actWeb')}</option>
                        <option value="OPEN_SETTINGS">{t('actSettings')}</option>
                        <option value="OPEN_WIDGET_SETTINGS">{t('actWidget')}</option>
                        <option value="OPEN_BACKGROUND_SETTINGS">{t('actBg')}</option>
                        <option value="OPEN_THEME_SETTINGS">{t('actTheme')}</option>
                        <option value="OPEN_TIME_SETTINGS">{t('actTime')}</option>
                        <option value="OPEN_BRIGHTNESS">{t('actBrightness')}</option>
                        <option value="OPEN_STORAGE_INFO">{t('actStorage')}</option>
                      </select>
                    </div>
                    <div className="col-span-2 mt-2">
                      <label className="block text-xs text-neutral-400 mb-1">{t('iconLabel')}</label>
                      <div className="flex gap-2">
                        <input type="text" className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('iconPlaceholder')} value={selectedElement.icon_normal || ''} onChange={(e) => handleElementChange(selectedElement.id, 'icon_normal', e.target.value)} />
                        <label className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-3 py-2 cursor-pointer flex items-center justify-center transition-colors" title={t('loadImage')}>
                          <ImageIcon size={16} />
                          <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={(e) => handleImageUpload(selectedElement.id, e.target.files[0], 'icon_normal')} />
                        </label>
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1">{t('imageNotice')}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-neutral-700 bg-neutral-800 flex gap-2">
          <label className="flex-1 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg text-sm">
            <Upload size={18} /> {t('importBtn')}
            <input type="file" accept=".json" className="hidden" onChange={handleImportJSON} />
          </label>
          <button 
            onClick={handleDownloadZIP}
            disabled={isZipping}
            className={`flex-1 py-3 text-white font-bold rounded flex items-center justify-center gap-2 shadow-lg transition-colors text-sm ${isZipping ? 'bg-cyan-800 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500'}`}
          >
            {isZipping ? (
              <span className="flex items-center gap-2">{t('zipProgress')}</span>
            ) : (
              <><Download size={18} /> {t('downloadBtn')}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}