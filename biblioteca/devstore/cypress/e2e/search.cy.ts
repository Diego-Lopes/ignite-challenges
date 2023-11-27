describe('search products', () => {
  it('should be able to search for products', () => {
    cy.visit('/') // definimos no cypress.config.ts uma baseURL e por isso usamos apenas '/'

    // cy.get('input[name=q]').type('moletom').parent('form').submit()
    // substituindo a função acima para um comando personalizada.
    cy.searchByQuery('moletom')

    // garantindo que foi redirecionado para /search
    cy.location('pathname').should('include', '/search')

    cy.location('search').should('include', 'q=moletom')

    // vou garantir se ele encontrou um elemento.
    cy.get('a[href^="/product"]').should('exist')
  })

  // testar se a pagina retorna o usuário para página home, quando não tem nem um parâmentro em /search
  it('should not be able to visit search page without a search query', () => {
    /**
     * no next o redirecionamento é uma excessão mas retorna um throw então para
     * tratar esse equivoco no cypress vamos usar essa estratégia abaixo.
     */
    cy.on('uncaught:exception', () => {
      return false // isso indica que não queremos tratar essa excessão.
    })

    cy.visit('/search')

    // vou garantir que ele seja redirecionado para /
    cy.location('pathname').should('equal', '/')
  })
})
