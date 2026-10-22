import React, { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { iProduct } from '../../interfaces';

type props = {
  username: string;
  products: iProduct[];
};

// Ticket do pedido renderizado como View para ser capturado como imagem (react-native-view-shot)
const OrderTicketImage = forwardRef<View, props>(({ username, products }, ref) => {
  const totalItems = products.reduce((sum, product) => sum + (product.quantity || 0), 0);
  const total = products.reduce((sum, product) => sum + (product.quantity || 0) * (product.price || 0), 0);

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
      <Text style={[styles.text, styles.center]}>{username.toUpperCase()}</Text>
      <View style={styles.divider} />

      <Text style={[styles.text, styles.center]}>PEDIDO</Text>
      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={[styles.text, styles.qty]}>QTD</Text>
        <Text style={[styles.text, styles.description]}>DESCRIÇÃO</Text>
        <Text style={[styles.text, styles.unitPrice]}>P.UNIT</Text>
        <Text style={[styles.text, styles.subtotal]}>SUBTOTAL</Text>
      </View>

      {products.map((product, idx) => (
        <View key={product.id ?? idx} style={styles.row}>
          <Text style={[styles.text, styles.qty]}>{product.quantity}</Text>
          <Text style={[styles.text, styles.description]}>{product.description}</Text>
          <Text style={[styles.text, styles.unitPrice]}>R$ {(product.price || 0).toFixed(2)}</Text>
          <Text style={[styles.text, styles.subtotal]}>
            R$ {((product.quantity || 0) * (product.price || 0)).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.divider} />
      <Text style={[styles.text, styles.center]}>RESUMO DO PEDIDO</Text>
      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.text}>QUANT. ITENS</Text>
        <Text style={styles.text}>TOTAL</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.text}>{totalItems}</Text>
        <Text style={styles.text}>R$ {total.toFixed(2)}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
});

export default OrderTicketImage;

const styles = StyleSheet.create({
  container: { width: 400, backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 8 },
  text: { fontSize: 14, fontWeight: 'bold', color: '#000' },
  center: { textAlign: 'center' },
  divider: { borderTopWidth: 2, borderColor: '#000', marginVertical: 4 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 1 },
  qty: { width: '10%', textAlign: 'left' },
  description: { width: '45%', textAlign: 'center' },
  unitPrice: { width: '20%', textAlign: 'center' },
  subtotal: { width: '25%', textAlign: 'right' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
});
