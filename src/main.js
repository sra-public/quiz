import './style.css'
import { LandingPage, AgeStep, GenderStep, OccupationStep, PriorityStep } from './layouts.js'

const screens = {
  landing: LandingPage,
  age: AgeStep,
  gender: GenderStep,
  occupation: OccupationStep,
  priority: PriorityStep,
}

const screenOrder = ['landing', 'age', 'gender', 'occupation', 'priority']

let currentScreen = 'landing'

function render() {
  const app = document.querySelector('#app')
  app.innerHTML = screens[currentScreen]()
  attachEventListeners()
}

function navigateTo(screen) {
  currentScreen = screen
  render()
}

function goNext() {
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

function attachEventListeners() {
  document.querySelector('[data-action="start"]')?.addEventListener('click', goNext)
  document.querySelector('[data-action="next"]')?.addEventListener('click', goNext)
  document.querySelector('[data-action="back"]')?.addEventListener('click', goBack)
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'))
      e.target.classList.add('active')
    })
  })
  
  document.querySelectorAll('.option-card, .priority-option').forEach(card => {
    card.addEventListener('click', (e) => {
      const target = e.currentTarget
      target.classList.toggle('selected')
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
    alert('Results page coming soon!')
  })
}

render()
