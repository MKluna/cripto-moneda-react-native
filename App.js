/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Cotizacion from './components/Cotizacion';
import Formulario from './components/Formulario';
import Header from './components/Header';

const App = () => {
  const [moneda, setmoneda] = useState('');
  const [criptomoneda, setcriptomoneda] = useState('');
  const [consultarApi, setconsultarApi] = useState(false);
  const [resultado, setresultado] = useState([]);
  const [cargando, setcargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const result = await axios.get(url);
        setcargando(true);
        setTimeout(() => {
          setresultado(result.data.DISPLAY[criptomoneda][moneda]);
          setconsultarApi(false);
          setcargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarApi]);

  const componente = cargando ? (
    <ActivityIndicator size="large" color="#00ff00" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            setmoneda={setmoneda}
            criptomoneda={criptomoneda}
            setcriptomoneda={setcriptomoneda}
            setconsultarApi={setconsultarApi}
          />
        </View>
        <View style={{marginTop: 40}}>{componente}</View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
