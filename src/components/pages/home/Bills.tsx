import React from 'react';
import SectionHeader from './SectionHeader';
export default function Bills() {
  const billsData = [
    { category: 'paid bills', amount: '$190', color: 'border-l-green' },
    { category: 'total upcoming', amount: '$194.89', color: 'border-l-yellow' },
    { category: 'due soon', amount: '$50.98', color: 'border-l-cayan' },
  ];
  return (
    <section
      className='bg-white rounded-lg py-6 px-5 flex flex-col gap-8 justify-between'
      aria-labelledby='recurring-bills-title'
      data-testid='recurring-bills-section'
    >
      <SectionHeader
        title='Recurring Bills'
        link='/dashboard/recurring'
        linkText='see details'
      />

      <ul className='flex flex-col gap-6' aria-label='Bills summary'>
        {billsData.map(bill => (
          <BillItem key={bill.category} {...bill} />
        ))}
      </ul>
    </section>
  );
}

function BillItem({
  category,
  amount,
  color,
}: {
  category: string;
  amount: string;
  color: string;
}) {
  return (
    <li
      className={`bg-beige-100 py-5 px-4 rounded-lg flex justify-between border-l-4 ${color}`}
    >
      <span className='text-preset-4 capitalize'>{category}</span>
      <span className='text-preset-4-bold' data-testid='paid-bills-amount'>
        {amount}
      </span>
    </li>
  );
}
