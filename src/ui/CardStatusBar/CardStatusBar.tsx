import { useEffect, useState } from 'react';
import { Budget, Pot } from '../../lib/types/types';
import { cn } from '../../lib/utils';
type CardStatusBarProps = {
  item: Budget | Pot;
};

const CardStatusBar = ({ item }: CardStatusBarProps) => {
  const { hex, progressBar } = item;
  const [barWidth, setBarWidth] = useState('0%');

  // Provera da li je item Budget ili Pot
  const isBudget = 'spending_limit' in item;

  const limit = isBudget ? item.spending_limit : item.target;
  const spent = isBudget ? item.spent : item.total;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBarWidth(progressBar || '0%');
    }, 100);

    return () => clearTimeout(timeout);
  }, [progressBar]);

  return (
    <section className='flex flex-col gap-5'>
      {isBudget && <h3>Maximum of ${limit}</h3>}
      <div
        className={cn(
          'w-full bg-beige-100 p-2 rounded-md',
          isBudget ? 'h-10' : 'h-4 rounded-full p-1'
        )}
      >
        <div
          className={cn(
            'h-full rounded-sm',
            isBudget ? 'h-full' : 'rounded-full p-1'
          )}
          style={{
            width: barWidth,
            background: hex,
            transition: 'width 1s ease-in-out',
          }}
        ></div>
      </div>
      {isBudget && (
        <section className='flex'>
          <div className='flex gap-4 flex-1'>
            <div className='h-11 w-1 bg-green rounded-md'></div>
            <div>
              <p className='text-preset-5 text-gray-500'>
                {isBudget ? 'Spent' : 'Saved'}
              </p>
              <p>${spent}</p>
            </div>
          </div>
          <div className='flex gap-4 flex-1'>
            <div className='h-11 w-1 bg-beige-100 rounded-md'></div>
            <div>
              <p className='text-preset-5 text-gray-500'>
                {isBudget ? 'Free' : 'Remaining'}
              </p>
              <p>${limit - spent}</p>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export { CardStatusBar };
