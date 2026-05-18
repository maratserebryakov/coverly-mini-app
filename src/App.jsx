import { useState, useEffect } from 'react';
import Editor from './Editor';
import { applyTheme } from './theme';

const templates = [
  { id: 'classic', name: 'Классика', preview: '🎵' },
  { id: 'neon', name: 'Неон', preview: '🌟' },
  { id: 'minimal', name: 'Минимализм', preview: '▫️' },
  { id: 'vibe', name: 'Вайб', preview: '🌊' },
];

export default function App() {
  const [step, setStep] = useState('select');
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [isTelegramReady, setIsTelegramReady] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      applyTheme();
      setIsTelegramReady(true);
    } else {
      setIsTelegramReady(true);
    }
  }, []);

  if (!isTelegramReady) {
    return <div>Загрузка...</div>;
  }

  if (step === 'editor') {
    return (
      <Editor
        template={selectedTemplate}
        onBack={() => setStep('select')}
      />
    );
  }

  return (
    <div className="app-container">
      <h1>Создай обложку плейлиста</h1>
      <p>Выбери стиль, добавь текст и скачай готовое изображение для своего профиля Telegram.</p>

      <div className="template-grid">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className={`template-card ${selectedTemplate === tpl.id ? 'selected' : ''}`}
            onClick={() => setSelectedTemplate(tpl.id)}
          >
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>{tpl.preview}</div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>{tpl.name}</div>
          </div>
        ))}
      </div>

      <button onClick={() => setStep('editor')}>
        Продолжить в редакторе
      </button>
    </div>
  );
}
