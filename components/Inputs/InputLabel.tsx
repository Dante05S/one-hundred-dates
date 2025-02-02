import React from 'react';
import Paragraph, { type ParagraphProps } from 'components/Paragraph';
import useFormControl from 'hooks/useFormControl';
import getFormControlState from 'utils/formControlState';
import { makeStyles } from 'helpers/makeStyles';

interface Props extends ParagraphProps {
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
}

export default function InputLabel({
  children,
  required,
  error,
  ...rest
}: Props): React.JSX.Element {
  const styles = useStyles();
  const muiFormControl = useFormControl();

  const formControlState = getFormControlState(
    { error, required },
    ['error', 'required'],
    muiFormControl
  );

  return (
    <Paragraph
      style={[
        styles.label,
        formControlState.error ?? false ? styles.error : {}
      ]}
      {...rest}
    >
      {(formControlState.required ?? false) && (
        <Paragraph style={styles.required}>*</Paragraph>
      )}
      {children}
    </Paragraph>
  );
}

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 12,
    marginVertical: 2,
    paddingLeft: 4
  },
  required: {
    fontSize: 14,
    color: theme.palette.primary.main
  },
  error: {
    color: theme.palette.error
  }
}));
