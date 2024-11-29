import { ProductMap } from '../../components/SellReportConfiguration';

export function generateBodyHtml(initialDate: Date, finalDate: Date, products: Map<string, ProductMap>) {
  let body = `
    ${generateHeader(initialDate, finalDate)}
    ${generateProductsTable(products)}
    ${generateSummary(products)}
  `;

  return body;
}

function generateHeader(initialDate: Date, finalDate: Date) {
  return `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
        <b style="font-size: 55px">RELATÓRIO DE VENDAS</b>
        <b style="font-size: 45px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
        <b style="font-size: 50px">DE ${initialDate.toLocaleDateString('pt-br')} ATÉ ${finalDate.toLocaleDateString(
    'pt-br',
  )}</b>
        <b style="font-size: 45px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
    </div>
    `;
}

function generateProductsTable(products: Map<string, ProductMap>) {
  let header = `
    <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
        <div style="width: 50%; display: flex; align-items: center; justify-content: center;">
            <b style="font-size: 50px">DESCRIÇÃO</b>
        </div>
        <div style="width: 25%;  display: flex; align-items: center; justify-content: center;">
            <b style="font-size: 50px">QTD</b>
        </div>
        <div style="width: 25%;  display: flex; align-items: center; justify-content: flex-end;">
            <b style="font-size: 50px">SUBTOTAL</b>
        </div>
    </div>
    `;

  let productsRow = ``;

  for (const [key, value] of products) {
    productsRow += `
        <div style="display: flex; flex-direction: row; align-items: center; width: 100%" >
            <div style=" display: flex; width: 50%; align-items: center; justify-content: center;">
                <b style="font-size: 45px">${value.description}</b>
            </div>
            <div style=" display: flex; width: 25%; align-items: center; justify-content: center; text-align: center;">
                <b style="font-size: 45px">${value.quantity}</b>
            </div>
            <div style=" display: flex; width: 25%; align-items: center; justify-content: flex-end;">
                <b style="font-size: 45px">R$ ${value.total!.toFixed(2)}</b>
            </div>
        </div>
        `;
  }

  return header.concat(productsRow);
}

function generateSummary(products: Map<string, ProductMap>) {
  let qtdTotal = 0;
  let total = 0;

  for (const [key, value] of products) {
    qtdTotal += value.quantity!;
    total += value.total!;
  }

  return `
   <b style="font-size: 45px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;" >
        <b style="font-size: 55px">RESUMO</b>
        <b style="font-size: 45px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
    </div>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
        <b style="font-size: 50px">QUANT. ITENS</b>
        <b style="font-size: 50px">TOTAL</b>
    </div>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
        <b style="font-size: 45px">${qtdTotal}</b>
        <b style="font-size: 45px">R$ ${total.toFixed(2)}</b>
    </div>
    <b style="font-size: 45px">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</b>
  `;
}
