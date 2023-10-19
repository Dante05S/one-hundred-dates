import Paragraph from 'components/Paragraph';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import socialNetworks from 'utils/socialNetworks';
import { Link } from 'expo-router';

export default function Footer(): React.JSX.Element {
  return (
    <View style={styles.footer}>
      <Paragraph style={styles.text}>
        Made with ❤️ by Alejandro Bedoya Sanchez for my girlfriend ❤️
      </Paragraph>
      <View style={styles.containerSocial}>
        {socialNetworks.map((socialNetwork) => (
          <Link key={socialNetwork.key} href={socialNetwork.href}>
            <AntDesign name={socialNetwork.icon} size={29} color="#AEE6F8" />
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  text: {
    fontSize: 13,
    textAlign: 'center'
  },
  containerSocial: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  }
});
