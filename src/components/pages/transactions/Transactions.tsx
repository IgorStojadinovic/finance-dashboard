import { sortMenu, categoriesMenu } from '../../../lib/lits.ts';
import { useState } from 'react';
import TransactionList from './TransactionList.tsx';
import AllTransactions from '../../../lib/transactions.ts';
import TransactionDropdown from './TransactionDropdown.tsx';
import clsx from 'clsx';

const Transactions = () => {
  const [, setShowSort] = useState(false);
  const [, setShowCategory] = useState(false);
  const [currentSort, setCurrentSort] = useState('latest');
  const [currentCategory, setCurrentCategory] = useState('all transactions');
  const [searchInput, setSearchInput] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);

  const toggleSort = () => {
    setShowSort(prevState => !prevState);
    setShowCategory(false);
  };

  const toggleCategory = () => {
    setShowCategory(prevState => !prevState);
    setShowSort(false);
  };

  const setSort = (name: string) => {
    setCurrentSort(name);
    setShowSort(prevState => !prevState);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <main
      className='bg-beige-100 px-4 py-6 flex md:h-screen w-full flex-col gap-8 xl:gap-2 md:px-10 md:py-8'
      data-testid='transactions-page'
      role='main'
    >
      <h1 className='text-preset-1' id='transactions-title'>
        Transactions
      </h1>
      <section
        className='bg-white rounded-lg px-5 py-6 flex flex-1 flex-col gap-6'
        aria-labelledby='transactions-title'
        data-testid='transactions-section'
      >
        <header className='flex items-center justify-between gap-6 relative'>
          <label htmlFor='transaction-search' className='sr-only'>
            Search transactions
          </label>
          <input
            type='text'
            id='transaction-search'
            disabled={inputDisabled}
            placeholder='Transactions'
            aria-label='Search transactions'
            value={searchInput}
            data-testid='transaction-search-input'
            className={clsx(
              'rounded-md ring-1 w-4/3 border-0 p-0 px-3 text-grey-500 py-2 shadow-sm ring-gray-300 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring-gray-300',
              inputDisabled && 'placeholder-grey-300'
            )}
            onChange={handleSearch}
          />
          <nav
            className='h-full flex gap-6 justify-end items-center'
            aria-label='Transaction filters'
          >
            <TransactionDropdown
              currentSort={currentSort}
              toggleSort={toggleSort}
              dropdownarray={sortMenu}
              setSort={setSort}
            />

            <TransactionDropdown
              currentSort={currentCategory}
              toggleSort={toggleCategory}
              dropdownarray={categoriesMenu}
              setSort={setCurrentCategory}
            />
          </nav>
        </header>

        <TransactionList
          transactions={AllTransactions}
          sortBy={currentSort}
          sortByCategory={currentCategory}
          searchFor={searchInput}
          setInputDisabled={setInputDisabled}
        />
      </section>
    </main>
  );
};

export default Transactions;
