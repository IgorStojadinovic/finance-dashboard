import { ChevronRightIcon } from '@heroicons/react/16/solid';
import EditingModals from '../../modals/EditingModals.tsx';
import React, { useEffect, useState } from 'react';
import { useBudgetStore } from '../../../lib/store/useBudgetStore.ts';
import { Budget } from '../../../lib/types/types.ts';

interface BudgetProps {
  isLoading?: boolean;
  budgetsData: Budget[];
}

const BudgetCard = ({ budgetsData }: BudgetProps) => {
  const { handleEditBudget } = useBudgetStore();
  return (
    <section className='flex flex-col xl:flex-row xl:flex-wrap gap-6'>
      {budgetsData.map(item => (
        <BudgetItem key={item.id} item={item} editBudget={handleEditBudget} />
      ))}
    </section>
  );
};

type BudgetItemProps = {
  item: Budget;
  editBudget: (budget: Budget) => void;
};

function BudgetItem({ item, editBudget }: BudgetItemProps) {
  const [barWidth, setBarWidth] = useState('0%');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBarWidth(item.progressBar);
    }, 100);
    return () => clearTimeout(timeout);
  }, [item.progressBar]);

  return (
    <section className='bg-white rounded-lg xl:w-full ' key={item.id}>
      <div className='flex flex-col gap-5 px-5 py-6 md:p-8'>
        <section className='flex items-center justify-between'>
          <div className='flex gap-4 items-center'>
            <div
              className='h-5 w-5 rounded-full'
              style={{ background: item.hex }}
            ></div>
            <h2 className='text-preset-2 capitalize'>{item.category}</h2>
          </div>
          <EditingModals budget={item} editBudget={editBudget} />
        </section>
        <section className='flex flex-col gap-5'>
          <h3>Maximum of ${item.spending_limit}</h3>
          <div className='w-full h-10 bg-beige-100 p-2 rounded-md'>
            <div
              className='h-full w-1/2 rounded-sm'
              style={{
                background: item.hex,
                width: barWidth, // Controlled state for width
                transition: 'width 1s ease-in-out',
              }}
            ></div>
          </div>
          <section className='flex'>
            <div className='flex gap-4 flex-1'>
              <div className='h-11 w-1 bg-green  rounded-md'></div>
              <div>
                <p className='text-preset-5 text-gray-500'>Spent</p>
                <p>${item.spent}</p>
              </div>
            </div>
            <div className='flex gap-4 flex-1'>
              <div className='h-11 w-1 bg-beige-100 rounded-md'></div>
              <div>
                <p className='text-preset-5 text-gray-500'>Free</p>
                <p>${item.spending_limit - item.spent}</p>
              </div>
            </div>
          </section>
        </section>
        <section className='bg-beige-100 rounded-lg'>
          <div className='flex flex-col gap-5 p-4'>
            <div className='flex justify-between '>
              <h3 className='text-preset-3'>Latest Spending</h3>
              <div className='flex items-center gap-2 text-grey-500'>
                <span className='text-preset-5'>See All</span>
                <ChevronRightIcon className='size-4  cursor-pointer' />
              </div>
            </div>
            <ul>
              {item?.latest_spending.map((latest, index) => {
                const date = new Date(latest.date);
                const formattedDate = `${date.getDate()} ${date.toLocaleString(
                  'en-US',
                  { month: 'short' }
                )} ${date.getFullYear()}`;
                return (
                  <li
                    className='flex flex-col justify-between items-center text-preset-5 py-1'
                    key={index}
                  >
                    <div className='flex w-full justify-between items-center'>
                      <div className='flex items-center gap-4 '>
                        <img
                          src={latest.image}
                          className='rounded-full h-8 w-8 md:flex hidden'
                          alt={latest.name}
                        />
                        <p className='text-preset-5-bold capitalize'>
                          {latest.name}
                        </p>
                      </div>

                      <div className='flex flex-col text-right'>
                        <span className='text-preset-5-bold '>
                          -$ {latest.amount}.00
                        </span>
                        <span className='text-grey-500'>{formattedDate}</span>
                      </div>
                    </div>
                    {index !== item.latest_spending.length - 1 && (
                      <div className='h-[1px] w-full bg-gray-300 mt-3'></div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}

export default BudgetCard;
