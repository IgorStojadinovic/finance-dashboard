import React from 'react';
import Chart from '../../Chart';
import SectionHeader from './SectionHeader';
const budgetData = [
  { category: 'Entertainment', amount: '$50.00', color: 'bg-green' },
  { category: 'Groceries', amount: '$150.00', color: 'bg-yellow' },
  { category: 'Utilities', amount: '$100.00', color: 'bg-navy' },
  { category: 'Transport', amount: '$75.00', color: 'bg-cayan' },
];

export default function Budgets() {
  return (
    <section
      className='bg-white rounded-lg py-6 px-5 flex flex-col gap-5 justify-between md:p-8 xl:flex-1'
      aria-labelledby='budgets-title'
      data-testid='budgets-section'
    >
      <SectionHeader
        title='Budgets'
        link='/dashboard/budgets'
        linkText='see details'
      />
      <section className='flex flex-col justify-center items-center md:flex-row xl:h-[200px]'>
        <figure className='flex justify-center md:w-3/5 xl:w-1/2'>
          <Chart />
        </figure>

        <ul
          className='grid grid-cols-2 gap-4 md:grid-cols-1 w-full'
          aria-label='Budget categories'
        >
          {budgetData.map(item => (
            <BudgetItem key={item.category} {...item} />
          ))}
        </ul>
      </section>
    </section>
  );
}

function BudgetItem({
  category,
  amount,
  color,
}: {
  category: string;
  amount: string;
  color: string | undefined;
}) {
  return (
    <li className='flex gap-4'>
      <span
        className={`h-full w-1 ${color} rounded-lg`}
        role='presentation'
      ></span>
      <article>
        <h3 className='text-preset-4 text-grey-500'>{category}</h3>
        <span className='text-preset-4-bold' data-testid='entertainment-amount'>
          {amount}
        </span>
      </article>
    </li>
  );
}
