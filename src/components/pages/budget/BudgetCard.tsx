import React from 'react';
import { Budget } from '../../../lib/types/types.ts';
import { EditCardButton } from '../../modals/EditCardButton.tsx';
import {
  LatestTransactionCards,
  CardHeading,
  CardContainer,
  CardStatusBar,
} from '../../../ui';
import { useMemo } from 'react';
import { useBudgetStore } from '../../../lib/store/useBudgetStore.ts';

const BudgetCard = () => {
  const { storeBudgets } = useBudgetStore();
  const memoizedBudgets = useMemo(() => storeBudgets, [storeBudgets]);

  return (
    <section className='flex flex-col xl:flex-row xl:flex-wrap gap-6'>
      {memoizedBudgets.map(item => (
        <BudgetItem key={item.id} item={item} />
      ))}
    </section>
  );
};

const BudgetItem = React.memo(({ item }: { item: Budget }) => {
  return (
    <section className='bg-white rounded-lg xl:w-full ' key={item.id}>
      <div className='flex flex-col gap-5 px-5 py-6 md:p-8'>
        <CardHeading hex={item.hex} category={item.category} type='budget'>
          <EditCardButton item={item} type='budget' />
        </CardHeading>
        <CardStatusBar item={item} />
        {item.latest_spending.length > 0 && (
          <CardContainer>
            <LatestTransactionCards budget={item} />
          </CardContainer>
        )}
      </div>
    </section>
  );
});

export { BudgetCard };
