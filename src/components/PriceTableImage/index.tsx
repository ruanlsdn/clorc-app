import React, { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MenuThemeEnum } from '../../enums/ActionEnum';
import { iProduct } from '../../interfaces';

type props = {
  products: iProduct[];
  businessName: string;
  footerText: string;
  subFooterText: string;
  observation?: string;
  theme: MenuThemeEnum;
};

// Tabela de preços renderizada como View para ser capturada como imagem (react-native-view-shot)
const PriceTableImage = forwardRef<View, props>(
  ({ products, businessName, footerText, subFooterText, observation, theme }, ref) => {
    const s = theme === MenuThemeEnum.VIBRANT ? vibrant : standard;
    const sortedProducts = [...products].sort((a, b) => (a.description || '').localeCompare(b.description || ''));

    return (
      <View ref={ref} collapsable={false} style={s.container}>
        <View style={s.header}>
          <Text style={s.businessName}>{businessName.toUpperCase()}</Text>
          <Text style={s.menuTitle}>TABELA DE PREÇOS</Text>
        </View>

        {observation && observation.trim() !== '' ? <Text style={s.observation}>{observation}</Text> : null}

        <View style={s.separator} />

        <View style={s.content}>
          <View style={s.tableHeader}>
            <Text style={[s.tableHeaderText, styles.productCell]}>PRODUTO</Text>
            <Text style={[s.tableHeaderText, styles.priceCell]}>PREÇO UNITÁRIO</Text>
          </View>

          {sortedProducts.length === 0 ? (
            <Text style={s.empty}>Nenhum produto cadastrado</Text>
          ) : (
            sortedProducts.map((product, idx) => (
              <View key={product.id ?? idx} style={[s.row, theme === MenuThemeEnum.DEFAULT && idx % 2 !== 0 && s.rowAlt]}>
                <Text style={[s.productText, styles.productCell]}>{product.description || 'Produto sem nome'}</Text>
                <Text style={[s.priceText, styles.priceCell]}>R$ {(product.price || 0).toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>{footerText}</Text>
          <Text style={s.subFooterText}>{subFooterText}</Text>
        </View>
      </View>
    );
  },
);

export default PriceTableImage;

const styles = StyleSheet.create({
  productCell: { flex: 2, textAlign: 'left', paddingLeft: 8 },
  priceCell: { flex: 1, textAlign: 'right', paddingRight: 8 },
});

const standard = StyleSheet.create({
  container: { width: 400, backgroundColor: '#202123' },
  header: { alignItems: 'center', paddingTop: 16, paddingBottom: 4 },
  businessName: { fontSize: 26, fontWeight: 'bold', color: '#19C37D', textAlign: 'center' },
  menuTitle: { fontSize: 16, color: '#D9D9E3' },
  observation: {
    backgroundColor: '#FFD600',
    color: '#202123',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  separator: { height: 12 },
  content: { paddingHorizontal: 16 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#343541', paddingVertical: 6 },
  tableHeaderText: { fontSize: 14, fontWeight: 'bold', color: '#19C37D' },
  row: { flexDirection: 'row', backgroundColor: '#2A2B2C', paddingVertical: 4 },
  rowAlt: { backgroundColor: '#343541' },
  productText: { fontSize: 13, fontWeight: 'bold', color: '#D9D9E3' },
  priceText: { fontSize: 13, fontWeight: 'bold', color: '#19C37D' },
  empty: { textAlign: 'center', color: '#D9D9E3', fontSize: 13, padding: 20 },
  footer: { alignItems: 'center', paddingTop: 16, paddingBottom: 10 },
  footerText: { fontSize: 16, fontWeight: 'bold', color: '#D9D9E3', textAlign: 'center' },
  subFooterText: { fontSize: 14, color: '#19C37D', textAlign: 'center' },
});

const vibrant = StyleSheet.create({
  container: { width: 400, backgroundColor: '#fff' },
  header: {
    alignItems: 'center',
    backgroundColor: '#ed1c24',
    paddingTop: 16,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  businessName: { fontSize: 30, fontWeight: 'bold', letterSpacing: 2, color: '#fff', textAlign: 'center' },
  menuTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  observation: {
    backgroundColor: '#ed1c24',
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  separator: { height: 28, backgroundColor: '#f7f700', borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#000' },
  content: {},
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ed1c24',
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  tableHeaderText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  row: { flexDirection: 'row', backgroundColor: '#f7f700', paddingVertical: 4, borderBottomWidth: 2, borderColor: '#000' },
  rowAlt: {},
  productText: { fontSize: 13, fontWeight: 'bold', color: '#000' },
  priceText: { fontSize: 13, fontWeight: 'bold', color: '#000' },
  empty: { textAlign: 'center', color: '#000', fontSize: 13, padding: 20, fontWeight: 'bold' },
  footer: { alignItems: 'center', backgroundColor: '#ed1c24', paddingTop: 16, paddingBottom: 10 },
  footerText: { fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subFooterText: { fontSize: 14, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 4 },
});
