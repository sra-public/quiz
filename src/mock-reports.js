export function getReport(quizData) {
  const { age, gender, occupation, priorities } = quizData
  const schemes = window.ALL_SCHEMES_DATA || []

  const occupationToTags = {
    student: ['student', 'youth', 'digital'],
    farmer: ['farmer', 'rural', 'agriculture'],
    worker: ['worker', 'labour'],
    fisher: ['fisher', 'fisheries', 'coastal', 'rural'],
    senior: ['senior', 'health', 'pension'],
    differently_abled: ['disabled', 'health', 'social_justice'],
    techie: ['techie', 'digital', 'startup', 'it'],
    business: ['business', 'merchant', 'startup', 'industry'],
  }

  const priorityToSector = {
    health: 'health',
    education: 'education',
    jobs: 'employment',
    housing: 'housing',
    welfare: 'welfare',
    infrastructure: 'infrastructure',
    environment: 'environment',
    industry: 'industry',
    transport: 'transport',
    social_justice: 'social_justice',
  }

  const matchedSchemes = schemes.filter(scheme => {
    if (!scheme.gender.includes('all') && !scheme.gender.includes(gender)) {
      return false
    }

    const schemeTags = scheme.tags || []
    const occupationTags = occupationToTags[occupation] || []
    const hasOccupationMatch = occupationTags.some(tag => schemeTags.includes(tag))

    const schemeSector = (scheme.sector || '').toLowerCase()
    const prioritySectors = priorities.map(p => priorityToSector[p] || p)
    const hasPriorityMatch = prioritySectors.includes(schemeSector)

    return hasOccupationMatch || hasPriorityMatch
  })

  const sortedSchemes = matchedSchemes.sort((a, b) => {
    const aTags = a.tags || []
    const bTags = b.tags || []
    const occupationTags = occupationToTags[occupation] || []
    
    const aOccupationScore = aTags.filter(t => occupationTags.includes(t)).length
    const bOccupationScore = bTags.filter(t => occupationTags.includes(t)).length
    
    const prioritySectors = priorities.map(p => priorityToSector[p] || p)
    const aPriorityScore = prioritySectors.includes(a.sector?.toLowerCase()) ? 1 : 0
    const bPriorityScore = prioritySectors.includes(b.sector?.toLowerCase()) ? 1 : 0
    
    return (bOccupationScore + bPriorityScore) - (aOccupationScore + aPriorityScore)
  })

  const topSchemes = sortedSchemes.slice(0, 6)

  const ageGroup = age < 25 ? 'youth' : age < 45 ? 'adult' : age < 60 ? 'middle' : 'senior'

  const stats = {
    totalSchemes: matchedSchemes.length,
    topPriority: priorities[0] || 'welfare',
    ageGroup,
  }

  return {
    schemes: topSchemes,
    stats,
    quizData,
  }
}

export function generateReportHTML(report) {
  const { schemes, stats, quizData } = report
  
  return `
    <div class="report-container">
      <section class="report-header">
        <h1>Your LDF Story</h1>
        <p class="report-subtitle">Personalized schemes and initiatives for you</p>
      </section>

      <section class="report-summary">
        <div class="summary-card">
          <span class="summary-icon">🎂</span>
          <span class="summary-value">${quizData.age} years</span>
          <span class="summary-label">Age</span>
        </div>
        <div class="summary-card">
          <span class="summary-icon">
            <img src="/icons_gender/gender_${quizData.gender === 'man' ? 'male' : quizData.gender === 'woman' ? 'female' : quizData.gender === 'non_binary' ? 'nb' : 'donot_say'}.jpeg" alt="${quizData.gender}" class="summary-img">
          </span>
          <span class="summary-value">${quizData.gender.replace('_', ' ')}</span>
          <span class="summary-label">Gender</span>
        </div>
        <div class="summary-card">
          <span class="summary-icon">💼</span>
          <span class="summary-value">${quizData.occupation}</span>
          <span class="summary-label">Occupation</span>
        </div>
        <div class="summary-card">
          <span class="summary-icon">📊</span>
          <span class="summary-value">${stats.totalSchemes}</span>
          <span class="summary-label">Schemes for you</span>
        </div>
      </section>

      <section class="report-schemes">
        <h2>Schemes That Matter to You</h2>
        <div class="schemes-grid">
          ${schemes.map(scheme => `
            <div class="scheme-card">
              <div class="scheme-sector">${scheme.sector}</div>
              <h3>${scheme.name}</h3>
              <p class="scheme-short">${scheme.short}</p>
              <p class="scheme-emotional">"${scheme.emotional}"</p>
              ${scheme.year !== 'Not specified in sources' ? `<span class="scheme-year">Since ${scheme.year}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </section>

      <section class="report-cta">
        <h2>Share Your Story</h2>
        <p>Help spread the word about LDF's work for Kerala</p>
        <div class="share-buttons">
          <button class="share-btn" data-action="share-whatsapp">WhatsApp</button>
          <button class="share-btn" data-action="share-twitter">Twitter</button>
          <button class="share-btn" data-action="share-facebook">Facebook</button>
        </div>
        <button class="btn-primary" data-action="restart">Take Quiz Again</button>
      </section>
    </div>
  `
}
