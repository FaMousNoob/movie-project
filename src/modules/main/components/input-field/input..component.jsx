import React from 'react';
import { ErrorMessage, useField } from 'formik';

function Input({ ...props }) {
  //this component being called in login,signup,user,userAdd components
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        {...field}
        {...props}
        className={`${meta.touched && meta.error && 'errorInput'}`}
      />
      <p className='inputError'>
        <ErrorMessage name={field.name} />
      </p>
    </div>
  );
}

export default Input;
