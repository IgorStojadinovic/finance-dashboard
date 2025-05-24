import { AddNewModal } from '../../modals/budget/AddNewModal';
import { usePots } from '../../../lib/hooks/usePots';
import { useUserId } from '../../../lib/hooks/useGetUser';
import { Spinner } from '../../../ui/Spinner';
import { usePotTransactionModalStore } from '../../../lib/store/useTransactionModalStore';
import PotTransactionModal from '../../modals/ports/PotTransactionModal';
import PotItem from './PotItem';

const Pots = () => {
  const userId = useUserId();
  const { data: pots } = usePots(userId);
  const { open, modalType, currentPot, closeModal } =
    usePotTransactionModalStore();

  if (!pots) {
    return <Spinner />;
  }

  return (
    <main
      className='xl:flex-1 bg-beige-100 py-6 px-4 md:px-10 md:py-8 xl:px-10 relative overflow-y-scroll'
      data-testid='pots-page'
      aria-labelledby='pots-title'
    >
      <section className='flex flex-col xl:flex-row xl:flex-wrap w-full gap-6'>
        <header className='flex justify-between items-center xl:w-full'>
          <h1 id='pots-title' className='text-preset-1'>
            Pots
          </h1>
          <AddNewModal type='pot' />
        </header>
        {currentPot && (
          <PotTransactionModal
            modalOpen={open}
            currentPot={currentPot}
            closeModal={closeModal}
            barWidth={currentPot?.progressBar ?? '0%'}
            modalType={modalType as 'add' | 'withdraw'}
          />
        )}
        <ul
          className='flex flex-col gap-6 xl:grid xl:grid-cols-2 xl:gap-6 xl:w-full'
          data-testid='pots-list'
          aria-label='Lista svih potova'
          role='list'
        >
          {pots?.map(pot => (
            <PotItem key={pot.id} pot={pot} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Pots;
