import React, {useState} from 'react';

export default function(values = {}, onSubmit) {
  const [inputs, setInputs] = useState(values);
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      onSubmit(inputs);
    }
  }

  const handleInputChange = (event) => {
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
  };
}