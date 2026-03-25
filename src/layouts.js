import { Header, ProgressBar, OptionCard, PriorityOption, AgeSlider, NavButtons, SubmitButton } from './components.js'
import { generateReportHTML } from './mock-reports.js'
import { t } from './i18n.js'

export let quizData = {
  age: 28,
  gender: null,
  occupation: null,
  priorities: [],
}

export function setQuizData(data) {
  quizData = { ...quizData, ...data }
}

export function getQuizData() {
  return quizData
}

export function LandingPage() {
  return `
    ${Header()}
    <main class="hero">
      <div class="hero-image">
        <img src="/IMG/hero.png" alt="LDF - Left Democratic Front" class="hero-img">
      </div>
      <p class="hero-tagline">${t('tagline')}</p>
      <h2>${t('heroTitle1')}<br>${t('heroTitle2')}<br>${t('heroTitle3')}</h2>
      <p>${t('heroDesc')}</p>
    </main>
    <div class="cta-card">
      <h3>${t('ctaTitle')}</h3>
      <p>${t('ctaDesc')}</p>
      <button class="btn-primary" data-action="start">${t('ctaButton')}</button>
    </div>
  `
}

export function AgeStep() {
  return `
    ${Header()}
    ${ProgressBar(1, 4)}
    <main class="quiz-content">
      <h3>${t('yourStory')}</h3>
      <h2>${t('ageTitle')}</h2>
      <label>${t('ageLabel')}</label>
      ${AgeSlider(28)}
    </main>
    ${NavButtons(false)}
  `
}

export function GenderStep() {
  const options = [
    { icon: '<img src="/icons_gender/gender_male.jpeg" alt="Man">', label: t('man'), value: 'man' },
    { icon: '<img src="/icons_gender/gender_female.jpeg" alt="Woman">', label: t('woman'), value: 'woman' },
    { icon: '<img src="/icons_gender/gender_nb.jpeg" alt="Non-binary">', label: t('nonBinary'), value: 'non_binary' },
    { icon: '<img src="/icons_gender/gender_donot_say.jpeg" alt="Prefer not to say">', label: t('preferNotToSay'), value: 'prefer_not_to_say' },
  ]
  
  return `
    ${Header()}
    ${ProgressBar(2, 4)}
    <main class="quiz-content">
      <h3>${t('yourStory')}</h3>
      <h2>${t('genderTitle')}</h2>
      <label>${t('genderLabel')}</label>
      <div class="gender-options">
        ${options.map(o => OptionCard(o.icon, o.label, o.value)).join('')}
      </div>
    </main>
    ${NavButtons()}
  `
}

export function OccupationStep() {
  const options = [
    { icon: '🎓', label: t('student'), value: 'student' },
    { icon: '🌾', label: t('farmer'), value: 'farmer' },
    { icon: '👷', label: t('worker'), value: 'worker' },
    { icon: '🐟', label: t('fisher'), value: 'fisher' },
    { icon: '👴', label: t('senior'), value: 'senior' },
    { icon: '♿', label: t('differentlyAbled'), value: 'differently_abled' },
    { icon: '💻', label: t('techie'), value: 'techie' },
    { icon: '💼', label: t('business'), value: 'business' },
  ]
  
  return `
    ${Header()}
    ${ProgressBar(3, 4)}
    <main class="quiz-content">
      <h3>${t('yourStory')}</h3>
      <h2>${t('occupationTitle')}</h2>
      <label>${t('occupationLabel')}</label>
      <div class="occupation-options">
        ${options.map(o => OptionCard(o.icon, o.label, o.value)).join('')}
      </div>
    </main>
    ${NavButtons()}
  `
}

export function PriorityStep() {
  const options = [
    { icon: '❤️', label: t('health'), value: 'health' },
    { icon: '📚', label: t('education'), value: 'education' },
    { icon: '💼', label: t('jobs'), value: 'jobs' },
    { icon: '🏠', label: t('housing'), value: 'housing' },
    { icon: '🤝', label: t('welfare'), value: 'welfare' },
    { icon: '🛣️', label: t('infrastructure'), value: 'infrastructure' },
    { icon: '🌿', label: t('environment'), value: 'environment' },
    { icon: '🏭', label: t('industry'), value: 'industry' },
    { icon: '🚌', label: t('transport'), value: 'transport' },
    { icon: '⚖️', label: t('socialJustice'), value: 'social_justice' },
  ]
  
  return `
    ${Header()}
    ${ProgressBar(4, 4)}
    <main class="quiz-content">
      <h3>${t('yourStory')}</h3>
      <h2>${t('priorityTitle')}</h2>
      <label>${t('priorityLabel')}</label>
      <div class="priority-options">
        ${options.map(o => PriorityOption(o.icon, o.label, o.value)).join('')}
      </div>
      ${SubmitButton()}
    </main>
    ${NavButtons()}
  `
}

export function ReportPage(report) {
  return `
    ${Header()}
    <main class="report-page">
      ${generateReportHTML(report)}
    </main>
  `
}
