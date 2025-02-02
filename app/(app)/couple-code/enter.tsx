import React from 'react';
import Paragraph from 'components/Paragraph';
import EnterCode from 'views/app/CoupleCode/Enter/EnterCode';
import ButtonsEnter from 'views/app/CoupleCode/Enter/ButtonsEnter';

export default function Enter(): React.JSX.Element {
  return (
    <>
      <Paragraph style={{ textAlign: 'center' }}>
        Ingresa el codigo de tu pareja y empieza a crear recuerdos juntos 💙
      </Paragraph>
      <EnterCode />
      <ButtonsEnter />
    </>
  );
}
