/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';

const Formulario = ({
  moneda,
  setmoneda,
  criptomoneda,
  setcriptomoneda,
  setconsultarApi,
}) => {
  const [criptomonedas, setcriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setcriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const obtenerMoneda = monedaValue => {
    setmoneda(monedaValue);
  };

  const obtenerCriptoMoneda = criptoMonedaValue => {
    setcriptomoneda(criptoMonedaValue);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    setconsultarApi(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        itemStyle={{height: 120}}
        selectedValue={moneda}
        onValueChange={monedaValue => obtenerMoneda(monedaValue)}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label=" Dolar de Estados Unidos " value="USD" />
        <Picker.Item label=" Peso Mexicano " value="MXN" />
        <Picker.Item label=" Euro " value="EUR" />
        <Picker.Item label=" Libra Esterlina " value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        itemStyle={{height: 120}}
        selectedValue={criptomoneda}
        onValueChange={criptoMonedaValue =>
          obtenerCriptoMoneda(criptoMonedaValue)
        }>
        <Picker.Item label="- Seleccione -" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.texto}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {backgroundColor: '#5E49E2', padding: 10, marginTop: 20},
  texto: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
