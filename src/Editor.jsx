import { useRef, useState, useEffect } from 'react';

const templatePresets = {
  classic: { bg: '#1e1e1e', textColor: '#ffffff', font: 'bold 48px Arial' },
  neon: { bg: '#0f0f1a', textColor: '#ff00c8', font: 'bold 52px "Courier New"' },
  minimal: { bg: '#ffffff', textColor: '#000000', font: 'bold 40px "Helvetica Neue"' },
  vibe: { bg: '#1a3c34', textColor: '#a7f3d0', font: 'italic 44px Georgia' },
};

export default function Editor({ template, onBack }) {
  const canvasRef = useRef(null);
  const [title, setTitle] = useState('Мой плейлист');
  const [subtitle, setSubtitle] = useState('Лучшие треки');
  const [customBgColor, setCustomBgColor] = useState(templatePresets[template].bg);

  const width = 1024;
  const height = 1024;

  useEffect(() => {
    const preset = templatePresets[template];
    setCustomBgColor(preset.bg);
    drawCover();
  }, [template, title, subtitle, customBgColor]);

  const drawCover = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const preset = templatePresets[template];

    // Фон
    ctx.fillStyle = customBgColor;
    ctx.fillRect(0, 0, width, height);

    // Градиентная плашка
    const gradient = ctx.createLinearGradient(0, height - 300, 0, height);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, height - 300, width, 300);

    // Заголовок
    ctx.fillStyle = preset.textColor;
    ctx.font = preset.font;
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, height / 2 - 40);

    // Подзаголовок
    ctx.font = `28px ${preset.font.split(' ')[2] || 'Arial'}`;
    ctx.fillStyle = preset.textColor + 'CC'; // небольшая прозрачность
    ctx.fillText(subtitle, width / 2, height / 2 + 60);

    // Иконка ноты (простая)
    ctx.font = '80px Arial';
    ctx.fillStyle = preset.textColor;
    ctx.fillText('🎵', width / 2, height / 2 - 140);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'coverly-cover.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Также можно показать инструкцию (например, alert)
    alert('Обложка сохранена! Теперь установи её в настройках профиля Telegram в разделе "Музыка".');
  };

  return (
    <div className="app-container">
      <button onClick={onBack} style={{ marginBottom: '16px' }}>← Назад к шаблонам</button>
      <h1>Редактор обложки</h1>

      <div className="editor-canvas-container">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
        />
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Название плейлиста"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Подзаголовок"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label>Цвет фона:</label>
          <input
            type="color"
            value={customBgColor}
            onChange={(e) => setCustomBgColor(e.target.value)}
          />
        </div>

        <button onClick={handleDownload}>Скачать обложку</button>
      </div>
    </div>
  );
}
