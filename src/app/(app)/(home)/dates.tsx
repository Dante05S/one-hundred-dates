import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Frame from 'components/Display/Frame';

export default function Dates(): React.JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={{ marginRight: 10 }}>
          <Text style={styles.title}>Ir al Cine</Text>
        </View>
        {/* <Image
          style={styles.image}
          source={require('../../../assets/images/Cine.png')}
          contentFit="cover"
        /> */}
      </View>
      <View style={styles.containerFrames}>
        <Frame couple={0} color="primary" pin="first" />
        <Frame couple={1} color="secondary" pin="second" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60
  },
  containerFrames: {
    marginTop: 30,
    display: 'flex',
    paddingHorizontal: 10
  },
  title: {
    fontFamily: 'dynamic-schematic',
    fontSize: 55
  },
  image: {
    width: 75,
    height: 82
  }
});
