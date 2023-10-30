import React from 'react';
import useFormControl from 'hooks/useFormControl';
import getFormControlState from 'utils/formControlState';
import Paragraph from 'components/Paragraph';
import { makeStyles } from 'helpers/makeStyles';

interface Props {
  children: React.ReactNode;
  error?: boolean;
}

export default function FormHelperText({
  children,
  error
}: Props): React.JSX.Element {
  const muiFormControl = useFormControl();
  const styles = useStyles();

  const formControlState = getFormControlState(
    { error },
    ['error'],
    muiFormControl
  );
  return (
    <>
      {children !== undefined && (
        <Paragraph
          variant="span"
          style={[
            styles.text,
            formControlState.error ?? false ? styles.error : styles.notError
          ]}
        >
          {(formControlState.error ?? false) && (
            <Paragraph variant="span" style={[styles.error]}>
              *
            </Paragraph>
          )}
          {children}
        </Paragraph>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: 4,
    marginLeft: 8
  },
  notError: {
    opacity: 0.5
  },
  error: {
    color: theme.palette.error
  }
}));
