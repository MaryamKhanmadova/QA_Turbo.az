describe('template spec', () => {
    it('passes', () => {
        cy.visit('/')
        cy.viewport("macbook-13");

        cy.get('.tz-dropdown__selected').first().click()
        cy.get('.tz-dropdown__option-label').each(($ele) => {
            if ($ele.text() == "BMW") {
                cy.wrap($ele).click();
                cy.get('[data-id="q_model"]').click();
                cy.get('.tz-dropdown__option-label').each(($ele) => {
                    if ($ele.text() == "2-series") {
                        cy.wrap($ele).click();
                    }
                })
            }
        })
        cy.get('label[for="q_price_from"]').type("5000")
        cy.get('label[for="q_price_to"]').type("50000")

        cy.get('button[name="commit"]').click()

        cy.get('.products-i').should('have.length', 3)
        // cy.visit('/autos/7914125-bmw-230')

        cy.get('.products-i__link').invoke('attr', 'href').then((attributeValue) => {
            cy.visit(attributeValue)
        });

        cy.get(".product-phones__btn").click();

        cy.get('.product-phones__list-i').invoke('text').then((text) => {
            cy.log(text);
        });
    })
})