import { t, tf } from './i18n.js'

export function Header() {
  return `
    <header>
      <div class="lang-toggle">
        <button class="lang-btn active" data-lang="en">EN</button>
        <button class="lang-btn" data-lang="ml">ML</button>
      </div>
      <div class="brand">
        <h1>${t('brand')}</h1>
      </div>
    </header>
  `
}

export function ProgressBar(step, total) {
  const percent = (step / total) * 100
  return `
    <div class="progress-bar">
      <div class="progress-track">
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
      <p class="progress-text">${tf('stepOf', { current: step, total: total })}</p>
    </div>
  `
}

export function OptionCard(icon, label, value) {
  return `
    <div class="option-card" data-value="${value}">
      <div class="icon">${icon}</div>
      <span>${label}</span>
    </div>
  `
}

export function PriorityOption(icon, label, value) {
  return `
    <div class="priority-option" data-value="${value}">
      <span class="icon">${icon}</span>
      <span>${label}</span>
    </div>
  `
}

export function AgeSlider(currentAge = 28) {
  return `
    <div class="age-slider">
      <div class="age-display">
        <span id="age-value">${currentAge}</span> <span>${t('ageYears')}</span>
      </div>
      <input type="range" id="age-input" min="18" max="60" value="${currentAge}">
      <div class="age-labels">
        <span>18</span>
        <span>60+</span>
      </div>
    </div>
  `
}

export function NavButtons(showBack = true, isLastStep = false) {
  const backBtn = showBack 
    ? `<button class="btn-back" data-action="back">${t('back')}</button>` 
    : `<div></div>`
  
  const nextBtn = isLastStep
    ? ``
    : `<button class="btn-next" data-action="next">${t('nextStep')}</button>`

  return `
    <div class="quiz-nav">
      ${backBtn}
      ${nextBtn}
    </div>
  `
}

export function SubmitButton() {
  return `<button class="btn-submit">${t('submit')}</button>`
}

export function Button(text, variant = 'primary') {
  const classes = variant === 'primary' ? 'btn-primary' : 'btn-next'
  return `<button class="${classes}">${text}</button>`
}
