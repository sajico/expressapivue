// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/app')
    cy.contains('h1', 'RouterView.vueです！')
  })
})
