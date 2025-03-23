import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Field, Input, Label, Button } from '@headlessui/react';
import { PotsArr } from '../../lib/lits';

interface PotModalsProps {
  addStatus: boolean;
  withdrawStatus: boolean;
  currentPot: PotsArr;
  updateBarStatus: (potName: string, amount: number, isAdding: boolean) => void;
  closeModal: () => void;
  barWidth: string;
}

/**
 * Renders Add money or Withdraw money modal
 */
export default function PotModals({
  addStatus,
  withdrawStatus,
  currentPot,
  closeModal,
  updateBarStatus,
}: PotModalsProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddMoney = () => {
    const amount = inputValue === '' ? 0 : parseFloat(inputValue);
    if (addStatus) {
      updateBarStatus(currentPot.name, amount, true);
    } else {
      updateBarStatus(currentPot.name, amount, false);
    }
    setInputValue('');
    closeModal();
  };

  const handleClose = () => {
    setInputValue('');
    closeModal();
  };

  const numericInputValue = inputValue === '' ? 0 : parseFloat(inputValue);

  const currentPercentage = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        ((parseFloat(currentPot.saved || '0') +
          (addStatus ? numericInputValue : -numericInputValue)) /
          parseFloat(currentPot.target || '0')) *
          100
      )
    )
  );

  return (
    <>
      {(addStatus || withdrawStatus) && (
        <div className='fixed inset-0 bg-black/30 z-0'></div>
      )}
      <Dialog
        open={addStatus || withdrawStatus}
        as='div'
        className='relative z-50 focus:outline-none'
        onClose={handleClose}
        aria-labelledby='add-money-title'
        data-testid={`add-money-modal-${currentPot.name
          .toLowerCase()
          .replace(/\s+/g, '-')}`}
      >
        <section className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <aside className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8'>
              <DialogTitle
                as='h3'
                id='add-money-title'
                className='text-preset-1 flex justify-between items-center'
              >
                {addStatus
                  ? `Add to "${currentPot.name}"`
                  : `Withdraw from "${currentPot.name}"`}
                <XCircleIcon
                  className='size-8 cursor-pointer text-grey-500'
                  onClick={handleClose}
                />
              </DialogTitle>

              <p className='text-preset-4 text-grey-500 mb-5'>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
                neque, aliquet.
              </p>

              <section className='flex flex-col'>
                <header className='flex items-center justify-between mb-4'>
                  <h2 className='text-preset-4 text-grey-500'>New ammout</h2>
                  <p className='text-preset-1'>{`$ ${currentPot.saved}`}</p>
                </header>
                <figure className='w-full h-2 bg-beige-100 rounded-lg overflow-hidden'>
                  <div className='relative h-full w-full flex'>
                    <div
                      className='h-full rounded-lg'
                      style={{
                        background: currentPot.hex,
                        width: `${currentPercentage}%`,
                        transition: 'width 0.3s ease-in-out',
                      }}
                    />
                    {withdrawStatus && numericInputValue > 0 && (
                      <div
                        className='h-full rounded-r-lg'
                        style={{
                          background: 'red',
                          width: `${Math.round(
                            (numericInputValue /
                              parseFloat(currentPot.target || '0')) *
                              100
                          )}%`,
                          transition: 'width 0.3s ease-in-out',
                        }}
                      />
                    )}
                  </div>
                </figure>
                <figcaption className='flex justify-between items-center mt-2 text-preset-5 text-grey-500'>
                  <p className={currentPercentage > 100 ? 'text-red-500' : ''}>
                    {currentPercentage}%
                  </p>
                  <p>Total of {currentPot.target}</p>
                </figcaption>
              </section>

              <Field className='flex flex-col gap-1 w-full'>
                <Label className='text-preset-5-bold text-grey-500'>
                  {addStatus ? 'Amount to add' : 'Amount to withdraw'}
                </Label>
                <fieldset className='group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50'>
                  <Input
                    data-testid={`money-input-${currentPot.name
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                    value={inputValue}
                    type='number'
                    placeholder='$ 0'
                    className='w-full py-[0.08rem] px-2 border-0 text-preset-5 items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    onChange={e => setInputValue(e.target.value)}
                  />
                </fieldset>
              </Field>

              <footer className='mt-4'>
                <Button
                  className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none'
                  onClick={handleAddMoney}
                  data-testid={`confirm-add-btn-${currentPot.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                >
                  {addStatus ? 'Confirm Addition' : 'Confirm Withdrawal'}
                </Button>
              </footer>
            </DialogPanel>
          </aside>
        </section>
      </Dialog>
    </>
  );
}
