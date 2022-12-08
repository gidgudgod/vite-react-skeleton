import React from 'react';
import { useForm } from 'react-hook-form';

function FormHook() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch('exampleRequired'));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      <input defaultValue="test" {...register('example')} />

      <input {...register('exampleRequired', { required: true })} />

      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}

export default FormHook;
