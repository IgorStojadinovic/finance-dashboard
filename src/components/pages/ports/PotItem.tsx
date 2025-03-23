import React, { useState } from 'react';
import PotModals from '../../modals/PotModals';
import EditingModals from '../../modals/EditingModals';
import { PotsArr } from '../../../lib/lits';
import { usePotStore } from '../../../lib/store/usePotStore';

export default function PotItem({ item }: { item: PotsArr }) {
  const { handleUpdateMoneyBar, handleEditPot, handleDeletePot } =
    usePotStore();
  const [addStatus, setAddStatus] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState(false);

  const currentPercentage = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (parseFloat(item.saved || '0') / parseFloat(item.target || '0')) * 100
      )
    )
  );

  const closeModal = () => {
    setAddStatus(false);
    setWithdrawStatus(false);
  };

  return (
    <li
      className='bg-white rounded-lg xl:col-span-1'
      data-testid={`pot-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
      role='listitem'
      aria-label={`potcard-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <PotModals
        closeModal={closeModal}
        addStatus={addStatus}
        withdrawStatus={withdrawStatus}
        currentPot={item}
        updateBarStatus={handleUpdateMoneyBar}
        barWidth={`${currentPercentage}%`}
      />

      <article className='flex flex-col gap-5 px-5 py-6 md:p-6'>
        <header className='flex items-center justify-between'>
          <div className='flex gap-4 items-center'>
            <span
              className='h-5 w-5 rounded-full'
              style={{ background: item.hex }}
              role='presentation'
              aria-hidden='true'
            />
            <h2
              className='flex w-full text-preset-2 capitalize flex-1'
              id={`pot-name-${item.id}`}
            >
              {item.name}
            </h2>
          </div>
          <EditingModals
            pots={item}
            editPot={handleEditPot}
            deletePot={handleDeletePot}
          />
        </header>

        <section className='flex flex-col gap-5 text-preset-4 text-grey-500'>
          <div className='flex justify-between items-end capitalize'>
            <h3>total saved</h3>
            <h3 className='text-preset-1 text-grey-900'>${item.saved}</h3>
          </div>

          <figure className='flex flex-col'>
            <div className='w-full h-2 bg-beige-100 rounded-lg'>
              <div
                className='h-full rounded-lg max-w-full overflow-hidden'
                style={{
                  background: item.hex,
                  width: `${currentPercentage}%`,
                  transition: 'width 1s ease-in-out',
                }}
                role='progressbar'
                aria-valuenow={currentPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <figcaption className='flex justify-between items-center mt-2 text-preset-5 text-grey-500'>
              <p className={currentPercentage > 100 ? 'text-red-500' : ''}>
                {currentPercentage}%
              </p>
              <p>Total of {item.target}</p>
            </figcaption>
          </figure>

          <footer className='flex gap-4'>
            <button
              className='group bg-beige-100 flex-1 rounded-md py-4 px-7 hover:bg-green'
              onClick={() => setAddStatus(true)}
            >
              <p className='text-preset-4-bold text-gray-900 group-hover:text-white'>
                + Add Money
              </p>
            </button>
            <button
              className='group bg-beige-100 flex-1 rounded-md py-4 px-7 hover:bg-grey-900'
              onClick={() => setWithdrawStatus(true)}
            >
              <p className='text-preset-4-bold text-gray-900 group-hover:text-white'>
                Withdraw
              </p>
            </button>
          </footer>
        </section>
      </article>
    </li>
  );
}
