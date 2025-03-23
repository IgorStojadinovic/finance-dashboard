import React, { useMemo, useState, useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { TransactionsOBJ } from '../../../lib/transactions.ts';
import TransactionItem from './TransactionItem.tsx';
import Pagination from '../../../lib/pagination/Pagination.tsx';

interface TransactionListProps {
  transactions: TransactionsOBJ[];
  sortBy: string;
  sortByCategory: string;
  searchFor: string;
  setInputDisabled: (isDisabled: boolean) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  sortBy,
  sortByCategory,
  searchFor,
  setInputDisabled,
}): React.JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 9;

  useEffect(() => {
    if (currentPage > 1) {
      setInputDisabled(true);
    } else {
      setInputDisabled(false);
    }
  }, [currentPage, setInputDisabled]);

  const filteredAndSortedTransactions: TransactionsOBJ[] = useMemo(() => {
    let filtered = transactions.filter(obj =>
      obj.name.toLowerCase().includes(searchFor.toLowerCase())
    );

    if (sortByCategory !== 'all transactions') {
      filtered = filtered.filter(
        transaction => transaction.category === sortByCategory
      );
    }

    switch (sortBy) {
      case 'latest':
        return filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case 'oldest':
        return filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case 'a-z':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'highest':
        return filtered.sort((a, b) => b.usd - a.usd);
      case 'lowest':
        return filtered.sort((a, b) => a.usd - b.usd);
      default:
        return filtered;
    }
  }, [transactions, searchFor, sortBy, sortByCategory]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredAndSortedTransactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredAndSortedTransactions]);

  return (
    <>
      <section
        className='pt-6 flex flex-1 flex-col h-full justify-between gap-6 xl:hidden md:hidden'
        data-testid='mobile-transaction-list'
        aria-label='Transaction list for mobile devices'
      >
        <ul>
          {currentTableData.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <li>
                <TransactionItem transaction={transaction} />
              </li>
              {index !== currentTableData.length - 1 && (
                <li className='py-4' role='separator'>
                  <hr className='w-full h-[1px] bg-grey-100' />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </section>

      <section
        className='w-full justify-center hidden md:flex md:flex-1'
        data-testid='desktop-transaction-list'
        aria-label='Transaction list for desktop'
      >
        <article className='w-full'>
          <TabGroup>
            <TabList className='flex justify-between my-6 text-preset-5 text-grey-500'>
              <Tab
                className='w-2/4 text-left capitalize'
                data-testid='recipient-tab'
              >
                recipient/sender
              </Tab>
              <Tab className='w-1/4 capitalize' data-testid='category-tab'>
                category
              </Tab>
              <Tab className='w-1/4 capitalize' data-testid='date-tab'>
                transaction date
              </Tab>
              <Tab className='w-1/4 capitalize' data-testid='amount-tab'>
                amount
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ul aria-label='Transaction items'>
                  {currentTableData.map((transaction, index) => (
                    <React.Fragment key={transaction.id}>
                      <li data-testid={`transaction-item-${transaction.id}`}>
                        <TransactionItem transaction={transaction} />
                      </li>
                      {index !== currentTableData.length - 1 && (
                        <li className='py-4' role='separator'>
                          <hr className='w-full h-[1px] bg-grey-100' />
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </article>
      </section>

      <nav
        aria-label='Transactions pagination'
        data-testid='transactions-pagination'
      >
        <Pagination
          currentPage={currentPage}
          totalCount={filteredAndSortedTransactions.length}
          pageSize={PageSize}
          siblingCount={1}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </nav>
    </>
  );
};

export default TransactionList;
