import moment from 'moment';
import { iProduct } from '../../interfaces';

export function generateBodyHtml(clientName: string, address: string, deliveryDate: Date, products: iProduct[]) {
  let body = `
        ${generateHeader()}
        ${generateClientInfo(clientName, address, deliveryDate)}
        ${generateProductsTable(products)}
        ${generateSummary(products)}
        ${generateFooter()}
      `;

  return body;
}

function generateHeader() {
  return `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
            <b style="font-size: 55px">${'RC CHURRASCO'}</b>
            <b style="font-size: 45px">===========================================</b>
        </div>
    `;
}

function generateClientInfo(clientName: string, address: string, deliveryDate: Date) {
  return `          
        <div style="display: flex; flex-direction: column;" >
            ${
              deliveryDate
                ? `<div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" > <b style="font-size: 50px">AGENDADO PARA: </b> <b style="font-size: 50px">${deliveryDate.toLocaleDateString(
                    'pt-br',
                  )}</b> </div>`
                : ''
            }
            ${
              clientName
                ? `<div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" > <b style="font-size: 50px">CLIENTE: </b> <b style="font-size: 50px">${clientName.toUpperCase()}</b> </div>`
                : ''
            }
            ${
              address
                ? `<div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" > <b style="font-size: 50px">ENDEREÇO: </b> <b style="font-size: 50px">${address.toUpperCase()}</b> </div>`
                : ''
            }
            <b style="font-size: 45px">===========================================</b>
        </div>
    `;
}

function generateProductsTable(products: iProduct[]) {
  let header = `
          <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
            <div style="width: 10%; display: flex; align-items: center; justify-content: flex-start;">
                <b style="font-size: 50px">QTD</b>
            </div>
            <div style="width: 45%; display: flex; align-items: center; justify-content: center;">
                <b style="font-size: 50px">DESCRIÇÃO</b>
            </div>
            <div style="width: 20%;  display: flex; align-items: center; justify-content: center;">
                <b style="font-size: 50px">P.UNIT</b>
            </div>
            <div style="width: 25%;  display: flex; align-items: center; justify-content: flex-end;">
                <b style="font-size: 50px">SUBTOTAL</b>
            </div>
          </div>
        `;

  let productsRow = ``;

  for (const product of products) {
    productsRow += `
            <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
                <div style=" display: flex; width: 10%; align-items: center; justify-content: flex-start;">
                    <b style="font-size: 45px">${product.quantity}</b>
                </div>
                <div style=" display: flex; width: 45%; align-items: center; justify-content: center;">
                    <b style="font-size: 45px">${product.description}</b>
                </div>
                <div style=" display: flex; width: 20%; align-items: center; justify-content: center;">
                    <b style="font-size: 45px">${product.price?.toFixed(2)}</b>
                </div>
                <div style=" display: flex; width: 25%; align-items: center; justify-content: flex-end;">
                    <b style="font-size: 45px">R$ ${(product.quantity! * product.price!).toFixed(2)}</b>
                </div>
            </div>
            `;
  }

  return header.concat(productsRow);
}

function generateSummary(products: iProduct[]) {
  let totalItems = 0;
  let total = 0;

  for (const product of products) {
    totalItems += product.quantity!;
    total += product.quantity! * product.price!;
  }

  return `
        <b style="font-size: 45px">===========================================</b>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
            <b style="font-size: 55px">RESUMO DO PEDIDO</b>
            <b style="font-size: 45px">===========================================</b>
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
            <b style="font-size: 50px">QUANT. ITENS</b>
            <b style="font-size: 50px">TOTAL</b>
          </div>
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
            <b style="font-size: 45px">${totalItems}</b>
            <b style="font-size: 45px">R$ ${total.toFixed(2)}</b>
          </div>
  `;
}

function generateFooter() {
  const date = moment();
  return `
    <b style="font-size: 45px">===========================================</b>
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 50px">
          <b style="font-size: 55px">***ESTE NÃO É UM TICKET FISCAL***</b>
          <b style="font-size: 45px; text-align: center; margin-top: 50px">Ticket gerado em  ${date.toDate().toLocaleString('pt-br')}.</b>
      </div>
      `;
}
