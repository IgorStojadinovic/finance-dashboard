import { Field } from '@headlessui/react';

type ModalFieldProps = {
  label: string;
  children?: React.ReactNode;
};

const ModalField = ({ label, children }: ModalFieldProps) => {
  return (
    <Field className='flex flex-col gap-1 w-full'>
      <label className='text-preset-5-bold text-grey-500'>{label}</label>
      {children}
    </Field>
  );
};

export { ModalField };
