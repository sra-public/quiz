import './style.css'

import { ALL_SCHEMES_DATA } from './schemes.js';
import { LandingPage, AgeStep, GenderStep, OccupationStep, PriorityStep, ReportPage, getQuizData, setQuizData } from './layouts.js'
import { getReport } from './mock-reports.js'
import { setLanguage, getLanguage } from './i18n.js'

window.ALL_SCHEMES_DATA = ALL_SCHEMES_DATA;

const screens = {
  landing: LandingPage,
  age: AgeStep,
  gender: GenderStep,
  occupation: OccupationStep,
  priority: PriorityStep,
}

const screenOrder = ['landing', 'age', 'gender', 'occupation', 'priority', 'report']

let currentScreen = 'landing'

function render() {
  const app = document.querySelector('#app')
  
  if (currentScreen === 'report') {
    const report = getReport(getQuizData())
    app.innerHTML = ReportPage(report)
  } else {
    app.innerHTML = screens[currentScreen]()
  }
  
  updateLangButtons()
  attachEventListeners()
}

function updateLangButtons() {
  const currentLang = getLanguage()
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang)
  })
}

function navigateTo(screen) {
  currentScreen = screen
  render()
}

function goNext() {
  collectCurrentStepData()
  const idx = screenOrder.indexOf(currentScreen)
  if (idx < screenOrder.length - 1) {
    navigateTo(screenOrder[idx + 1])
  }
}

function goBack() {
  const idx = screenOrder.indexOf(currentScreen)
  if (idx > 1) {
    navigateTo(screenOrder[idx - 1])
  }
}

function collectCurrentStepData() {
  if (currentScreen === 'age') {
    const ageInput = document.querySelector('#age-input')
    if (ageInput) {
      setQuizData({ age: parseInt(ageInput.value) })
    }
  }
  
  if (currentScreen === 'gender') {
    const selected = document.querySelector('.gender-options .option-card.selected')
    if (selected) {
      setQuizData({ gender: selected.dataset.value })
    }
  }
  
  if (currentScreen === 'occupation') {
    const selected = document.querySelector('.occupation-options .option-card.selected')
    if (selected) {
      setQuizData({ occupation: selected.dataset.value })
    }
  }
  
  if (currentScreen === 'priority') {
    const selected = document.querySelectorAll('.priority-options .priority-option.selected')
    const priorities = Array.from(selected).map(el => el.dataset.value)
    setQuizData({ priorities })
  }
}

function attachEventListeners() {
  document.querySelector('[data-action="start"]')?.addEventListener('click', goNext)
  document.querySelector('[data-action="next"]')?.addEventListener('click', goNext)
  document.querySelector('[data-action="back"]')?.addEventListener('click', goBack)
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.dataset.lang
      setLanguage(lang)
      render()
    })
  })
  
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentElement
      const isMultiple = parent.classList.contains('occupation-options') === false && 
                        parent.classList.contains('gender-options') === false
      
      if (!isMultiple) {
        parent.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'))
      }
      e.currentTarget.classList.toggle('selected')
    })
  })
  
  document.querySelectorAll('.priority-option').forEach(card => {
    card.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('selected')
    })
  })
  
  const ageInput = document.querySelector('#age-input')
  const ageValue = document.querySelector('#age-value')
  if (ageInput && ageValue) {
    ageInput.addEventListener('input', (e) => {
      ageValue.textContent = e.target.value
    })
  }
  
  document.querySelector('.btn-submit')?.addEventListener('click', () => {
    collectCurrentStepData()
    navigateTo('report')
  })
  
  document.querySelector('[data-action="restart"]')?.addEventListener('click', () => {
    setQuizData({
      age: 28,
      gender: null,
      occupation: null,
      priorities: [],
    })
    navigateTo('landing')
  })
}

render()
