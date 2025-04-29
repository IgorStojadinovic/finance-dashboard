import Modals from '../../modals/Modals.tsx';
import BudgetCard from './BudgetCard.tsx';
import BudgetChart from './BudgetChart.tsx';
import { useBudgetStore } from '../../../lib/store/useBudgetStore.ts';
import { useUserId } from '../../../lib/hooks/useGetUser';
import { useBudgets } from '../../../lib/hooks/useBudgets';
const Budget = () => {
  const userId = useUserId();
  const { handleAddBudget } = useBudgetStore();
  const { data: budgets, isLoading } = useBudgets(userId);

  return (
    <div className='xl:flex-1 bg-beige-100 py-6 px-4 md:px-10 md:py-8 relative overflow-y-scroll'>
      <div className='flex justify-between items-center'>
        <h1 className='text-preset-1'>Budgets</h1>
        <Modals addNewBudget={handleAddBudget} />
      </div>
      <section className='flex flex-col mt-8 gap-6 xl:flex-row  '>
        {budgets && (
          <>
            <BudgetChart budgetsData={budgets} isLoading={isLoading} />
            <BudgetCard budgetsData={budgets} isLoading={isLoading} />
          </>
        )}
      </section>
    </div>
  );
};

export default Budget;
