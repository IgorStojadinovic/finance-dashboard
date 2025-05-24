import { Chart } from '../../../ui/Chart';
import { useBudgetStore } from '../../../lib/store/useBudgetStore.ts';
import { ChartList, ChartContainer } from '../../../ui';

const BudgetChart = () => {
  const { storeBudgets } = useBudgetStore();
  return (
    <ChartContainer>
      <div className='flex justify-center md:w-3/5 xl:w-1/ z-10'>
        <Chart budgetsData={storeBudgets} />
      </div>
      <ChartList />
    </ChartContainer>
  );
};

export { BudgetChart };
