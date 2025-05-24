import { Chart } from '../../../ui/Chart';
import { BudgetsProps, BudgetItemProps } from './home.types';
import SectionHeader from './SectionHeader';

export default function Budgets({ budgetsData }: BudgetsProps) {
  const firstFourBudgets = budgetsData?.slice(0, 6);
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
          <Chart budgetsData={firstFourBudgets} />
        </figure>

        <ul
          className='grid grid-cols-2 gap-4  w-full'
          aria-label='Budget categories'
        >
          {firstFourBudgets.map(item => (
            <BudgetItem
              key={item.category}
              {...item}
              maximum={item.spending_limit}
            />
          ))}
        </ul>
      </section>
    </section>
  );
}

function BudgetItem({ category, maximum, hex }: BudgetItemProps) {
  return (
    <li className='flex gap-4'>
      <span
        className='h-full w-1 rounded-lg'
        style={{ backgroundColor: hex }}
        role='presentation'
      ></span>
      <article>
        <h3 className='text-preset-4 text-grey-500'>{category}</h3>
        <span className='text-preset-4-bold' data-testid='entertainment-amount'>
          {maximum}$
        </span>
      </article>
    </li>
  );
}
