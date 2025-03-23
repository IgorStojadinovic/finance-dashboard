import React, { useEffect, useState } from 'react';
import { userRecurringBills } from '../../../lib/lits';
import TableRow from './TableRow';
import TableNav from './TableNav';
export default function Table() {
  const [currentSort, setCurrentSort] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedBills, setSortedBills] = useState(userRecurringBills);

  const filterAndSortBills = (query: string, sortType: string) => {
    const filteredArray = [...userRecurringBills].filter(bill =>
      bill.name.toLowerCase().includes(query.toLowerCase())
    );

    switch (sortType) {
      case 'latest':
        return filteredArray.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case 'oldest':
        return filteredArray.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case 'highest':
        return filteredArray.sort(
          (a, b) =>
            parseFloat(b.amount.replace('$', '')) -
            parseFloat(a.amount.replace('$', ''))
        );
      case 'lowest':
        return filteredArray.sort(
          (a, b) =>
            parseFloat(a.amount.replace('$', '')) -
            parseFloat(b.amount.replace('$', ''))
        );
      case 'a-z':
        return filteredArray.sort((a, b) => a.name.localeCompare(b.name));
      case 'z-a':
        return filteredArray.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filteredArray;
    }
  };

  useEffect(() => {
    const result = filterAndSortBills(searchQuery, currentSort);
    setSortedBills(result);
  }, [currentSort, searchQuery]);

  return (
    <section
      className='flex flex-col bg-white p-5 rounded-lg gap-5 w-full xl:flex-1 h-full'
      role='region'
      aria-label='Bills List'
    >
      <TableNav
        currentSort={currentSort}
        setCurrentSort={setCurrentSort}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <table>
        <thead>
          <tr className='hidden md:flex justify-between text-preset-5 text-grey-300'>
            <th className='flex-1 text-left'>Bill Title</th>
            <th className='flex-1 text-left'>Due Date</th>
            <th className='text-right'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedBills.map((item, index) => (
            <TableRow key={index} item={item} index={index} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
