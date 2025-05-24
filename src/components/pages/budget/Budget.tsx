import { BudgetCard } from './BudgetCard.tsx';
import { BudgetChart } from './BudgetChart.tsx';
import { useBudgets } from '../../../lib/hooks/useBudgets';
import { useBudgetStore } from '../../../lib/store/useBudgetStore.ts';
import { useEffect } from 'react';
import { useUserId } from '../../../lib/hooks/useGetUser.ts';
import { PageHeder } from '../../../ui';
import { AddNewModal } from '../../modals/budget/AddNewModal.tsx';
import { Spinner } from '../../../ui/Spinner';

const Budget = () => {
  const userId = useUserId();
  const { data: budgets } = useBudgets(userId);
  const { setStoreBudgets } = useBudgetStore();

  useEffect(() => {
    if (budgets) {
      setStoreBudgets(() => budgets);
    }
  }, [budgets, setStoreBudgets]);

  if (!budgets) {
    return <Spinner />;
  }

  return (
    <div className='xl:flex-1 bg-beige-100 py-6 px-4 md:px-10 md:py-8 relative overflow-y-scroll'>
      <PageHeder title='Budgets'>
        <AddNewModal type='budget' />
      </PageHeder>
      <section className='flex flex-col mt-8 gap-6 xl:flex-row  '>
        <BudgetChart />
        <BudgetCard />
      </section>
    </div>
  );
};

export default Budget;
