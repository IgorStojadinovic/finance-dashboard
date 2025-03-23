import React from 'react';
import user1 from '../../../assets/images/avatars/emma-richardson.jpg';
import user2 from '../../../assets/images/avatars/savory-bites-bistro.jpg';
import user3 from '../../../assets/images/avatars/daniel-carter.jpg';
import user4 from '../../../assets/images/avatars/sun-park.jpg';
import user5 from '../../../assets/images/avatars/urban-services-hub.jpg';
import SectionHeader from './SectionHeader';

export default function Transactions() {
  const transactionsData = [
    { name: 'Emma Richardson', amount: '$190', url: user1 },
    { name: 'Savory Bites Bristo', amount: '$194.89', url: user2 },
    { name: 'Daniel Carter', amount: '$50.98', url: user3 },
    { name: 'Sun Park', amount: '$10', url: user4 },
    { name: 'Urban Service', amount: '$10', url: user5 },
  ];
  return (
    <section
      className='bg-white rounded-lg py-6 px-5 flex flex-col gap-8 justify-between md:p-8 xl:flex-1'
      aria-labelledby='transactions-title'
      data-testid='transactions-section'
    >
      <SectionHeader
        title='transactions'
        link='/dashboard/transactions'
        linkText='view all'
      />

      <ul
        className='flex flex-col flex-1 gap-5 xl:gap-0 xl:justify-between'
        aria-label='Recent transactions'
      >
        {transactionsData.map(transaction => (
          <TransactionItem key={transaction.name} {...transaction} />
        ))}
      </ul>
    </section>
  );
}

function TransactionItem({
  name,
  amount,
  url,
}: {
  name: string;
  amount: string;
  url: string;
}) {
  return (
    <li className='flex items-center justify-between'>
      <img src={url} alt={name} className='rounded-full h-8 mr-3 md:h-10' />
      <h3 className='flex-1'>{name}</h3>
      <article className='flex flex-col items-end'>
        <span className='text-preset-4-bold text-green mb-2'>{amount}</span>
        <time className='text-preset-5 text-grey-500'>19 Aug 2024</time>
      </article>
    </li>
  );
}
