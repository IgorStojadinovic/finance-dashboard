import { DialogTitle } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';

type ModalTitleProps = {
  title: string;
  setModalOpen: (open: boolean) => void;
};

const ModalTitle = ({ title, setModalOpen }: ModalTitleProps) => {
  return (
    <DialogTitle
      as='h3'
      className='text-preset-2 flex justify-between items-center'
    >
      {title}
      <XCircleIcon
        className='size-8 cursor-pointer text-grey-500'
        onClick={() => {
          setModalOpen(false);
        }}
      />
    </DialogTitle>
  );
};

export { ModalTitle };
