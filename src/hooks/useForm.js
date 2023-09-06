import { useState, useCallback } from 'react';

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (e) => {
    const input = e.target;

    console.log(input.checked);
    
    setErrors({
      ...errors,
      [input.name]: input.validationMessage,
    })

    setForm({
      ...form,
      [input.name]: input.type === 'checkbox' ? input.checked : input.value,
    });

    setIsValid(e.target.closest('form').checkValidity());
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