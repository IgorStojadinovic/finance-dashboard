import { PotsProps } from './home.types';
import SectionHeader from './SectionHeader';
import TransactionsSection from './Transactions';
import potIcon from '../../../assets/images/pot-icon.svg';

export default function Posts({
  potsData,
  transactionsData,
  isLoading,
}: PotsProps) {
  return (
    <section className='block-wapper flex flex-col xl:w-1/2 gap-6'>
      <section
        className='bg-white rounded-lg py-6 px-5 flex flex-col gap-5 justify-between'
        aria-labelledby='pots-title'
        data-testid='pots-section'
      >
        <SectionHeader
          title='pots'
          link='/dashboard/pots'
          linkText='see details'
        />
        <section className='flex flex-col gap-5 md:flex-row xl:h-3/4'>
          <article
            className='bg-beige-100 rounded-lg p-4 flex gap-4 items-center md:w-60'
            aria-labelledby='total-saved-title'
          >
            <figure>
              <img src={potIcon} alt='Savings icon' className='flex' />
              <img src={potIcon} alt='Savings icon' className='hidden' />
            </figure>

            <header>
              <h3
                id='total-saved-title'
                className='text-preset-4 text-grey-500 mb-3'
              >
                Total Saved
              </h3>
              <span className='text-preset-1' data-testid='total-saved-amount'>
                {potsData?.reduce((acc, item) => acc + item.total, 0)} $
              </span>
            </header>
          </article>
          <ul
            className='grid grid-cols-2 gap-4 md:flex-1'
            aria-label='Savings breakdown'
          >
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              potsData &&
              potsData.map(item => (
                <PotsItem
                  key={item.id}
                  name={item.name}
                  amount={item.total}
                  hex={item.hex}
                />
              ))
            )}
          </ul>
        </section>
      </section>
      <TransactionsSection transactionsData={transactionsData} />
    </section>
  );
}

function PotsItem({
  name,
  amount,
  hex,
}: {
  name: string;
  amount: number;
  hex: string;
}) {
  return (
    <li className='flex gap-4'>
      <span
        className='h-full w-1 rounded-lg'
        style={{ backgroundColor: hex }}
        role='presentation'
      ></span>
      <article className='flex flex-col gap-1'>
        <h3 className='text-preset-4 text-grey-500'>{name}</h3>
        <span className='text-preset-4-bold' data-testid='savings-amount'>
          {amount}
        </span>
      </article>
    </li>
  );
}
