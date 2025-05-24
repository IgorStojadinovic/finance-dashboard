import { clsx } from 'clsx';
import { TransactionItemProps } from './transactions.types';

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isIncome = transaction.amount > 0;
  const recurring = transaction.recurring;

  const transactionCategory = (
    <span className='text-preset-4 text-grey-500'>{transaction.category}</span>
  );

  const transactionDate = (
    <p className='text-preset-4 text-grey-500 md:flex justify-center'>
      {new Date(transaction.date).toLocaleDateString()}
    </p>
  );

  const transactionAmount = (
    <span
      className={clsx(
        'text-preset-4-bold',
        {
          'text-green': isIncome,
        },
        {
          'text-red': recurring,
        }
      )}
      aria-label={`Amount: ${transaction.amount}`}
    >
      {transaction.amount} $
    </span>
  );

  return (
    <article
      className='transaction-item'
      data-testid={`transaction-${transaction.id}`}
    >
      {/* Responsive layout */}
      <section
        aria-label={`Transaction with ${transaction.name}`}
        data-testid='transaction-view'
      >
        <ul className='flex flex-col md:flex-row justify-between items-center w-full text-center gap-4 md:gap-0'>
          <li className='flex items-center justify-between w-full md:w-2/4'>
            <div className='flex items-center gap-6'>
              <img
                src={transaction.image}
                alt={`${transaction.name} avatar`}
                className='rounded-full h-8 w-8'
              />
              <div className='flex flex-col items-start'>
                <h3 className='text-preset-4-bold capitalize'>
                  {transaction.name}
                </h3>
                <div className='md:hidden'>{transactionCategory}</div>
              </div>
            </div>
            <div className='md:hidden'>{transactionAmount}</div>
          </li>
          <li className='hidden md:block w-1/4'>{transactionCategory}</li>
          <li className='hidden md:block w-1/4'>{transactionDate}</li>
          <li className='hidden md:block w-1/4'>{transactionAmount}</li>
        </ul>
      </section>
    </article>
  );
};

export default TransactionItem;
