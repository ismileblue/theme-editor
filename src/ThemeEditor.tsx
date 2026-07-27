import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { Download, Plus, Trash2, Settings, List, Smartphone, Type, Image as ImageIcon, ChevronLeft, MousePointer2, Play, Upload, MonitorPlay, LayoutTemplate } from 'lucide-react';

const translations = {
  en: {
    deleteConfirm: "Are you sure you want to delete this element?",
    language: "Language",
    preview: "Preview",
    editMode: "Edit Mode",
    playMode: "Play Mode",
    targetMainMenu: "Main Menu",
    targetPlayerUI: "Player Screen",
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
    addLine: "Add Custom Line",
    addCoreElement: "Add Missing Core UI",
    currentElements: "Current Placed Elements",
    delete: "Delete",
    idLabel: "ID (Unique string)",
    typeLabel: "Type",
    typeButton: "Standard Button",
    typeLine: "Design Line (Divider)",
    typeClock: "Widget: Digital Clock",
    typeAnalogClock: "Widget: Analog Clock",
    typeAlbum: "Widget: Album Art",
    typeBattery: "Widget: Battery Bar",
    typeCircularBattery: "Widget: Circular Battery",
    typeFocusImage: "Widget: Dynamic Focus Image", previewImageLabel: "Focus Preview Image",
    typeBox: "Design Box (Background Split)",
    typeListBox: "List Box (Scroll Container)",
    layoutCoords: "Layout & Coordinates",
    gravityLabel: "Gravity (Anchor)",
    xLabel: "X (Horiz Offset)",
    yLabel: "Y (Vert Offset)",
    widthLabel: "Width",
    heightLabel: "Height",
    heightPlaceholder: "0 = Auto",
    indivDesign: "Individual Design (Bg/Box/Line)",
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
    focusIndexLabel: "Focus Order (Index)",
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
    actRoot: "Root Folder (File Manager)",
    actRadio: "FM Radio",
    actAudiobooks: "Audiobooks Library",
    actPodcasts: "Podcasts Library",
    actCoverFlow: "Cover Flow (3D Albums)",
    parentIdLabel: "Parent ID (Container)",
    visibleFocusLabel: "Visible on Focus (Target Button ID)",
    visibleFocusDesc: "Leave blank to always show. e.g., btn_now"
  },
  ko: {
    deleteConfirm: "정말 삭제하시겠습니까? 요소 :",
    language: "언어",
    preview: "미리보기",
    editMode: "편집 모드",
    playMode: "플레이 모드",
    targetMainMenu: "메인 메뉴 화면",
    targetPlayerUI: "플레이어 화면",
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
    addElement: "메인 요소 추가하기",
    addLine: "새로운 선(Line) 긋기",
    addCoreElement: "누락된 핵심 부품 추가",
    currentElements: "현재 배치된 요소 목록",
    delete: "삭제",
    idLabel: "ID (영문 고유값)",
    typeLabel: "Type (종류)",
    typeButton: "일반 버튼 (Button)",
    typeLine: "디자인 선 (Divider Line)",
    typeClock: "위젯: 디지털 시계",
    typeAnalogClock: "위젯: 아날로그 시계",
    typeAlbum: "위젯: 앨범 아트 (Album)",
    typeBattery: "위젯: 배터리 바",
    typeCircularBattery: "위젯: 원형 배터리",
    typeFocusImage: "위젯: 다이내믹 포커스 이미지", previewImageLabel: "포커스 전용 이미지",
    typeBox: "디자인 박스 (배경 분할용)",
    typeListBox: "리스트 상자 (스크롤 컨테이너)",
    layoutCoords: "레이아웃 및 좌표",
    gravityLabel: "Gravity (기준점)",
    xLabel: "X (가로 여백)",
    yLabel: "Y (세로 여백)",
    widthLabel: "Width (너비, 선 굵기)",
    heightLabel: "Height (높이, 선 굵기)",
    heightPlaceholder: "0 = 자동(Auto)",
    indivDesign: "개별 디자인 (배경/박스/선 색상)",
    bgColorLabel: "색상 (Bg Color)",
    radiusLabel: "둥글기 (Radius)",
    radiusPlaceholder: "-1 = 글로벌 설정 따름",
    paddingLabel: "안쪽 여백 (Padding)",
    titleTextSize: "글자 크기 (Text Size)",
    albumProps: "앨범 텍스트 속성",
    textPos: "텍스트 위치 (Position)",
    textAlign: "텍스트 정렬 (Align)",
    subTextSize: "서브 글자 크기",
    albumPreview: "앨범 커버 미리보기 (테스트용)",
    loadImage: "PC에서 이미지 불러오기",
    btnSettings: "버튼 설정",
    btnText: "버튼 글자 (Text)",
    actionLabel: "실행 동작 (Action)",
    focusIndexLabel: "포커스 순서 (고유 번호)",
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
    actRoot: "전체 폴더 (파일 탐색기)",
    actRadio: "FM 라디오 (Radio)",
    actAudiobooks: "오디오북 (Audiobooks)",
    actPodcasts: "팟캐스트 (Podcasts)",
    actCoverFlow: "커버 플로우 (3D 앨범 뷰)",
    parentIdLabel: "부모 상자 ID (리스트 등)",
    visibleFocusLabel: "특정 포커스 시 표시 (타겟 버튼 ID)",
    visibleFocusDesc: "항상 보이려면 비워두세요. 예: btn_now"
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

  const [editTarget, setEditTarget] = useState('main_menu'); 

  const [themeData, setThemeData] = useState({
    name: "Royal Gold (List Version)",
    font: "default",
    bg_image: "",
    textPrimary: "#FFFFFFFF",
    textSecondary: "#FFFDE047",
    bgOverlay: "#0E1A1A1A",
    statusBarBg: "#B61A1A1A",
    btnNormal: "#00000000",
    btnFocused: "#FF222222",
    btnFocusedText: "#FFFFFFFF",
    button_radius: 0,
    main_menu: [
      { id: "box", type: "box", x: 0, y: 0, width: 240, height: 325, gravity: "top|left", bg_color: "#A01A1510", radius: 0, padding: 0, action: "NONE", focus_index: -1 },
      { id: "main_scroll_list", type: "list_box", x: 10, y: 15, width: 220, height: 290, bg_color: "", radius: 0, padding: -1, gravity: "top|left" },
      { id: "btn_now", parent_id: "main_scroll_list", type: "button", x: 0, y: 0, width: -1, height: 48, text_normal: "Now Playing", text_right: "〉", action: "OPEN_PLAYER", focus_index: 0, text_align: "left", bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "music_circle.png" },
      { id: "btn_coverflow", parent_id: "main_scroll_list", type: "button", x: 0, y: 8, width: -1, height: 48, text_normal: "Cover Flow", text_right: "〉", action: "OPEN_COVER_FLOW", focus_index: 1, text_align: "left", radius: -1, bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "cover.png" },
      { id: "btn_music", parent_id: "main_scroll_list", type: "button", x: 0, y: 8, width: -1, height: 48, text_normal: "Music", text_right: "〉", action: "OPEN_BROWSER", focus_index: 2, text_align: "left", bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "music_list.png" },
      { id: "btn_playlist", parent_id: "main_scroll_list", type: "button", x: 0, y: 8, width: -1, height: 48, text_normal: "Playlists", text_right: "〉", action: "OPEN_PLAYLISTS", focus_index: 3, text_align: "left", bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "playlist.png" },
      { id: "btn_radio", parent_id: "main_scroll_list", type: "button", x: 0, y: 8, width: -1, height: 48, text_normal: "Radio", text_right: "〉", action: "OPEN_RADIO", focus_index: 4, text_align: "left", bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "radio_circle.png" },
      { id: "btn_audiobook", parent_id: "main_scroll_list", type: "button", x: 0, y: 8, width: -1, height: 48, text_normal: "Audiobooks", text_right: "〉", action: "OPEN_AUDIOBOOKS", focus_index: 5, text_align: "left", bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "book.png" },
      { id: "btn_podcast", parent_id: "main_scroll_list", type: "button", x: 0, y: 8, width: -1, height: 48, text_normal: "Podcasts", text_right: "〉", action: "OPEN_PODCASTS", focus_index: 6, text_align: "left", bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "icon_podcast.png" },
      { id: "btn_bt", parent_id: "main_scroll_list", type: "button", x: 0, y: 8, width: -1, height: 48, text_normal: "Bluetooth", text_right: "〉", action: "OPEN_BLUETOOTH", focus_index: 7, text_align: "left", bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "bluetooth_circle.png" },
      { id: "btn_wifi", parent_id: "main_scroll_list", type: "button", x: 0, y: 8, width: -1, height: 48, text_normal: "Wi-Fi", text_right: "〉", action: "OPEN_WIFI", focus_index: 8, text_align: "left", bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "wifi_circle.png" },
      { id: "btn_set", parent_id: "main_scroll_list", type: "button", x: 0, y: 8, width: -1, height: 48, text_normal: "Settings", text_right: "〉", action: "OPEN_SETTINGS", focus_index: 9, text_align: "left", bg_color: "#00000000", text_right_color: "#D4AF37", text_size: 22, preview_image: "setting_circle.png" },
      { id: "widget_clock", type: "widget_clock", visible_on_focus: "btn_now", x: 284, y: 18, width: 150, height: 81, gravity: "top|left", text_size: 16, bg_color: "", radius: 8, padding: 0, focus_index: -1 },
      { id: "widget_album", type: "widget_album", visible_on_focus: "btn_now", x: 254, y: 13, width: 211, height: 212, gravity: "bottom|left", text_size: 16, text_secondary_size: 12, bg_color: "", radius: 0, padding: -1, focus_index: -1, text_align: "center", text_position: "bottom" },
      { id: "preview", type: "widget_focus_image", visible_on_focus: "", x: 290, y: 90, width: 140, height: 140, gravity: "top|left", bg_color: "", radius: 0, padding: -1, focus_index: -1 }
    ],
    player_ui: [
      { id: "background", type: "color", bg_color: "#0E1A1A1A" },
      
      // 1. 좌/우측 상단 상태 아이콘들
      { id: "track_count", type: "text", x: 15, y: 15, width: 100, height: 25, gravity: "top|left", text_size: 14, text_align: "left", bg_color: "#FFFFFFFF" },
      { id: "shuffle_icon", type: "text", x: 45, y: 15, width: 24, height: 24, gravity: "top|right", text_align: "center", bg_color: "#FFFFFFFF" },
      { id: "repeat_icon", type: "text", x: 15, y: 15, width: 24, height: 24, gravity: "top|right", text_align: "center", bg_color: "#FFFFFFFF" },
      
      // 2. 좌측 음질 정보 알약 캡슐
      { id: "quality_info", type: "box", x: 15, y: 45, width: -1, height: -1, gravity: "top|left", text_align: "vertical", bg_color: "#00000000" },
      
      // 3. 중앙 정렬 순정 플레이어 레이아웃 (앨범 -> 제목 -> 가수 -> 프로그레스바)
      { id: "album_art", type: "album_art", x: 0, y: 40, width: 190, height: 190, gravity: "top|center_horizontal", radius: 5 },
      { id: "title", type: "text", x: 0, y: 245, width: 440, height: 35, gravity: "top|center_horizontal", text_size: 24, text_align: "center", bg_color: "#FFFFFFFF" },
      { id: "artist", type: "text", x: 0, y: 285, width: 440, height: 25, gravity: "top|center_horizontal", text_size: 16, text_align: "center", bg_color: "#FFFDE047" },
      { id: "progress_bar", type: "progress_bar", x: 0, y: 330, width: 400, height: 12, gravity: "top|center_horizontal", radius: 6, bg_color: "#DDEAB308" }
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
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [dragInfo, setDragInfo] = useState({ isDragging: false, id: null, startX: 0, startY: 0, initialElementX: 0, initialElementY: 0 });

  // 🚀 플레이어 화면의 핵심 컴포넌트 목록 (누락 시 추가하기 위함)
 // 🚀 플레이어 화면의 핵심 컴포넌트 목록 (누락 시 추가하기 위함)
// 🚀 플레이어 화면의 핵심 컴포넌트 목록 (누락 시 추가하기 위함)
  const corePlayerElements = ['album_art', 'title', 'album', 'artist', 'progress_bar', 'track_count', 'quality_info', 'shuffle_icon', 'repeat_icon'];
    const missingCoreElements = editTarget === 'player_ui' ? corePlayerElements.filter(id => !themeData.player_ui.some(el => el.id === id)) : [];

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!dragInfo.isDragging) return;
      const clientX = e.clientX ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientX : undefined);
      const clientY = e.clientY ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientY : undefined);
      if (clientX === undefined) return;

      setThemeData(prev => {
        const currentArray = prev[editTarget] || [];
        const el = currentArray.find(elem => elem.id === dragInfo.id);
        if (!el) return prev;

        let deltaX = (clientX - dragInfo.startX) / zoomLevel;
        let deltaY = (clientY - dragInfo.startY) / zoomLevel;

        const g = el.gravity ? el.gravity.toLowerCase() : 'top|left';
        if (g.includes('right')) deltaX = -deltaX;
        if (g.includes('bottom')) deltaY = -deltaY;

        return {
          ...prev,
          [editTarget]: currentArray.map(item =>
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
  }, [dragInfo, zoomLevel, editTarget]);

  const handleImportJSON = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          if (importedData) {
            if (!importedData.player_ui) importedData.player_ui = [];
            setThemeData(importedData);
            setSelectedId(null); 
            alert(t('importSuccess'));
          } else alert(t('importFail'));
        } catch (error) { alert(t('importFail')); }
      };
      reader.readAsText(file);
      e.target.value = ''; 
      return;
    }

    if (file.name.endsWith('.zip')) {
      try {
        const JSZip = await loadJSZip();
        const zip = await JSZip.loadAsync(file);
        const configEntry = zip.file("config.json");
        if (!configEntry) { alert(t('importFail')); return; }

        const configText = await configEntry.async("text");
        const importedData = JSON.parse(configText);
        if (!importedData.player_ui) importedData.player_ui = [];
        
        const newPreviewImages = {};
        const newUploadedFiles = {};

        for (const relativePath in zip.files) {
          const zipEntry = zip.files[relativePath];
          if (!zipEntry.dir && relativePath !== "config.json") {
            const blob = await zipEntry.async("blob");
            const fileObj = new File([blob], relativePath, { type: blob.type || 'image/png' });
            newUploadedFiles[relativePath] = fileObj;
            const url = URL.createObjectURL(blob);
            
            if (importedData.main_menu) {
              importedData.main_menu.forEach(el => {
                if (el.icon_normal === relativePath) {
                  newPreviewImages[el.id] = url;
                  newPreviewImages[`${el.id}_icon_normal`] = url;
                }
                if (el.preview_image === relativePath) {
                  newPreviewImages[`${el.id}_preview_image`] = url;
                }
              });
            }
          }
        }

        setThemeData(importedData);
        setPreviewImages(prev => ({ ...prev, ...newPreviewImages }));
        setUploadedFiles(prev => ({ ...prev, ...newUploadedFiles }));
        setSelectedId(null);
        alert(t('importSuccess'));

      } catch (error) { alert("Failed to read ZIP file."); }
    }
    e.target.value = '';
  };

  const handleImageUpload = (id, file, targetField) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 800;
        let width = img.width; let height = img.height;

        if (width > height) { if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; } } 
        else { if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; } }

        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if(!blob) return;
          const resizedFile = new File([blob], file.name, { type: file.type || 'image/jpeg' });
          const url = URL.createObjectURL(resizedFile);

          setPreviewImages(prev => ({ ...prev, [id]: url, [`${id}_${targetField}`]: url }));
          setUploadedFiles(prev => ({ ...prev, [file.name]: resizedFile }));

          if (targetField) {
            handleElementChange(id, targetField, file.name);
            if (targetField === 'icon_normal') {
              handleElementChange(id, 'text_normal', file.name);
            }
          }
        }, file.type || 'image/jpeg', 0.85); 
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFontUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const familyName = 'CustomFont_' + Date.now();
    setFontUrl(url); setFontFamilyName(familyName);
    setUploadedFiles(prev => ({ ...prev, [file.name]: file }));
    handleGlobalChange('font', file.name);
  };

  const handleGlobalChange = (key, value) => {
    setThemeData(prev => ({ ...prev, [key]: value }));
  };

  const handleElementChange = (id, key, value) => {
    setThemeData(prev => ({
      ...prev,
      [editTarget]: prev[editTarget].map(el =>
        el.id === id ? { ...el, [key]: value } : el
      )
    }));
  };

  const handlePointerDown = (e, id) => {
    if (isPlayMode) return;
    e.stopPropagation();
    setSelectedId(id);
    setActiveTab('elements');

    const el = themeData[editTarget].find(item => item.id === id);
    const clientX = e.clientX ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientX : undefined);
    const clientY = e.clientY ?? (e.touches && e.touches.length > 0 ? e.touches[0].clientY : undefined);

    if (el && clientX !== undefined) {
      setDragInfo({
        isDragging: true, id: id,
        startX: clientX, startY: clientY,
        initialElementX: el.x || 0, initialElementY: el.y || 0
      });
    }
  };

  const handleAddMainMenuElement = () => {
    const newId = `item_${Date.now()}`;
    const newElement = {
      id: newId, type: "button", x: 0, y: 0, width: 150, height: 50, gravity: "top|left",
      text_normal: "New Item", text_size: 16, bg_color: "", radius: -1, padding: 0, action: "OPEN_PLAYER",
      focus_index: themeData.main_menu.length, text_align: "left"
    };
    setThemeData(prev => ({ ...prev, main_menu: [...prev.main_menu, newElement] }));
    setSelectedId(newId);
  };

  const handleAddPlayerElement = (elementId) => {
    if (elementId === 'line') {
      const newId = `line_${Date.now()}`;
      const newElement = { id: newId, type: "line", x: 0, y: 0, width: 200, height: 2, gravity: "top|left", bg_color: "#FFFFFFFF" };
      setThemeData(prev => ({ ...prev, player_ui: [...prev.player_ui, newElement] }));
      setSelectedId(newId);
      return;
    }

    // 👇 [여기에 박스 생성기 신규 추가!]
    if (elementId === 'box') {
      const newId = `box_${Date.now()}`;
      const newElement = { id: newId, type: "box", x: 0, y: 0, width: 250, height: 150, gravity: "center", bg_color: "#44000000", radius: 15 };
      setThemeData(prev => ({ ...prev, player_ui: [...prev.player_ui, newElement] }));
      setSelectedId(newId);
      return;
    }
    // 👆 [추가 끝]

    // 누락된 핵심 부품 복구용 템플릿
    const templates = {
       shuffle_icon: { id: "shuffle_icon", x: 260, y: 25, width: 24, height: 24, text_align: "center", bg_color: "#FFFFFFFF" },
       repeat_icon: { id: "repeat_icon", x: 290, y: 25, width: 24, height: 24, text_align: "center", bg_color: "#FFFFFFFF" },
       quality_info: { id: "quality_info", x: 16, y: 60, text_align: "horizontal", bg_color: "#00FFFFFF" },
       track_count: { id: "track_count", x: 15, y: 25, width: 100, height: -1, text_size: 14, text_align: "left", bg_color: "#FFFFFFFF" },
       album_art: { id: "album_art", x: 65, y: 70, width: 190, height: 190 },
       title: { id: "title", x: 10, y: 285, width: 300, height: -1, text_size: 22, text_align: "center", bg_color: "#FFFFFFFF" },
       album: { id: "album", x: 10, y: 260, width: 300, height: -1, text_size: 14, text_align: "center", bg_color: "#FF9800" },
       artist: { id: "artist", x: 10, y: 320, width: 300, height: -1, text_size: 16, text_align: "center", bg_color: "#FFE0E0E0" },
       progress_bar: { id: "progress_bar", x: 16, y: 360, width: 288, height: 24, radius: 12, bg_color: "" }
    };

    if (templates[elementId]) {
      setThemeData(prev => ({ ...prev, player_ui: [...prev.player_ui, templates[elementId]] }));
      setSelectedId(elementId);
    }
  };

  const handleDeleteElement = (id) => {
    setThemeData(prev => ({
      ...prev,
      [editTarget]: prev[editTarget].filter(el => el.id !== id)
    }));
    if (selectedId === id) setSelectedId(null);
  };
