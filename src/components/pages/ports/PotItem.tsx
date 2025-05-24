import { usePotTransactionModalStore } from '../../../lib/store/useTransactionModalStore';
import { PotItemProps } from './pot.types';
import PotHeader from './PotHeader';
import PotDetails from './PotDetails';
import PotActions from './PotActions';

export default function PotItem({ pot }: PotItemProps) {
  const { openModal } = usePotTransactionModalStore();

  const handleModalOpen = (modalType: 'add' | 'withdraw') => {
    openModal(pot, modalType);
  };

  return (
    <>
      <li className='bg-white rounded-lg xl:col-span-1' id={pot.id}>
        <article className='flex flex-col gap-5 px-5 py-6 md:p-6'>
          <PotHeader pot={pot} />
          <PotDetails pot={pot} />
          <PotActions
            onAdd={() => handleModalOpen('add')}
            onWithdraw={() => handleModalOpen('withdraw')}
          />
        </article>
      </li>
    </>
  );
}
