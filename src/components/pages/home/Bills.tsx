import React from 'react';
import SectionHeader from './SectionHeader';
import { RecurringBill } from '../../../lib/types/types';
import { cn } from '../../../lib/utils';

export default function Bills({
  billsData,
}: {
  billsData: RecurringBill[] | undefined;
}) {
  /*  const billsData = [
    { category: 'paid bills', amount: '$190', color: 'border-l-green' },
    { category: 'total upcoming', amount: '$194.89', color: 'border-l-yellow' },
    { category: 'due soon', amount: '$50.98', color: 'border-l-cayan' },
  ]; */
  const SlicedBillsData = billsData?.slice(0, 3);
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
        {SlicedBillsData?.map(bill => (
          <BillItem key={bill.category} {...bill} />
        ))}
      </ul>
    </section>
  );
}

type RecurringBillSummary = Pick<
  RecurringBill,
  'color' | 'category' | 'amount'
>;

function BillItem({ category, amount, color }: RecurringBillSummary) {
  const className = "bg-beige-100 py-5 px-4 rounded-lg flex justify-between border-l-4";
  return (
    <li
      className={cn(className, {
        [`border-l-${color}`]: color,
      })}
    >
      <span className='text-preset-4 capitalize'>{category}</span>
      <span className='text-preset-4-bold' data-testid='paid-bills-amount'>
        {amount}$
      </span>
    </li>
  );
}
