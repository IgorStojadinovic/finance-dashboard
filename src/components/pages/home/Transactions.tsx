import SectionHeader from './SectionHeader';
import { TransactionsProps, TransactionItemProps } from './home.types';

export default function Transactions({
  transactionsData,
}: TransactionsProps) {
  const SlicedTransactionsData = transactionsData?.slice(0, 5);
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
        {SlicedTransactionsData.map(transaction => (
          <TransactionItem key={transaction.name} {...transaction} />
        ))}
      </ul>
    </section>
  );
}

function TransactionItem({
  name,
  amount,
  image,
  date,
}: TransactionItemProps) {
  return (
    <li className='flex items-center justify-between'>
      <img
        src={image}
        alt={name}
        className='rounded-full h-8 w-8 mr-3 md:h-10 md:w-10 object-cover'
      />
      <h3 className='flex-1'>{name}</h3>
      <article className='flex flex-col items-end'>
        <span className='text-preset-4-bold text-green mb-2'>{amount} $</span>
        <time className='text-preset-5 text-grey-500'>
          {new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </article>
    </li>
  );
}
