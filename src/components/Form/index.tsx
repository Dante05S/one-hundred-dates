/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */
// React
import React, { useMemo, useState } from 'react';

// Interfaces
import { type Error } from 'interfaces/error.interface';
import FormContext from 'context/FormContext';

// Helpers
import {
  getParamsByOption,
  getValidatorByOption,
  type ValidationField
} from 'helpers/Validator';
import { useForm } from 'react-hook-form';
import { trimValues } from 'utils/trimValues';

interface ChildrenProps {
  handleSubmit: () => void;
}

interface FormProps {
  children: (props: ChildrenProps) => React.JSX.Element;
  initValues: any;
  onChangeErrors?: (errors: Error[]) => void;
  onSubmit: (data: any) => void;
  validations?: ValidationField;
}

export default function Form({
  children,
  initValues,
  onSubmit,
  validations = {}
}: FormProps): React.JSX.Element {
  const { control, getValues, handleSubmit } = useForm({
    defaultValues: initValues
  });
  const [localErrors, setLocalErrors] = useState<Error[]>([]);

  const childContext = useMemo(() => {
    return {
      errors: localErrors,
      control
    };
  }, [control, localErrors]);

  const validateFields = (): Error[] => {
    const errors: Error[] = [];
    const fields = Object.keys(validations);

    fields.forEach((field) => {
      validations[field].forEach((validation) => {
        const option = validation.validation;
        const values = getValues();
        const key = field;
        const params = getParamsByOption(option, (validation as any).params);
        if (!getValidatorByOption(option, values[key], params)) {
          errors.push({ field, error: validation.helperText });
        }
      });
    });

    setLocalErrors(errors);
    return errors;
  };

  const submit = (data: any): void => {
    const errors = validateFields();
    if (errors.length > 0) return;
    trimValues(data);
    onSubmit(data);
  };

  return (
    <FormContext.Provider value={childContext}>
      {children({ handleSubmit: handleSubmit(submit) })}
    </FormContext.Provider>
  );
}
