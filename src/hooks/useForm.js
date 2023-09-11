import { useState, useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';
import { NAME_REGEX } from '../utils/constants';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (e) => {
    const input = e.target;
    const customErrorMessage = {
      email: 'Неверный формат email',
      name: 'Имя может содержать латиницу, кириллицу, пробел и тире',
    };

    const isInputValid = (input) => {
      if (input.type === 'email') {
        return isEmail(input.value);
      }
      if (input.name === 'name') {
        return NAME_REGEX.test(input.value);
      }
      return true;
    }
    
    setErrors({
      ...errors,
      [input.name]: !isInputValid(input) 
        ? customErrorMessage[input.name]
        : input.validationMessage,
    })

    setForm({
      ...form,
      [input.name]: input.type === 'checkbox' ? input.checked : input.value,
    });

    setIsValid(e.target.closest('form').checkValidity() && isInputValid(e.target));
  };

  const resetForm = useCallback(
    (newForm = {}, newErrors = {}, newIsValid = false) => {
      setForm(newForm);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setForm, setErrors, setIsValid]
  );

  return { form, errors, handleChange, isValid, resetForm };
}

export default useForm;