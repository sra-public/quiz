import { Header, ProgressBar, OptionCard, PriorityOption, AgeSlider, NavButtons, SubmitButton } from './components.js'

export function LandingPage() {
  return `
    ${Header()}
    <main class="hero">
      <div class="hero-image">
        [ FULL WIDTH HERO IMAGE ]
        <br>Characters pointing & smiling
      </div>
      <p class="hero-tagline">Left Democratic Front · Keralam</p>
      <h2>Why should you<br>vote for<br>LDF?</h2>
      <p>10 years of governance. Tell us who you are — and we'll show you exactly what we've done for you.</p>
    </main>
    <div class="cta-card">
      <h3>Your Story Starts Here</h3>
      <p>Share a little about yourself to see how LDF's work has shaped your life.</p>
      <button class="btn-primary" data-action="start">Start My Journey ></button>
    </div>
  `
}

export function AgeStep() {
  return `
    ${Header()}
    ${ProgressBar(1, 4)}
    <main class="quiz-content">
      <h3>Your Story Starts Here</h3>
      <h2>Your Age</h2>
      <label>YOUR AGE *</label>
      ${AgeSlider(28)}
    </main>
    ${NavButtons(false)}
  `
}

export function GenderStep() {
  const options = [
    { icon: '👩', label: 'Woman', value: 'woman' },
    { icon: '👨', label: 'Man', value: 'man' },
  ]
  
  return `
    ${Header()}
    ${ProgressBar(2, 4)}
    <main class="quiz-content">
      <h3>Your Story Starts Here</h3>
      <h2>Gender</h2>
      <label>GENDER *</label>
      <div class="gender-options">
        ${options.map(o => OptionCard(o.icon, o.label, o.value)).join('')}
      </div>
    </main>
    ${NavButtons()}
  `
}

export function OccupationStep() {
  const options = [
    { icon: '🎓', label: 'Student', value: 'student' },
    { icon: '🌾', label: 'Farmer', value: 'farmer' },
    { icon: '👷', label: 'Worker', value: 'worker' },
    { icon: '🐟', label: 'Fisher', value: 'fisher' },
    { icon: '👴', label: 'Senior', value: 'senior' },
    { icon: '♿', label: 'Diff. Abled', value: 'differently_abled' },
    { icon: '💻', label: 'Techie', value: 'techie' },
    { icon: '💼', label: 'Business', value: 'business' },
  ]
  
  return `
    ${Header()}
    ${ProgressBar(3, 4)}
    <main class="quiz-content">
      <h3>Your Story Starts Here</h3>
      <h2>I am a...</h2>
      <label>I AM A... *</label>
      <div class="occupation-options">
        ${options.map(o => OptionCard(o.icon, o.label, o.value)).join('')}
      </div>
    </main>
    ${NavButtons()}
  `
}

export function PriorityStep() {
  const options = [
    { icon: '❤️', label: 'Health', value: 'health' },
    { icon: '📚', label: 'Education', value: 'education' },
    { icon: '💼', label: 'Jobs', value: 'jobs' },
    { icon: '🏠', label: 'Housing', value: 'housing' },
    { icon: '🤝', label: 'Welfare', value: 'welfare' },
    { icon: '🛣️', label: 'Infrastructure', value: 'infrastructure' },
    { icon: '🌿', label: 'Environment', value: 'environment' },
    { icon: '🏭', label: 'Industry', value: 'industry' },
    { icon: '🚌', label: 'Transport', value: 'transport' },
    { icon: '⚖️', label: 'Social Justice', value: 'social_justice' },
  ]
  
  return `
    ${Header()}
    ${ProgressBar(4, 4)}
    <main class="quiz-content">
      <h3>Your Story Starts Here</h3>
      <h2>What Matters Most to You?</h2>
      <label>WHAT MATTERS MOST TO YOU?</label>
      <div class="priority-options">
        ${options.map(o => PriorityOption(o.icon, o.label, o.value)).join('')}
      </div>
      ${SubmitButton()}
    </main>
    ${NavButtons()}
  `
}
