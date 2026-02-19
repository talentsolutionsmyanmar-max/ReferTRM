// ReferTRM E2E Tests

describe('ReferTRM Main Tests', () => {
  
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Home Page', () => {
    it('should load home page successfully', () => {
      cy.get('h1').should('contain', 'Refer Friends')
      cy.get('title').should('contain', 'ReferTRM')
    })

    it('should display trust stats', () => {
      cy.contains('25+').should('exist')
      cy.contains('Real Open Roles').should('exist')
    })

    it('should have working navigation', () => {
      cy.get('nav').should('exist')
    })
  })

  describe('Authentication', () => {
    it('should show login page', () => {
      cy.visit('/login')
      cy.get('input[type="email"], input[placeholder*="email"]').should('exist')
    })

    it('should show register page', () => {
      cy.visit('/register')
      cy.get('form').should('exist')
    })
  })

  describe('Dashboard Access', () => {
    it('should redirect to login when not authenticated', () => {
      cy.visit('/dashboard')
      cy.url().should('include', '/login')
    })
  })

  describe('Mobile Responsiveness', () => {
    it('should display correctly on mobile', () => {
      cy.viewport(375, 667) // iPhone SE
      cy.get('h1').should('be.visible')
    })

    it('should display correctly on tablet', () => {
      cy.viewport(768, 1024) // iPad
      cy.get('h1').should('be.visible')
    })
  })
})

describe('Performance Tests', () => {
  it('should load home page in under 3 seconds', () => {
    const start = Date.now()
    cy.visit('/')
    cy.get('h1').should('exist').then(() => {
      const duration = Date.now() - start
      expect(duration).to.be.lessThan(3000)
    })
  })
})
