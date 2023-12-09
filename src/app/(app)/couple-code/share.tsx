import React from 'react';
import Paragraph from 'components/Paragraph';
import ShareCodeProvider from 'context/ShareCodeContext/ShareCodeProvider';
import CopyCode from 'views/app/CoupleCode/Share/CopyCode';
import ButtonsShare from 'views/app/CoupleCode/Share/ButtonsShare';

export default function Share(): React.JSX.Element {
  return (
    <>
      <Paragraph style={{ textAlign: 'center' }}>
        Comparte este codigo con tu pareja y empieza a crear recuerdos juntos 💙
      </Paragraph>
      <ShareCodeProvider>
        <CopyCode />
        <ButtonsShare />
      </ShareCodeProvider>
    </>
  );
}
