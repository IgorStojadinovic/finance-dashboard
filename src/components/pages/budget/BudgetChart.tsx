import Chart from '../../Chart.tsx';
import { budgetStatus } from '../../../lib/lits.ts';

const BudgetChart = () => {
  return (
    <section className='bg-white rounded-lg xl:w-3/4 xl:h-1/2'>
      <div className='flex px-5 py-6 flex-col justify-center items-center md:flex-row md:py-8 md:px-8 xl:flex-col xl:h-full'>
        <div className='flex justify-center md:w-3/5 xl:w-1/ z-10'>
          <Chart />
        </div>
        <div className='w-full'>
          <h3 className='text-preset-2 self-start mb-6'>Spending Summary</h3>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-1 w-full last:border-b-none'>
            {budgetStatus.map((item, index) => {
              return (
                <div
                  key={index}
                  className='flex justify-between gap-4 pb-4 border-b last:border-b-0'
                >
                  <div className='flex gap-4'>
                    <div
                      className='h-full w-1 bg-green rounded-lg'
                      style={{ background: item.color }}
                    ></div>
                    <h3 className='text-preset-4 text-grey-500 capitalize'>
                      {item.category}
                    </h3>
                  </div>
                  <div className='flex gap-2'>
                    <span className='text-preset-3'>{item.spent}</span>
                    <p className='text-preset-5 text-grey-500'>
                      of {item.totalBudget}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetChart;