// 🚀 [레이어 이동 엔진] 요소를 위/아래로 움직여서 Z-index를 조절합니다!
  const handleMoveElement = (index, direction) => {
    setThemeData(prev => {
      const newList = [...prev[editTarget]];
      const targetIndex = index + direction;
      
      // 배열 범위를 벗어나지 않게 방어막
      if (targetIndex < 0 || targetIndex >= newList.length) return prev;
      
      // 두 요소의 자리를 스왑(Swap)!
      const temp = newList[index];
      newList[index] = newList[targetIndex];
      newList[targetIndex] = temp;
      
      return { ...prev, [editTarget]: newList };
    });
  };
  const handleDownloadZIP = async () => {
    setIsZipping(true);
    try {
      const JSZip = await loadJSZip();
      const zip = new JSZip();
      zip.file("config.json", JSON.stringify(themeData, null, 2));
      Object.values(uploadedFiles).forEach(file => { zip.file(file.name, file); });
      const zipContent = await zip.generateAsync({ type: "blob" });
      const safeName = themeData.name ? themeData.name.replace(/[\/\\?%*:|"<>]/g, '_') : 'theme';
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.href = URL.createObjectURL(zipContent);
      downloadAnchorNode.download = `${safeName}.zip`;
      document.body.appendChild(downloadAnchorNode); 
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } catch (error) { alert("Failed to create ZIP file."); } finally { setIsZipping(false); }
  };

  const getStyleFromElement = (el, isChild = false) => {
    if (isChild) {
      return {
        position: 'relative', width: `calc(100% - ${el.x * 2}px)`, height: el.height > 0 ? `${el.height}px` : 'auto',
        marginLeft: `${el.x}px`, marginRight: `${el.x}px`, marginTop: `${el.y}px`, flexShrink: 0,
        userSelect: 'none', WebkitUserSelect: 'none'
      };
    }
    const style = {
      position: 'absolute', width: el.width > 0 ? `${el.width}px` : 'auto', height: el.height > 0 ? `${el.height}px` : 'auto',
      userSelect: 'none', WebkitUserSelect: 'none'
    };
    const g = el.gravity ? el.gravity.toLowerCase() : 'top|left';
    if (g.includes('center_horizontal') || g === 'center') { style.left = `calc(50% + ${el.x}px)`; style.transform = 'translateX(-50%)'; } 
    else if (g.includes('right')) { style.right = `${el.x}px`; } 
    else { style.left = `${el.x}px`; }
    if (g.includes('center_vertical') || g === 'center') { style.top = `calc(50% + ${el.y}px)`; style.transform = style.transform ? style.transform + ' translateY(-50%)' : 'translateY(-50%)'; } 
    else if (g.includes('bottom')) { style.bottom = `${el.y}px`; } 
    else { style.top = `${el.y}px`; }
    return style;
  };

  const renderColorInput = (label, value, onChange) => {
    const hexVal = value || '';
    let alphaHex = 'FF', rgbHex = '#000000';
    if (hexVal.length === 9) { alphaHex = hexVal.substring(1, 3); rgbHex = '#' + hexVal.substring(3, 9); } 
    else if (hexVal.length === 7) { rgbHex = hexVal; }
    const alphaDec = hexVal ? (parseInt(alphaHex, 16) || 0) : 255;
    const alphaPercent = Math.round((alphaDec / 255) * 100);

    return (
      <div className="flex flex-col mb-1">
        <div className="flex justify-between items-end text-xs mb-1">
          <label className="text-neutral-400 font-bold text-[11px] uppercase">{label}</label>
          {hexVal.length >= 7 && <span className="text-cyan-400 font-mono text-[10px] font-bold">{t('alpha')}: {alphaPercent}%</span>}
        </div>
        <div className="flex gap-2 mb-2">
          <input type="color" value={rgbHex} onChange={(e) => { onChange(`#${alphaHex}${e.target.value.toUpperCase().substring(1)}`); }} className="w-9 h-9 p-0 border-0 rounded cursor-pointer shrink-0 bg-transparent overflow-hidden"/>
          <input type="text" className="flex-1 min-w-0 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm font-mono uppercase placeholder-neutral-600" placeholder="#AARRGGBB" value={hexVal} onChange={(e) => onChange(e.target.value.toUpperCase())} />
        </div>
        {hexVal.length >= 7 && (
          <input type="range" min="0" max="255" value={alphaDec} onChange={(e) => { const newAlphaHex = parseInt(e.target.value).toString(16).padStart(2, '0').toUpperCase(); onChange(`#${newAlphaHex}${rgbHex.substring(1)}`); }} className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"/>
        )}
      </div>
    );
  };

  // ============================================================================
  // 🔥 [렌더링 엔진] 1. 메인 메뉴 화면용 렌더러
  // ============================================================================
  const renderMainMenuElement = (el, isChild = false) => {
    const isSelected = selectedId === el.id;
    const boxStyle = getStyleFromElement(el, isChild); 
    const bgColorWeb = el.bg_color ? androidHexToWeb(el.bg_color) : 'transparent';
    const radius = el.radius !== undefined && el.radius !== -1 ? el.radius : themeData.button_radius;
    
    if (el.type === 'widget_analog_clock') { boxStyle.backgroundColor = 'transparent'; } 
    else { boxStyle.backgroundColor = bgColorWeb; }
    boxStyle.borderRadius = `${radius}px`;
    if (el.type !== 'button') { boxStyle.padding = el.padding ? `${el.padding}px` : '0px'; }
    boxStyle.border = (!isPlayMode && isSelected) ? '2px dashed #00FFFF' : '2px solid transparent';
    boxStyle.boxSizing = 'border-box';
    boxStyle.cursor = isPlayMode ? 'default' : (dragInfo.isDragging && dragInfo.id === el.id ? 'grabbing' : 'grab');

    if (isPlayMode && el.visible_on_focus && el.visible_on_focus.trim() !== '') {
        let activeId = hoveredId;
        if (!activeId) {
            const buttons = themeData.main_menu.filter(e => e.type === 'button').sort((a, b) => (a.focus_index || 0) - (b.focus_index || 0));
            if (buttons.length > 0) activeId = buttons[0].id;
        }
        if (el.visible_on_focus !== activeId) { boxStyle.opacity = 0; boxStyle.pointerEvents = 'none'; } 
        else { boxStyle.opacity = 1; boxStyle.transition = 'opacity 0.2s ease-in-out'; }
    }

    const bindEvents = {
      onMouseDown: (e) => handlePointerDown(e, el.id),
      onTouchStart: (e) => handlePointerDown(e, el.id),
      onContextMenu: (e) => {
        if (isPlayMode) return;
        e.preventDefault(); e.stopPropagation();
        if (window.confirm(`${t('deleteConfirm')} [ ${el.id} ]`)) handleDeleteElement(el.id);
      }
    };

    if (el.type === 'line') {
      return <div key={el.id} style={{...boxStyle, backgroundColor: bgColorWeb !== 'transparent' ? bgColorWeb : '#FFFFFF' }} {...bindEvents}></div>;
    }

    if (el.type === 'box') {
      const previewImg = (el.icon_normal && el.icon_normal.trim() !== '') ? previewImages[el.id] : null;
      return (
        <div key={el.id} style={{...boxStyle, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...bindEvents}>
          {previewImg ? <img src={previewImg} alt="box_img" draggable="false" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          : el.icon_normal ? <ImageIcon color="rgba(255,255,255,0.3)" size={32} /> : null}
        </div>
      );
    }

    if (el.type === 'list_box') {
      const children = themeData.main_menu.filter(child => child.parent_id === el.id).sort((a, b) => (a.focus_index || 0) - (b.focus_index || 0));
      return (
        <div key={el.id} 
             // 🚀 플레이 모드일 때만 스크롤바 숨김 클래스 발동!
             className={isPlayMode ? "hide-scrollbar" : ""}
             style={{
               ...boxStyle, 
               backgroundColor: bgColorWeb !== 'transparent' ? bgColorWeb : 'rgba(255, 255, 255, 0.05)', 
               // 🚀 플레이 모드일 때는 지저분한 점선(Dashed) 가이드라인도 완전히 지워버립니다!
               border: (!isPlayMode && isSelected) ? '2px dashed #00FFFF' : (isPlayMode ? 'none' : '2px dashed rgba(255,255,255,0.3)'), 
               overflowY: 'auto', 
               overflowX: 'hidden', 
               // 🚀 파이어폭스, IE 호환용 스크롤바 숨김 속성
               scrollbarWidth: isPlayMode ? 'none' : 'auto',
               msOverflowStyle: isPlayMode ? 'none' : 'auto',
               display: 'flex', 
               flexDirection: 'column', 
               alignItems: 'center', 
               justifyContent: 'flex-start'
             }} 
             {...bindEvents}>
          {children.length === 0 ? (
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flex: 1, pointerEvents:'none'}}>
              <span style={{color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 'bold'}}>{el.id}</span>
              <span style={{color: 'rgba(255,255,255,0.4)', fontSize: '10px'}}>(List Box)</span>
            </div>
          ) : (
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', padding: `${el.padding || 0}px`}}>
               {children.map(child => renderMainMenuElement(child, true))}
            </div>
          )}
        </div>
      );
    }

    if (el.type === 'button') {
      const isHovered = isPlayMode && hoveredId === el.id;
      const currentBg = isHovered ? androidHexToWeb(themeData.btnFocused) : (bgColorWeb === 'transparent' ? androidHexToWeb(themeData.btnNormal) : bgColorWeb);
      const currentTextColor = isHovered ? androidHexToWeb(themeData.btnFocusedText) : androidHexToWeb(themeData.textPrimary);
      const isIconOnly = !el.text_normal || el.text_normal.trim() === '';
      const previewImg = (el.icon_normal && el.icon_normal.trim() !== '') ? previewImages[el.id] : null;
      const rightColorNormal = el.text_right_color ? androidHexToWeb(el.text_right_color) : androidHexToWeb(themeData.textPrimary);
      const rightColorFocused = el.text_right_focused_color ? androidHexToWeb(el.text_right_focused_color) : androidHexToWeb(themeData.btnFocusedText);
      const currentRightColor = isHovered ? rightColorFocused : rightColorNormal;

      let jc = 'flex-start';
      const scaleVal = el.focus_scale !== undefined ? el.focus_scale : 1.0;
      const innerTransform = isHovered ? `translate(${el.focus_offset_x || 0}px, ${el.focus_offset_y || 0}px) scale(${scaleVal})` : 'translate(0px, 0px) scale(1.0)';
      let ai = 'center'; let ta = (el.text_align || 'left').toLowerCase();
      
      if (isIconOnly) { jc = 'center'; } 
      else {
         if (ta === 'center') { jc = 'center'; ai = 'center'; }
         else if (ta === 'right') { jc = 'flex-end'; ai = 'center'; }
         else if (ta === 'top') { jc = 'center'; ai = 'flex-start'; }
         else if (ta === 'bottom') { jc = 'center'; ai = 'flex-end'; }
      }

      return (
        <div key={el.id} style={boxStyle} {...bindEvents} onMouseEnter={() => setHoveredId(el.id)} onMouseLeave={() => setHoveredId(null)} className="flex items-center text-white overflow-hidden transition-all duration-200">
          <div style={{ backgroundColor: currentBg, borderRadius: `${radius}px`, width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: ai, padding: isIconOnly ? `${el.padding || 0}px` : (ta === 'top' || ta === 'bottom' ? '15px 0' : '0 15px') }}>
            <div style={{ display: 'flex', flex: 1, alignItems: ai, justifyContent: jc, height: isIconOnly ? '100%' : 'auto', transform: innerTransform, transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'}}>
              {previewImg ? <img src={previewImg} alt="icon" draggable="false" style={{width: isIconOnly ? '100%' : '24px', height: isIconOnly ? '100%' : '24px', marginRight: isIconOnly || ta === 'top' || ta === 'bottom' ? '0' : '10px', marginBottom: (ta === 'top' || ta === 'bottom') && !isIconOnly ? '5px' : '0', objectFit: 'contain'}} />
              : el.icon_normal ? <ImageIcon size={isIconOnly ? Math.max(10, Math.min(el.width, el.height) - (el.padding || 0) * 2) : 20} className={isIconOnly ? '' : (ta === 'top' || ta === 'bottom' ? 'mb-1' : 'mr-2')} color={currentTextColor} /> : null}
              {!isIconOnly && ( <span style={{ fontSize: el.text_size > 0 ? `${el.text_size}px` : '16px', color: currentTextColor, fontWeight: '500', textAlign: ta }}>{el.text_normal}</span> )}
            </div>
            {!isIconOnly && el.text_right && (
               <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                 <span style={{ fontSize: el.text_secondary_size > 0 ? `${el.text_secondary_size}px` : (el.text_size > 0 ? `${el.text_size}px` : '16px'), color: currentRightColor, fontWeight: '500' }}>{el.text_right}</span>
               </div>
            )}
          </div>
        </div>
      );
    }

    if (el.type === 'widget_clock') {
      return (
        <div key={el.id} style={{...boxStyle, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} {...bindEvents}>
          <div style={{ color: androidHexToWeb(themeData.textPrimary), textAlign: 'center', lineHeight: '1.2' }}>
            <div style={{ fontSize: el.text_size > 0 ? `${el.text_size * 2.1}px` : '42px', fontWeight: 'bold' }}>17:22</div>
            <div style={{ fontSize: el.text_size > 0 ? `${el.text_size}px` : '20px', fontWeight: 'bold' }}>Mon, Jun 15</div>
          </div>
        </div>
      );
    }
    if (el.type === 'widget_analog_clock') {
      const clockSize = (Math.min(el.width, el.height) > 0 ? Math.min(el.width, el.height) : 100) - (el.padding || 0) * 2 - 20;
      return (
        <div key={el.id} style={{...boxStyle, display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...bindEvents}>
           <div style={{ width: `${clockSize}px`, height: `${clockSize}px`, borderRadius: '50%', backgroundColor: el.bg_color ? androidHexToWeb(el.bg_color) : 'transparent', border: `3px solid ${androidHexToWeb(themeData.textPrimary)}`, position: 'relative'}}>
             <div style={{ position: 'absolute', top: '25%', left: 'calc(50% - 2px)', width: '4px', height: '25%', backgroundColor: androidHexToWeb(themeData.textPrimary), transformOrigin: 'bottom center', transform: 'rotate(45deg)', borderRadius: '2px' }}></div>
           </div>
        </div>
      );
    }
    if (el.type === 'widget_album') {
      const hideText = el.text_position === 'none'; // 🚀 숨김 모드인지 판별
      return (
        <div key={el.id} style={{...boxStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px'}} {...bindEvents}>
          <div style={{ 
            flexShrink: 0, 
            // 🚀 숨김 모드일 때는 강제로 박스를 100% 꽉 채웁니다!
            width: hideText ? '100%' : '110px', 
            height: hideText ? '100%' : '110px', 
            backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' 
          }}>
            {previewImages[el.id] ? <img src={previewImages[el.id]} alt="album" draggable="false" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <ImageIcon color="#ff5555" size={hideText ? 60 : 44} />}
          </div>
        </div>
      );
    }
    if (el.type === 'widget_battery') {
      return (
        <div key={el.id} style={{...boxStyle, display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...bindEvents}>
          <div style={{ width: '100%', height: '100%', border: `2px solid ${androidHexToWeb(themeData.textPrimary)}`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: androidHexToWeb(themeData.textPrimary) }}>
            <span style={{ fontSize: el.text_size > 0 ? `${el.text_size}px` : '12px', fontWeight: 'bold' }}>100%</span>
          </div>
        </div>
      );
    }
    if (el.type === 'widget_focus_image') {
      return (
        <div key={el.id} style={{...boxStyle, overflow:'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}} {...bindEvents}>
             <ImageIcon color="rgba(255,255,255,0.3)" size={32} />
        </div>
      );
    }
    return null;
  };

  // ============================================================================
  // 🔥 [렌더링 엔진] 2. 플레이어 화면 전용 렌더러
  // ============================================================================
  const renderPlayerElement = (el) => {
    const isSelected = selectedId === el.id;
    const boxStyle = getStyleFromElement(el, false); 
    const bgColorWeb = el.bg_color ? androidHexToWeb(el.bg_color) : 'transparent';
    const txtColor = bgColorWeb !== 'transparent' ? bgColorWeb : '#FFFFFF';
    
    // 🚀 [수리 완료 1] 선택되었을 때는 하늘색 점선, 아닐 때는 투명!
    boxStyle.border = (!isPlayMode && isSelected) ? '2px dashed #00FFFF' : '2px solid transparent';
    boxStyle.boxSizing = 'border-box';
    boxStyle.cursor = isPlayMode ? 'default' : (dragInfo.isDragging && dragInfo.id === el.id ? 'grabbing' : 'grab');

    // 🚀 [수리 완료 2] 선택되지 않았을 때만 위치를 가늠할 수 있게 희미한 테두리를 줍니다! (하늘색 점선을 덮어씌우지 않음)
    // 🚀 [수리 완료 2] 선택되지 않았을 때만 위치를 가늠할 수 있게 희미한 테두리를 줍니다! (하늘색 점선을 덮어씌우지 않음)
    if (!isSelected && el.id !== 'background' && el.id !== 'title' && el.id !== 'album' && el.id !== 'artist' && el.id !== 'track_count' && el.type !== 'line') {
        if (el.id === 'album_art') boxStyle.border = '1px solid #444';
        else if (el.id === 'progress_bar') boxStyle.border = '1px solid #555';
        else boxStyle.border = '1px dashed #666';
    }

    const bindEvents = {
      onMouseDown: (e) => handlePointerDown(e, el.id),
      onTouchStart: (e) => handlePointerDown(e, el.id),
      onContextMenu: (e) => {
        if (isPlayMode) return;
        e.preventDefault(); e.stopPropagation();
        if (window.confirm(`${t('deleteConfirm')} [ ${el.id} ]`)) handleDeleteElement(el.id);
      }
    };

    if (el.id === 'background') return null;

    if (el.type === 'line') {
      return <div key={el.id} style={{...boxStyle, backgroundColor: txtColor}} {...bindEvents}></div>;
    }
    
    // 👇 [여기에 박스 렌더링 로직 신규 추가!]
    if (el.type === 'box') {
      const previewImg = (el.icon_normal && el.icon_normal.trim() !== '') ? previewImages[el.id] : null;
      return (
        <div key={el.id} style={{...boxStyle, backgroundColor: txtColor, borderRadius: `${el.radius || 0}px`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...bindEvents}>
          {previewImg ? <img src={previewImg} alt="box_img" draggable="false" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          : el.icon_normal ? <ImageIcon color="rgba(255,255,255,0.3)" size={32} /> : null}
        </div>
      );
    }
    // 👆 [추가 끝]

    if (el.id === 'title') {
        return <div key={el.id} style={{...boxStyle, color: txtColor, display:'flex', alignItems:el.text_align === 'center' ? 'center' : 'flex-start', justifyContent: el.text_align === 'center' ? 'center' : (el.text_align === 'right' ? 'flex-end' : 'flex-start')}} {...bindEvents}><span style={{fontSize: el.text_size ? `${el.text_size}px` : '22px', fontWeight:'bold'}}>Never Gonna Give You Up</span></div>;
    }
    if (el.id === 'album') {
        return <div key={el.id} style={{...boxStyle, color: txtColor, display:'flex', alignItems:el.text_align === 'center' ? 'center' : 'flex-start', justifyContent: el.text_align === 'center' ? 'center' : (el.text_align === 'right' ? 'flex-end' : 'flex-start')}} {...bindEvents}><span style={{fontSize: el.text_size ? `${el.text_size}px` : '14px', fontWeight:'bold'}}>Greatest Hits</span></div>;
    }
    if (el.id === 'artist') {
        return <div key={el.id} style={{...boxStyle, color: txtColor, display:'flex', alignItems:el.text_align === 'center' ? 'center' : 'flex-start', justifyContent: el.text_align === 'center' ? 'center' : (el.text_align === 'right' ? 'flex-end' : 'flex-start')}} {...bindEvents}><span style={{fontSize: el.text_size ? `${el.text_size}px` : '16px'}}>Rick Astley</span></div>;
    }
    if (el.id === 'track_count') {
        return <div key={el.id} style={{...boxStyle, color: txtColor, display:'flex', alignItems:el.text_align === 'center' ? 'center' : 'flex-start', justifyContent: el.text_align === 'center' ? 'center' : (el.text_align === 'right' ? 'flex-end' : 'flex-start')}} {...bindEvents}><span style={{fontSize: el.text_size ? `${el.text_size}px` : '14px', fontWeight:'bold'}}>1 / 10</span></div>;
    }
    if (el.id === 'album_art') {
        return <div key={el.id} style={{...boxStyle, backgroundColor:'#222', display:'flex', alignItems:'center', justifyContent:'center'}} {...bindEvents}><ImageIcon size={40} color="#666"/></div>;
    }
    if (el.id === 'progress_bar') {
        const barColor = bgColorWeb !== 'transparent' ? bgColorWeb : androidHexToWeb(themeData.btnFocused);
        const timeColor = androidHexToWeb(themeData.textPrimary); 
        // 🚀 [신규 장착] 사용자가 지정한 진행바 배경색 적용 (미지정시 에디터용 어두운 회색 #333333)
        const progBgColor = el.progress_bg_color ? androidHexToWeb(el.progress_bg_color) : '#333333';

        return (
            <div key={el.id} style={{...boxStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}} {...bindEvents}>
                <span style={{color: timeColor, fontSize: '12px', fontWeight: 'bold'}}>00:00</span>
                <div style={{flex: 1, height: '100%', backgroundColor: progBgColor, borderRadius:`${el.radius || 0}px`, border:'1px solid #555'}}>
                    <div style={{width:'40%', height:'100%', backgroundColor: barColor, borderRadius:`${el.radius || 0}px`}}></div>
                </div>
                <span style={{color: timeColor, fontSize: '12px', fontWeight: 'bold'}}>04:30</span>
            </div>
        );
    }
    if (el.id === 'shuffle_icon' || el.id === 'repeat_icon') {
        return <div key={el.id} style={{...boxStyle, color: txtColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px'}} {...bindEvents}>{el.id.split('_')[0]}</div>;
    }
    if (el.id === 'quality_info') {
        return <div key={el.id} style={{...boxStyle, color: txtColor, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px'}} {...bindEvents}>[Quality UI]</div>;
    }

    return null;
  };


  const selectedElement = themeData[editTarget].find(e => e.id === selectedId);
  const playerBgConfig = themeData.player_ui.find(e => e.id === 'background');

  // 🚀 [수정] 배경화면(background)은 무조건 고정, 그 외 핵심 부품은 삭제 허용!
  const isFixed = selectedElement?.id === 'background';
  const isCoreElement = selectedElement && ['album_art', 'title', 'album', 'artist', 'progress_bar', 'track_count', 'quality_info', 'shuffle_icon', 'repeat_icon'].includes(selectedElement.id);
  const isTextIcon = selectedElement && ['title', 'album', 'artist', 'track_count', 'shuffle_icon', 'repeat_icon', 'quality_info'].includes(selectedElement.id);
  // ============================================================================
  // 🔥 [에디터 패널] 1. 메인 메뉴 전용 편집 패널
  // ============================================================================
  const renderMainMenuProperties = () => (
    <div className="space-y-5 animate-in fade-in">
      <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
        <div className="flex items-center gap-1">
          <button onClick={() => setSelectedId(null)} className="p-1 -ml-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"><ChevronLeft size={20}/></button>
          <h3 className="font-bold text-white flex items-center gap-2 ml-1"><Type size={18} className="text-cyan-400"/> {selectedElement.id}</h3>
        </div>
        <button onClick={() => handleDeleteElement(selectedElement.id)} className="text-xs flex items-center gap-1 text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-2 py-1 rounded transition-colors"><Trash2 size={14} /> {t('delete')}</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">{t('idLabel')}</label>
          <input type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.id} onChange={(e) => { const newId = e.target.value; handleElementChange(selectedElement.id, 'id', newId); setSelectedId(newId); }} />
        </div>
        
        <div>
          <label className="block text-xs text-neutral-400 mb-1">{t('typeLabel')}</label>
          <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm cursor-pointer" value={selectedElement.type} onChange={(e) => handleElementChange(selectedElement.id, 'type', e.target.value)}>
            <option value="button">{t('typeButton')}</option>
            <option value="line">{t('typeLine')}</option>
            <option value="box">{t('typeBox')}</option>
            <option value="list_box">{t('typeListBox')}</option>
            <option value="widget_clock">{t('typeClock')}</option>
            <option value="widget_analog_clock">{t('typeAnalogClock')}</option>
            <option value="widget_album">{t('typeAlbum')}</option>
            <option value="widget_battery">{t('typeBattery')}</option>
            <option value="widget_circular_battery">{t('typeCircularBattery')}</option>
            <option value="widget_focus_image">{t('typeFocusImage')}</option>
          </select>
        </div>

        <div className="col-span-2 mt-2 bg-neutral-800 p-2 rounded border border-neutral-700 shadow-inner">
          <label className="block text-[10px] font-bold text-cyan-400 uppercase mb-2">Relational & Dynamic Links</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] text-neutral-400 mb-1">{t('parentIdLabel')}</label>
              <input type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-white text-xs placeholder-neutral-600" placeholder="e.g. main_scroll_list" value={selectedElement.parent_id || ''} onChange={(e) => handleElementChange(selectedElement.id, 'parent_id', e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] text-neutral-400 mb-1">{t('visibleFocusLabel')}</label>
              <input type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-white text-xs placeholder-neutral-600" placeholder="e.g. btn_now" value={selectedElement.visible_on_focus || ''} onChange={(e) => handleElementChange(selectedElement.id, 'visible_on_focus', e.target.value)} />
            </div>
          </div>
          <p className="text-[9px] text-neutral-500 mt-1">※ {t('visibleFocusDesc')}</p>
        </div>

        <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2"><span className="text-xs font-bold text-neutral-300 uppercase">{t('layoutCoords')}</span></div>
        <div>
          <label className="block text-xs text-neutral-400 mb-1">{t('gravityLabel')}</label>
          <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.gravity || 'top|left'} onChange={(e) => handleElementChange(selectedElement.id, 'gravity', e.target.value)}>
            <option value="top|left">Top | Left</option><option value="top|right">Top | Right</option>
            <option value="bottom|left">Bottom | Left</option><option value="bottom|right">Bottom | Right</option>
            <option value="top|center_horizontal">Top | Center(H)</option><option value="bottom|center_horizontal">Bottom | Center(H)</option><option value="center">Center</option>
          </select>
        </div>
        <div></div>
        <div><label className="block text-xs text-neutral-400 mb-1">{t('xLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.x || 0} onChange={(e) => handleElementChange(selectedElement.id, 'x', parseInt(e.target.value))} /></div>
        <div><label className="block text-xs text-neutral-400 mb-1">{t('yLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.y || 0} onChange={(e) => handleElementChange(selectedElement.id, 'y', parseInt(e.target.value))} /></div>
        <div><label className="block text-xs text-neutral-400 mb-1">{t('widthLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.width || 0} onChange={(e) => handleElementChange(selectedElement.id, 'width', parseInt(e.target.value))} /></div>
        <div><label className="block text-xs text-neutral-400 mb-1">{t('heightLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('heightPlaceholder')} value={selectedElement.height || 0} onChange={(e) => handleElementChange(selectedElement.id, 'height', parseInt(e.target.value))} /></div>

        <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2"><span className="text-xs font-bold text-neutral-300 uppercase">{t('indivDesign')}</span></div>
        <div className="col-span-2">{renderColorInput(t('bgColorLabel'), selectedElement.bg_color, (val) => handleElementChange(selectedElement.id, 'bg_color', val))}</div>

        {selectedElement.type !== 'line' && (
          <div><label className="block text-xs text-neutral-400 mb-1">{t('radiusLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" placeholder={t('radiusPlaceholder')} value={selectedElement.radius !== undefined ? selectedElement.radius : -1} onChange={(e) => handleElementChange(selectedElement.id, 'radius', parseInt(e.target.value))} /></div>
        )}
        
        {selectedElement.type === 'box' && (
          <div className="col-span-2">
            <label className="block text-xs text-neutral-400 mb-1 mt-2">{t('iconLabel')}</label>
            <div className="flex gap-2">
              <input type="text" className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('iconPlaceholder')} value={selectedElement.icon_normal || ''} onChange={(e) => handleElementChange(selectedElement.id, 'icon_normal', e.target.value)} />
              <label className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-3 py-2 cursor-pointer flex items-center justify-center transition-colors"><ImageIcon size={16} /><input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={(e) => handleImageUpload(selectedElement.id, e.target.files[0], 'icon_normal')} /></label>
            </div>
            <p className="text-[10px] text-neutral-500 mt-1">{t('imageNotice')}</p>
          </div>
        )}

        {selectedElement.type !== 'box' && selectedElement.type !== 'line' && (
          <>
            {selectedElement.type === 'button' && (
              <div className="col-span-2"><label className="block text-xs text-neutral-400 mb-1">{t('paddingLabel')} <span className="text-cyan-400 ml-1 font-bold">(Icon Margin)</span></label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.padding || 0} onChange={(e) => handleElementChange(selectedElement.id, 'padding', parseInt(e.target.value) || 0)} /></div>
            )}
            {selectedElement.type !== 'button' && selectedElement.id !== 'album_art' && (
              <div><label className="block text-xs text-neutral-400 mb-1">{t('titleTextSize')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_size || 0} onChange={(e) => handleElementChange(selectedElement.id, 'text_size', parseInt(e.target.value))} /></div>
            )}
          </>
        )}

        {selectedElement.type === 'widget_album' && (
          <>
            <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2"><span className="text-xs font-bold text-neutral-300 uppercase">{t('albumProps')}</span></div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">{t('textPos')}</label>
              <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_position || 'bottom'} onChange={(e) => handleElementChange(selectedElement.id, 'text_position', e.target.value)}>
                <option value="bottom">Bottom</option>
                <option value="top">Top</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="none">Hidden (Image Only)</option> {/* 🚀 추가된 옵션! */}
              </select>
            </div>
            <div><label className="block text-xs text-neutral-400 mb-1">{t('textAlign')}</label><select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_align || 'center'} onChange={(e) => handleElementChange(selectedElement.id, 'text_align', e.target.value)}><option value="center">Center</option><option value="left">Left</option><option value="right">Right</option></select></div>
            <div><label className="block text-xs text-neutral-400 mb-1">{t('subTextSize')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_secondary_size || 0} onChange={(e) => handleElementChange(selectedElement.id, 'text_secondary_size', parseInt(e.target.value))} /></div>
          </>
        )}

        {selectedElement.type === 'button' && (
          <>
            <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2"><span className="text-xs font-bold text-neutral-300 uppercase">{t('btnSettings')}</span></div>
            <div className="col-span-2"><label className="block text-xs text-neutral-400 mb-1">{t('focusIndexLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm font-mono text-cyan-400" value={selectedElement.focus_index !== undefined ? selectedElement.focus_index : 0} onChange={(e) => handleElementChange(selectedElement.id, 'focus_index', parseInt(e.target.value))} /></div>
            <div className="col-span-2 mt-2"><label className="block text-xs text-neutral-400 mb-1">Right Text (Arrow/Point)</label><input type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder="e.g. 〉 or OFF" value={selectedElement.text_right || ''} onChange={(e) => handleElementChange(selectedElement.id, 'text_right', e.target.value)} /></div>
            <div className="col-span-2 mt-2 bg-neutral-800 p-2 rounded border border-neutral-700">
              <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Right Text Colors (Optional)</label>
              <div className="grid grid-cols-2 gap-2">
                {renderColorInput("Normal", selectedElement.text_right_color, (val) => handleElementChange(selectedElement.id, 'text_right_color', val))}
                {renderColorInput("Focused", selectedElement.text_right_focused_color, (val) => handleElementChange(selectedElement.id, 'text_right_focused_color', val))}
              </div>
            </div>
            <div className="col-span-2 mt-2">
              <label className="block text-xs text-neutral-400 mb-1">{t('textAlign')}</label>
              <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_align || 'left'} onChange={(e) => handleElementChange(selectedElement.id, 'text_align', e.target.value)}>
                <option value="left">Left</option><option value="center">Center</option><option value="right">Right</option><option value="top">Top</option><option value="bottom">Bottom</option>
              </select>
            </div>
            <div className="col-span-2 mt-2 bg-neutral-800 p-2 rounded border border-neutral-700">
              <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Focus Animation</label>
              <div className="grid grid-cols-3 gap-2">
                <div><label className="block text-[10px] text-neutral-500 mb-1">Shift X (px)</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-white text-xs" placeholder="0" value={selectedElement.focus_offset_x || 0} onChange={(e) => handleElementChange(selectedElement.id, 'focus_offset_x', parseInt(e.target.value) || 0)} /></div>
                <div><label className="block text-[10px] text-neutral-500 mb-1">Shift Y (px)</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-white text-xs" placeholder="0" value={selectedElement.focus_offset_y || 0} onChange={(e) => handleElementChange(selectedElement.id, 'focus_offset_y', parseInt(e.target.value) || 0)} /></div>
                <div><label className="block text-[10px] text-neutral-500 mb-1">Scale (Zoom)</label><input type="number" step="0.1" className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-white text-xs" placeholder="1.0" value={selectedElement.focus_scale !== undefined ? selectedElement.focus_scale : 1.0} onChange={(e) => handleElementChange(selectedElement.id, 'focus_scale', parseFloat(e.target.value) || 1.0)} /></div>
              </div>
            </div>
            <div className="col-span-2 mt-2 bg-neutral-800 p-2 rounded border border-neutral-700">
              <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Text Sizes (px)</label>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-[10px] text-neutral-500 mb-1">Main Text Size</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-white text-xs" placeholder="16" value={selectedElement.text_size || 0} onChange={(e) => handleElementChange(selectedElement.id, 'text_size', parseInt(e.target.value) || 0)} /></div>
                <div><label className="block text-[10px] text-neutral-500 mb-1">Right Text Size</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-white text-xs" placeholder="Auto" value={selectedElement.text_secondary_size || 0} onChange={(e) => handleElementChange(selectedElement.id, 'text_secondary_size', parseInt(e.target.value) || 0)} /></div>
              </div>
            </div>
            <div className="col-span-2 mt-2"><label className="block text-xs text-neutral-400 mb-1">{t('btnText')}</label><input type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_normal || ''} onChange={(e) => handleElementChange(selectedElement.id, 'text_normal', e.target.value)} /></div>
            <div className="col-span-2 mt-2">
              <label className="block text-xs text-neutral-400 mb-1">{t('actionLabel')}</label>
              <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.action || 'OPEN_PLAYER'} onChange={(e) => handleElementChange(selectedElement.id, 'action', e.target.value)}>
                <option value="OPEN_PLAYER">{t('actNowPlaying')}</option>
                <option value="OPEN_BROWSER">{t('actLibrary')}</option>
                <option value="OPEN_RADIO">{t('actRadio')}</option>
                <option value="OPEN_AUDIOBOOKS">{t('actAudiobooks')}</option>
                <option value="OPEN_PODCASTS">{t('actPodcasts')}</option>
                <option value="OPEN_COVER_FLOW">{t('actCoverFlow')}</option>
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
              <label className="block text-xs text-neutral-400 mb-1">{t('previewImageLabel')}</label>
              <div className="flex gap-2">
                <input type="text" className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder="image.png" value={selectedElement.preview_image || ''} onChange={(e) => handleElementChange(selectedElement.id, 'preview_image', e.target.value)} />
                <label className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-3 py-2 cursor-pointer flex items-center justify-center transition-colors"><ImageIcon size={16} /><input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={(e) => handleImageUpload(selectedElement.id, e.target.files[0], 'preview_image')} /></label>
              </div>
            </div>
            <div className="col-span-2 mt-2">
              <label className="block text-xs text-neutral-400 mb-1">{t('iconLabel')}</label>
              <div className="flex gap-2">
                <input type="text" className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('iconPlaceholder')} value={selectedElement.icon_normal || ''} onChange={(e) => handleElementChange(selectedElement.id, 'icon_normal', e.target.value)} />
                <label className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-3 py-2 cursor-pointer flex items-center justify-center transition-colors" title={t('loadImage')}><ImageIcon size={16} /><input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={(e) => handleImageUpload(selectedElement.id, e.target.files[0], 'icon_normal')} /></label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ============================================================================
  // 🔥 [에디터 패널] 2. 플레이어 화면 전용 편집 패널
  // ============================================================================
  const renderPlayerUIProperties = () => {
    if (!selectedElement) return null;

    // 🚀 [버그 수리 완료] 리스트에서 'background'를 눌렀을 때만 이 설정창이 완벽하게 뜨도록 조건 변경!
    if (selectedElement.id === 'background') {
      return (
        <div className="space-y-5 animate-in fade-in">
          <div className="border-b border-neutral-700 pb-3">
             <h3 className="font-bold text-white flex items-center gap-2 ml-1"><MonitorPlay size={18} className="text-purple-400"/> Player Screen Background</h3>
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Background Type</label>
            <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-purple-400 font-bold text-sm cursor-pointer" value={selectedElement.type || 'blur'} onChange={(e) => handleElementChange('background', 'type', e.target.value)}>
              <option value="blur">Album Blur (Default)</option>
              <option value="clear">Album Clear (Original)</option>
              <option value="color">Solid Color</option>
              <option value="none">None</option>
            </select>
          </div>
          {selectedElement.type === 'color' && (
            <div className="mt-4">
              {renderColorInput("Solid Background Color (Hex)", selectedElement.bg_color, (val) => handleElementChange('background', 'bg_color', val))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-5 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
          <div className="flex items-center gap-1">
            <button onClick={() => setSelectedId(null)} className="p-1 -ml-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"><ChevronLeft size={20}/></button>
            <h3 className="font-bold text-white flex items-center gap-2 ml-1"><Type size={18} className="text-purple-400"/> {selectedElement.id}</h3>
          </div>
          {!isFixed && (
            <button onClick={() => handleDeleteElement(selectedElement.id)} className="text-xs flex items-center gap-1 text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-2 py-1 rounded transition-colors"><Trash2 size={14} /> {t('delete')}</button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">{t('idLabel')}</label>
            <input type="text" className={`w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm ${isCoreElement || isFixed ? 'opacity-50 cursor-not-allowed' : ''}`} value={selectedElement.id} readOnly={isCoreElement || isFixed} onChange={(e) => { if(!isCoreElement && !isFixed){ const newId = e.target.value; handleElementChange(selectedElement.id, 'id', newId); setSelectedId(newId); } }} />
          </div>
          
          <div>
            <label className="block text-xs text-neutral-400 mb-1">{t('typeLabel')}</label>
            {isFixed ? (
              <div className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-purple-400 text-sm font-bold bg-opacity-50 text-center">Player Fixed UI</div>
            ) : isCoreElement ? (
              <div className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-purple-400 text-sm font-bold bg-opacity-50 text-center">Core Player Component</div>
            ) : (
              <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm cursor-pointer" value={selectedElement.type} onChange={(e) => handleElementChange(selectedElement.id, 'type', e.target.value)}>
                <option value="line">{t('typeLine')}</option>
                {/* 👇 타입 선택창에 박스 옵션 추가! */}
                <option value="box">{t('typeBox')}</option>
              </select>
            )}
          </div>

          <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2"><span className="text-xs font-bold text-neutral-300 uppercase">{t('layoutCoords')}</span></div>
          
          {/* 👇 플레이어 에디터에 'Gravity' 앵커 선택창 추가! */}
          <div>
            <label className="block text-xs text-neutral-400 mb-1">{t('gravityLabel')}</label>
            <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.gravity || 'top|left'} onChange={(e) => handleElementChange(selectedElement.id, 'gravity', e.target.value)}>
              <option value="top|left">Top | Left</option><option value="top|right">Top | Right</option>
              <option value="bottom|left">Bottom | Left</option><option value="bottom|right">Bottom | Right</option>
              <option value="top|center_horizontal">Top | Center(H)</option><option value="bottom|center_horizontal">Bottom | Center(H)</option><option value="center">Center</option>
            </select>
          </div>
          <div></div> {/* UI 그리드 짝수 맞춤용 빈 공간 */}
          {/* 👆 추가 끝 */}

         <div><label className="block text-xs text-neutral-400 mb-1">{t('xLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.x || 0} onChange={(e) => handleElementChange(selectedElement.id, 'x', parseInt(e.target.value))} /></div>
          <div><label className="block text-xs text-neutral-400 mb-1">{t('yLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.y || 0} onChange={(e) => handleElementChange(selectedElement.id, 'y', parseInt(e.target.value))} /></div>
          <div><label className="block text-xs text-neutral-400 mb-1">{t('widthLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.width || 0} onChange={(e) => handleElementChange(selectedElement.id, 'width', parseInt(e.target.value))} /></div>
          <div><label className="block text-xs text-neutral-400 mb-1">{t('heightLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('heightPlaceholder')} value={selectedElement.height || 0} onChange={(e) => handleElementChange(selectedElement.id, 'height', parseInt(e.target.value))} /></div>

          <div className="col-span-2 border-t border-neutral-700 pt-4 mt-2"><span className="text-xs font-bold text-neutral-300 uppercase">{isTextIcon ? "Color Settings" : t('indivDesign')}</span></div>
          <div className="col-span-2">
            {renderColorInput(isTextIcon ? "Text / Icon Color (Hex)" : t('bgColorLabel'), selectedElement.bg_color, (val) => handleElementChange(selectedElement.id, 'bg_color', val))}
          </div>

          {(selectedElement.id === 'progress_bar' || selectedElement.type === 'box') && (
            <div><label className="block text-xs text-neutral-400 mb-1">{t('radiusLabel')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.radius || 0} onChange={(e) => handleElementChange(selectedElement.id, 'radius', parseInt(e.target.value))} /></div>
          )}

          {selectedElement.id === 'progress_bar' && (
            <div className="col-span-2 mt-2 border-t border-neutral-700 pt-4">
              {renderColorInput("Progress Background Color (Hex)", selectedElement.progress_bg_color, (val) => handleElementChange(selectedElement.id, 'progress_bg_color', val))}
            </div>
          )}

          {selectedElement.type === 'box' && (
            <div className="col-span-2">
              <label className="block text-xs text-neutral-400 mb-1 mt-2">{t('iconLabel')}</label>
              <div className="flex gap-2">
                <input type="text" className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('iconPlaceholder')} value={selectedElement.icon_normal || ''} onChange={(e) => handleElementChange(selectedElement.id, 'icon_normal', e.target.value)} />
                <label className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-3 py-2 cursor-pointer flex items-center justify-center transition-colors"><ImageIcon size={16} /><input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={(e) => handleImageUpload(selectedElement.id, e.target.files[0], 'icon_normal')} /></label>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">{t('imageNotice')}</p>
            </div>
          )}

          {isTextIcon && (
            <>
              <div><label className="block text-xs text-neutral-400 mb-1">{t('titleTextSize')}</label><input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_size || 0} onChange={(e) => handleElementChange(selectedElement.id, 'text_size', parseInt(e.target.value))} /></div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">{t('textAlign')}</label>
                <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" value={selectedElement.text_align || (selectedElement.id === 'quality_info' ? 'horizontal' : 'center')} onChange={(e) => handleElementChange(selectedElement.id, 'text_align', e.target.value)}>
                  {selectedElement.id === 'quality_info' ? (
                    <><option value="horizontal">Horizontal (가로 정렬)</option><option value="vertical">Vertical (세로 정렬)</option></>
                  ) : (
                    <><option value="center">Center (중앙 정렬)</option><option value="left">Left (좌측 정렬)</option><option value="right">Right (우측 정렬)</option></>
                  )}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };


  return (
    <div 
      className="flex h-screen bg-neutral-900 text-neutral-200 font-sans"
      // 🚀 [신규 엔진] 스크린 바깥쪽 어두운 빈 공간을 누르더라도 즉시 선택 해제 발동!
      onMouseDown={() => { if (!isPlayMode) setSelectedId(null); }}
      onTouchStart={() => { if (!isPlayMode) setSelectedId(null); }}
    >
      
      {fontUrl && (
        <style>{`@font-face { font-family: '${fontFamilyName}'; src: url('${fontUrl}'); }`}</style>
      )}

      {/* 🚀 [디테일 깎기] 플레이 모드에서 지저분한 스크롤바를 싹 숨겨버리는 마법의 CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* LEFT: 프리뷰 패널 */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 border-r border-neutral-700 bg-black relative">
        
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-neutral-800 p-1 rounded-lg border border-neutral-700 shadow-lg z-50">
           <button onClick={() => { setIsPlayMode(false); setHoveredId(null); }} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors ${!isPlayMode ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'}`}>
             <MousePointer2 size={16} /> {t('editMode')}
           </button>
           <button onClick={() => { setIsPlayMode(true); setSelectedId(null); }} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors ${isPlayMode ? 'bg-green-600 text-white' : 'text-neutral-400 hover:text-white'}`}>
             <Play size={16} fill={isPlayMode ? "currentColor" : "none"} /> {t('playMode')}
           </button>
        </div>

        {/* 🚀 [신규 엔진] 상단 타겟 스위치 */}
        <div className="flex gap-2 mb-4 bg-neutral-800 p-1 rounded-full border border-neutral-700 shadow-lg z-10">
          <button onClick={() => { setEditTarget('main_menu'); setSelectedId(null); setActiveTab('elements'); }} className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors ${editTarget === 'main_menu' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'}`}>
            <LayoutTemplate size={18} /> {t('targetMainMenu')}
          </button>
          <button onClick={() => { setEditTarget('player_ui'); setSelectedId(null); setActiveTab('elements'); }} className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors ${editTarget === 'player_ui' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white'}`}>
            <MonitorPlay size={18} /> {t('targetPlayerUI')}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6 bg-neutral-800 px-4 py-2 rounded-full border border-neutral-700 shadow-inner z-10">
          <span className="text-[11px] font-bold text-neutral-400 tracking-wider">ZOOM</span>
          <input type="range" min="0.5" max="2.5" step="0.1" value={zoomLevel} onChange={(e) => setZoomLevel(parseFloat(e.target.value))} className="w-32 h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
          <span className="text-[11px] font-mono text-cyan-400 w-10 text-right">{Math.round(zoomLevel * 100)}%</span>
          <button onClick={() => setZoomLevel(1.0)} className="ml-1 text-[10px] bg-neutral-700 hover:bg-neutral-600 text-white px-2 py-1 rounded transition-colors font-bold">RESET</button>
        </div>

        <div 
          className="relative shadow-2xl ring-4 ring-neutral-800 overflow-hidden transition-transform duration-100"
          style={{
            width: '480px', height: '360px', 
            transform: `scale(${zoomLevel})`, transformOrigin: 'top center', 
            userSelect: 'none', WebkitUserSelect: 'none',
            backgroundColor: editTarget === 'main_menu' ? androidHexToWeb(themeData.bgOverlay) : '#111111',
            // 🚀 [눈뽕 방지 엔진] 복잡한 바둑판 패턴을 싹 날려버리고 아주 깨끗한 무지 배경으로 만듭니다!
            backgroundImage: 'none',
            fontFamily: fontFamilyName ? `'${fontFamilyName}', sans-serif` : 'sans-serif'
          }}
          onMouseDown={() => { if (!isPlayMode) setSelectedId(null); }}
          onTouchStart={() => { if (!isPlayMode) setSelectedId(null); }}
        >
          {/* 플레이어 단색 배경 처리 */}
          {editTarget === 'player_ui' && playerBgConfig?.type === 'color' && playerBgConfig.bg_color && (
            <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: androidHexToWeb(playerBgConfig.bg_color)}}></div>
          )}

          {editTarget === 'main_menu' && (
            <div style={{ height: '36px', backgroundColor: androidHexToWeb(themeData.statusBarBg), display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 12px', fontSize: '15px', fontWeight: 'bold', color: androidHexToWeb(themeData.textPrimary), position: 'relative', zIndex: 50 }}>
              <div>05:22 PM</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', opacity: 0.8 }}>📶</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ backgroundColor: '#4ADE80', color: '#000', fontSize: '11px', fontWeight: '900', padding: '1px 6px', borderRadius: '3px', display: 'flex', alignItems: 'center', gap: '2px' }}>100 <span style={{ fontSize: '10px' }}>⚡</span></div>
                  <div style={{ width: '3px', height: '8px', backgroundColor: '#4ADE80', borderRadius: '0 3px 3px 0' }}></div>
                </div>
              </div>
            </div>
          )}

          <div style={{ position: 'relative', width: '100%', height: editTarget === 'main_menu' ? 'calc(100% - 36px)' : '100%' }}>
            {editTarget === 'main_menu' ? (
              <>
                {themeData.main_menu.filter(el => !el.parent_id || !themeData.main_menu.some(p => p.id === el.parent_id)).filter(el => el.type === 'box').map(el => renderMainMenuElement(el))}
                {themeData.main_menu.filter(el => !el.parent_id || !themeData.main_menu.some(p => p.id === el.parent_id)).filter(el => el.type !== 'button' && el.type !== 'box').map(el => renderMainMenuElement(el))}
                {themeData.main_menu.filter(el => !el.parent_id || !themeData.main_menu.some(p => p.id === el.parent_id)).filter(el => el.type === 'button').map(el => renderMainMenuElement(el))}
              </>
            ) : (
              themeData.player_ui.map(el => renderPlayerElement(el))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: 에디터 패널 */}
      <div 
        className="w-[450px] flex flex-col bg-neutral-800 shadow-xl z-10"
        // 🚀 [방어막 가동] 오른쪽 설정창을 누를 때는 바깥쪽의 '선택 해제' 명령이 발동하지 않도록 철통 방어!
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        
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
             <select className="bg-neutral-800 border border-neutral-600 text-white text-xs rounded px-2 py-1 outline-none cursor-pointer" value={language} onChange={(e) => setLanguage(e.target.value)}>
               <option value="en">English</option>
               <option value="ko">한국어</option>
             </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-neutral-600">
          {activeTab === 'global' && (
            <div className="space-y-4">
              <div className="mb-6">
                <label className="block text-xs font-bold text-neutral-400 mb-1 uppercase tracking-wider">{t('themeName')}</label>
                <input type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white" value={themeData.name || ''} onChange={(e) => handleGlobalChange('name', e.target.value)} />
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold text-neutral-400 mb-1 uppercase tracking-wider">{t('customFont')}</label>
                <div className="flex gap-2">
                <input type="text" className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm placeholder-neutral-600" placeholder={t('fontPlaceholder')} value={themeData.font || ''} onChange={(e) => {
                  const newVal = e.target.value;
                  handleGlobalChange('font', newVal);
                  if (!newVal || newVal.trim() === '') { setFontUrl(null); setFontFamilyName(''); }
                }} />
                  <label className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-3 py-2 cursor-pointer flex items-center justify-center transition-colors text-sm whitespace-nowrap" title={t('fontUpload')}>
                    <Type size={16} className="mr-2"/> {t('fontUpload')}
                    <input type="file" accept=".ttf,.otf,.woff,.woff2" className="hidden" onChange={handleFontUpload} />
                  </label>
                </div>
              </div>
              <h3 className="text-sm font-bold text-neutral-300 border-b border-neutral-700 pb-2 mb-4 mt-6">{t('colorStyles')}</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[ { key: 'textPrimary', label: t('textPrimary') }, { key: 'textSecondary', label: t('textSecondary') }, { key: 'bgOverlay', label: t('bgOverlay') }, { key: 'statusBarBg', label: t('statusBarBg') }, { key: 'btnNormal', label: t('btnNormal') }, { key: 'btnFocused', label: t('btnFocused') }, { key: 'btnFocusedText', label: t('btnFocusedText') }].map(item => (
                  <React.Fragment key={item.key}>
                    {renderColorInput(item.label, themeData[item.key], (val) => handleGlobalChange(item.key, val))}
                  </React.Fragment>
                ))}
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">{t('defaultRadius')}</label>
                  <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm font-mono" value={themeData.button_radius} onChange={(e) => handleGlobalChange('button_radius', parseInt(e.target.value))} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'elements' && !selectedElement && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex gap-2">
                {editTarget === 'main_menu' ? (
                  <button onClick={handleAddMainMenuElement} className="flex-1 py-3 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-white font-bold rounded flex items-center justify-center gap-2 transition-colors">
                    <Plus size={18} /> {t('addElement')}
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-2 w-full">
                      <button onClick={() => handleAddPlayerElement('line')} className="flex-1 py-3 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-white font-bold rounded flex items-center justify-center gap-2 transition-colors">
                        <Plus size={18} /> {t('addLine')}
                      </button>
                      <button onClick={() => handleAddPlayerElement('box')} className="flex-1 py-3 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-white font-bold rounded flex items-center justify-center gap-2 transition-colors">
                        <Plus size={18} /> Add Box
                      </button>
                    </div>
                    {missingCoreElements.length > 0 && (
                      <div className="flex gap-2">
                        <select id="add_player_el" className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-white text-sm" defaultValue="">
                          <option value="" disabled>+ {t('addCoreElement')}...</option>
                          {missingCoreElements.map(id => <option key={id} value={id}>{id}</option>)}
                        </select>
                        <button onClick={() => {
                          const sel = document.getElementById('add_player_el');
                          if (sel && sel.value) handleAddPlayerElement(sel.value);
                        }} className="px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded">Add</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-4">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t('currentElements')}</div>
                {themeData[editTarget].map((el, index) => {
                  const isBg = editTarget === 'player_ui' && el.id === 'background';
                  const isCore = editTarget === 'player_ui' && corePlayerElements.includes(el.id);
                  return (
                    <div key={el.id} className="flex justify-between items-center bg-neutral-900 border border-neutral-700 p-3 rounded cursor-pointer hover:border-cyan-500 transition-colors" onClick={() => { if(!isPlayMode) setSelectedId(el.id); }}>
                      <div>
                        <div className="text-white font-bold text-sm">{el.id}</div>
                        <div className="text-xs text-neutral-500">
                          {isBg ? "Player Background" : isCore ? "Core Player Component" : (el.type === 'line' ? t('typeLine') : el.type)}
                        </div>
                      </div>
                      
                      {/* 🚀 [신규 장착] 레이어 위/아래 이동 버튼 & 삭제 버튼 */}
                      <div className="flex items-center gap-1">
                        {(!isBg) && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); handleMoveElement(index, -1); }} className="text-neutral-400 hover:text-cyan-400 p-1.5 rounded hover:bg-neutral-800 transition-colors" title="Move Layer Down (Back)">
                              ⬆️
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleMoveElement(index, 1); }} className="text-neutral-400 hover:text-cyan-400 p-1.5 rounded hover:bg-neutral-800 transition-colors" title="Move Layer Up (Front)">
                              ⬇️
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteElement(el.id); }} className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-neutral-800 transition-colors ml-1" title={t('delete')}>
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 🔥 렌더링 분기: 메인 화면 에디터 vs 플레이어 화면 에디터 */}
          {activeTab === 'elements' && selectedElement && (
            editTarget === 'main_menu' ? renderMainMenuProperties() : renderPlayerUIProperties()
          )}

        </div>

        <div className="p-4 border-t border-neutral-700 bg-neutral-800 flex gap-2">
          <label className="flex-1 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg text-sm">
            <Upload size={18} /> {t('importBtn')}
            <input type="file" accept=".json,.zip" className="hidden" onChange={handleImportJSON} />
          </label>
          <button onClick={handleDownloadZIP} disabled={isZipping} className={`flex-1 py-3 text-white font-bold rounded flex items-center justify-center gap-2 shadow-lg transition-colors text-sm ${isZipping ? 'bg-cyan-800 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500'}`}>
            {isZipping ? <span className="flex items-center gap-2">{t('zipProgress')}</span> : <><Download size={18} /> {t('downloadBtn')}</>}
          </button>
        </div>
      </div>
    </div>
  );
}