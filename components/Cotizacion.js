import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Cotizacion = ({resultado}) => {
  if (Object.keys(resultado).length === 0) {
    return null;
  }
  return (
    <View style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>Precio : {resultado.PRICE}</Text>
      </Text>
      <Text style={styles.texto}>
        <Text style={styles.span}>
          Precio más alto del dia: {''} {resultado.HIGHDAY}
        </Text>
      </Text>
      <Text style={styles.texto}>
        <Text style={styles.span}>
          Precio más bajo del dia: {''} {resultado.LOWDAY}
        </Text>
      </Text>
      <Text style={styles.texto}>
        <Text style={styles.span}>
          Variación ultimas 24 horas : {''} {resultado.CHANGEPCT24HOUR} %
        </Text>
      </Text>
      <Text style={styles.texto}>
        <Text style={styles.span}>
          Última actualizacion : {''} {resultado.LASTUPDATE}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultado: {backgroundColor: '#5E49E2', padding: 20},
  texto: {
    color: '#FFF',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  precio: {fontSize: 38},
  span: {fontFamily: 'Lato-Black'},
});

export default Cotizacion;
