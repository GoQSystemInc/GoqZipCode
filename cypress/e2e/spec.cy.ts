const url = 'http://localhost:8080/docs/index.html';

const addressList = [
  {
    postalCode: '104-0031',
    address: '東京都中央区京橋',
  },
  {
    postalCode: '740-0017',
    address: '山口県岩国市今津町',
  },
];

describe('GoqZipCodeのテスト', () => {
  it('郵便番号から住所を検索（完全一致）', () => {
    cy.visit(url)
      // ページ開始時にすぐ入力するとgoqzipcodeが発火しないため待つ
      .wait(2000)
      .then(() => {
        addressList.forEach((x) => {
          cy.get('#zip1')
            .clear()
            .type(x.postalCode)
            .get('#js-result1')
            .should('have.value', x.address);
        });
      });
  });

  it('郵便番号から住所を検索（前方一致）', () => {
    cy.visit(url)
      .wait(2000)
      .then(() => {
        addressList.forEach((x) => {
          cy.get('#zip2')
            .clear()
            .type(x.postalCode.slice(0, -1))
            .get('#dropdown2')
            .contains(x.postalCode)
            .click()
            .get('#js-result2')
            .should('have.value', x.address);
        });
      });
  });

  it('住所から郵便番号を検索（完全一致）', () => {
    cy.visit(url)
      .wait(2000)
      .then(() => {
        addressList.forEach((x) => {
          cy.get('#address1')
            .clear()
            .type(x.address)
            .get('#js-result3')
            .should('have.value', x.postalCode);
        });
      });
  });

  it('住所から郵便番号を検索（前方一致）', () => {
    cy.visit(url)
      .wait(2000)
      .then(() => {
        addressList.forEach((x) => {
          cy.get('#address2')
            .clear()
            .type(x.address.slice(0, -1))
            .get('#dropdown4')
            .contains(x.address)
            .click()
            .get('#js-result4')
            .should('have.value', x.postalCode);
        });
      });
  });

  it('住所から郵便番号を検索（部分一致）', () => {
    cy.visit(url)
      .wait(2000)
      .then(() => {
        addressList.forEach((x) => {
          cy.get('#address3')
            .clear()
            .type(x.address.slice(1, -1))
            .get('#dropdown5')
            .contains(x.address)
            .click()
            .get('#js-result5')
            .should('have.value', x.postalCode);
        });
      });
  });
});
