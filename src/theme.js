export function getThemeParams() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return null;

  return {
    bg_color: tg.themeParams.bg_color || '#ffffff',
    text_color: tg.themeParams.text_color || '#000000',
    hint_color: tg.themeParams.hint_color || '#999999',
    button_color: tg.themeParams.button_color || '#2481cc',
    button_text_color: tg.themeParams.button_text_color || '#ffffff',
    secondary_bg_color: tg.themeParams.secondary_bg_color || '#f0f0f0',
  };
}

export function applyTheme() {
  const theme = getThemeParams();
  if (!theme) return;

  document.documentElement.style.setProperty('--tg-bg', theme.bg_color);
  document.documentElement.style.setProperty('--tg-text', theme.text_color);
  document.documentElement.style.setProperty('--tg-hint', theme.hint_color);
  document.documentElement.style.setProperty('--tg-button', theme.button_color);
  document.documentElement.style.setProperty('--tg-button-text', theme.button_text_color);
  document.documentElement.style.setProperty('--tg-secondary-bg', theme.secondary_bg_color);
}
