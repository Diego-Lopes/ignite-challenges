describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/') // definimos no cypress.config.ts uma baseURL e por isso usamos apenas '/'
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href^="/product"]').first().click()

    // validando a url com should include
    cy.url().should('include', '/product')

    // validando a url com location e validando com should include
    cy.location('pathname').should('include', '/product')

    // adicionar ao carrinho
    cy.contains('Adicionar ao carrinho').click()

    // garantindo que funcionou a adição no carrinho.
    // vamos encontrar o cart validar.
    cy.contains('Cart (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.get('a[href^="/product"]').first().click()

    // validando a url com should include
    cy.url().should('include', '/product')

    // adicionar ao carrinho
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()

    // garantindo que funcionou a adição no carrinho.
    // vamos encontrar o cart validar.
    cy.contains('Cart (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {
    // cy.get('input[name=q]').type('moletom').parent('form').submit()
    cy.searchByQuery('moletom')

    // pegar o primeiro elemento tag a
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })
})
