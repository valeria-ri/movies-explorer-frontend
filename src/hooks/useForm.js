import { useState, useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (e) => {
    const input = e.target;
    const customErrorMessage = 'Неверный формат email';

    const isInputValid = (input) => {
      if (input.type === 'email') {
        return isEmail(input.value);
      }
    }
    
    setErrors({
      ...errors,
      [input.name]: input.type === 'email' && !isInputValid(input) 
        ? customErrorMessage 
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