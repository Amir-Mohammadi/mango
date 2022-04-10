import {
  FormGroup,
  FormGroupProps
} from '@/components/BearStudioComponents/FormGroup';
import { FieldProps, useField } from '@formiz/core';
import React from 'react';



interface FieldHiddenProps extends FieldProps, FormGroupProps {}

export const FieldHidden: React.FC<FieldHiddenProps> = (props) => {
  const {
    isValid,
    isSubmitted,
    errorMessage,
    otherProps: rest,
  } = useField(props);
  const showError = !isValid && isSubmitted;
  const formGroupProps = {
    errorMessage,
    showError,
  };

  if (showError) {
    return <FormGroup {...formGroupProps} {...rest} />;
  }
  return null;
};
