import { iProduct } from '../../interfaces';
import { MenuThemeEnum } from '../../enums/ActionEnum';

export function generateMenuBodyHtml(
  products: iProduct[],
  businessName: string,
  footerText: string = 'Obrigado pela preferência!',
  subFooterText: string = 'Faça seu pedido pelo WhatsApp',
  observation?: string,
  theme: MenuThemeEnum = MenuThemeEnum.DEFAULT
) {
  const themeStyles = getThemeStyles(theme);

  return `
    <div style="${themeStyles.container}">
      <div style="${themeStyles.header}">
        <span style="${themeStyles.businessName}">${businessName.toUpperCase()}</span><br>
        <span style="${themeStyles.menuTitle}">TABELA DE PREÇOS</span>
      </div>
      ${observation && observation.trim() !== '' ? `
        <div style="${themeStyles.observation}">
          ${observation}
        </div>
      ` : ''}
      <div style="${themeStyles.date}">
        <br>
      </div>
      <div style="${themeStyles.content}">
        <div style="${themeStyles.tableHeader}">
          <div style="${themeStyles.productHeader}">PRODUTO</div>
          <div style="${themeStyles.priceHeader}">PREÇO UNITÁRIO</div>
        </div>
        ${generateProductsRows(products, theme)}
      </div>
      <div style="${themeStyles.footer}">
        <div style="${themeStyles.footerText}">${footerText}</div>
        <div style="${themeStyles.subFooterText}">${subFooterText}</div>
      </div>
    </div>
  `;
}

function getThemeStyles(theme: MenuThemeEnum) {
  switch (theme) {
    case MenuThemeEnum.VIBRANT:
      return {
        container: 'background:#fff; color:#000; width:800px; margin:0; padding:0; font-family:sans-serif; box-sizing:border-box; display:flex; flex-direction:column; justify-content:flex-start;',
        header: 'background:#ed1c24; color:#fff; text-align:center; padding:16px 0 4px 0; border-bottom:2px solid #000;',
        businessName: 'font-size:40px; font-weight:bold; letter-spacing:2px;',
        menuTitle: 'font-size:22px; color:#fff; font-weight:bold;',
        observation: 'background:#ed1c24; color:#fff; text-align:center; font-size:18px; font-weight:bold; margin:0px 0; padding:16px 0; border-radius:6px;',
        date: 'background:#f7f700; color:#000; text-align:center; padding:6px 0; font-weight:bold; border-top:2px solid #000; border-bottom:2px solid #000;',
        content: 'padding:0 0px;',
        tableHeader: 'display:flex; font-weight:bold; color:#fff; font-size:20px; background:#ed1c24; border-top:2px solid #000; border-bottom:2px solid #000;',
        productHeader: 'flex:2; text-align:left; padding:6px 0 6px 8px;',
        priceHeader: 'flex:1; text-align:right; padding:6px 8px 6px 0;',
        footer: 'background:#ed1c24; color:#fff; text-align:center; padding:18px 0 10px 0; font-weight:bold;',
        footerText: 'font-size:20px; font-weight:bold; color:#fff;',
        subFooterText: 'font-size:18px; color:#fff; font-weight:bold; margin-top:4px;'
      };
    default: // MenuThemeEnum.DEFAULT
      return {
        container: 'background:#202123; color:#D9D9E3; width:800px; margin:0; padding:0; font-family:sans-serif; box-sizing:border-box; display:flex; flex-direction:column; justify-content:flex-start;',
        header: 'color:#19C37D; text-align:center; padding:16px 0 4px 0;',
        businessName: 'font-size:32px; font-weight:bold;',
        menuTitle: 'font-size:20px; color:#D9D9E3;',
        observation: 'background:#FFD600; color:#202123; text-align:center; font-size:18px; font-weight:bold; margin:16px 0; padding:8px 0; border-radius:6px;',
        date: 'background:#202123; color:#D9D9E3; text-align:center; padding:6px 0; margin-bottom:8px;',
        content: 'padding:0 24px;',
        tableHeader: 'display:flex; font-weight:bold; color:#19C37D; font-size:18px; background:#343541;',
        productHeader: 'flex:2; text-align:left; padding:6px 0 6px 8px;',
        priceHeader: 'flex:1; text-align:right; padding:6px 8px 6px 0;',
        footer: 'background:#202123; color:#D9D9E3; text-align:center; padding:18px 0 10px 0;',
        footerText: 'font-size:20px; font-weight:bold;',
        subFooterText: 'font-size:18px; color:#19C37D;'
      };
  }
}

function generateProductsRows(products: iProduct[], theme: MenuThemeEnum = MenuThemeEnum.DEFAULT) {
  if (products.length === 0) {
    const emptyTextColor = theme === MenuThemeEnum.VIBRANT ? '#000' : '#D9D9E3';
    const emptyTextStyle = theme === MenuThemeEnum.VIBRANT ? 'font-weight:bold;' : '';
    return `<div style='text-align:center; color:${emptyTextColor}; font-size:16px; padding:20px; ${emptyTextStyle}'>Nenhum produto cadastrado</div>`;
  }

  const sortedProducts = [...products].sort((a, b) => (a.description || '').localeCompare(b.description || ''));
  return sortedProducts.map((product, idx) => {
    let bg, textColor, priceColor, borderStyle, productBorderRight;

    if (theme === MenuThemeEnum.VIBRANT) {
      bg = '#f7f700';
      textColor = '#000';
      priceColor = '#000';
      borderStyle = 'border-bottom:2px solid #000;';
      productBorderRight = '';
    } else {
      bg = idx % 2 === 0 ? '#2A2B2C' : '#343541';
      textColor = '#D9D9E3';
      priceColor = '#19C37D';
      borderStyle = '';
      productBorderRight = '';
    }

    return `
      <div style="display:flex; font-size:16px; background:${bg}; color:${textColor}; ${borderStyle}">
        <div style="flex:2; text-align:left; padding:4px 0 4px 8px; color:${textColor}; font-weight:bold; ${productBorderRight}">${product.description || 'Produto sem nome'}</div>
        <div style="flex:1; text-align:right; color:${priceColor}; font-weight:bold; padding:4px 8px 4px 0;">R$ ${(product.price || 0).toFixed(2)}</div>
      </div>
    `;
  }).join('');
} 