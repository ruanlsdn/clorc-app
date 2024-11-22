import { iProduct } from '../../interfaces';

export function generateBodyHtml(products: iProduct[]) {
  let body = `
      ${generateHeader()}
      ${generateProductsTable(products)}
    `;

  return body;
}

function generateHeader() {
  return `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
          <b style="font-size: 55px">RELATÓRIO DE ESTOQUE</b>
          <b style="font-size: 45px">===========================================</b>
      </div>
      `;
}

function generateProductsTable(products: iProduct[]) {
  let header = `
      <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
          <div style="width: 70%; display: flex; align-items: center; justify-content: center;">
              <b style="font-size: 50px">DESCRIÇÃO</b>
          </div>
          <div style="width: 30%;  display: flex; align-items: center; justify-content: center;">
              <b style="font-size: 50px">QTD</b>
          </div>
      </div>
      `;

  let productsRow = ``;

  for (const product of products) {
    productsRow += `
          <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
              <div style=" display: flex; width: 70%; align-items: center; justify-content: center;">
                  <b style="font-size: 45px">${product.description}</b>
              </div>
              <div style=" display: flex; width: 30%; align-items: center; justify-content: center; text-align: center;">
                  <b style="font-size: 45px">${product.quantity}</b>
              </div>
          </div>
          `;
  }

  return header.concat(productsRow);
}
