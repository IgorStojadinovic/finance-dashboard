import React, { useEffect, useState, useMemo } from 'react';
import { PotsArr, userPots } from '../lib/lits';
import Modals from '../components/modals/Modals';
import EditingModals from '../components/modals/EditingModals';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';

const Pots = () => {
  const [pots, setPots] = useState(userPots);

  const updateMoney = (
    potName: string,
    amount: number,
    isAdding: boolean
  ): void => {
    setPots(prevPots =>
      prevPots
        .map(pot =>
          pot.name === potName
            ? {
                ...pot,
                saved: isAdding
                  ? (
                      Math.round(
                        (parseFloat(pot.saved || '0') + amount) * 100
                      ) / 100
                    ).toString()
                  : (
                      Math.round(
                        (parseFloat(pot.saved || '0') - amount) * 100
                      ) / 100
                    ).toString(),
                bar: `${Math.max(
                  0,
                  Math.round(
                    ((parseFloat(pot.saved || '0') +
                      (isAdding ? amount : -amount)) /
                      parseFloat(pot.target || '0')) *
                      100
                  )
                )}%`,
              }
            : pot
        )
        .map(pot => ({
          ...pot,
          saved: parseFloat(pot.saved || '0') < 0 ? '0' : pot.saved,
          bar: Math.sign(parseFloat(pot.bar || '0')) === -1 ? '0%' : pot.bar,
        }))
    );
  };

  const addPot = (newPot: PotsArr): void => {
    setPots(prevPots => [...prevPots, newPot]);
  };

  const editPot = (updatedPot: PotsArr): void => {
    setPots(prevPots =>
      prevPots.map(pot => (pot.id === updatedPot.id ? updatedPot : pot))
    );
  };

  const deletePot = (potId: string): void => {
    setPots(prevPots => prevPots.filter(pot => pot.id !== potId));
  };

  const memoizedPotItems = useMemo(() => {
    return pots.map(item => (
      <PotItem
        key={item.id} // Ensure the key is unique and consistent
        item={item}
        updateMoney={updateMoney}
        editPot={editPot}
        deletePot={deletePot}
      />
    ));
  }, [pots]);
  return (
    <main 
      className='xl:flex-1 bg-beige-100 py-6 px-4 md:px-10 md:py-8 xl:px-10 relative overflow-y-scroll'
      data-testid="pots-page"
      aria-labelledby="pots-title"
    >
      <section className='flex flex-col xl:flex-row xl:flex-wrap w-full gap-6'>
        <header className='flex justify-between items-center xl:w-full'>
          <h1 id="pots-title" className='text-preset-1'>Pots</h1>
          <Modals addNewPot={addPot} />
        </header>
        <ul 
          className='flex flex-col gap-6 xl:grid xl:grid-cols-2 xl:gap-6 xl:w-full'
          data-testid="pots-list"
          aria-label="Lista svih potova"
          role="list"
        >
          {memoizedPotItems}
        </ul>
      </section>
    </main>
  );
};

interface PotProps {
  item: PotsArr;
  updateMoney: (potName: string, amount: number, isAdding: boolean) => void;
  editPot: (updatedPot: PotsArr) => void;
  deletePot: (potId: string) => void;
}

const PotItem: React.FC<PotProps> = ({
  item,
  updateMoney,
  editPot,
  deletePot,
}) => {
  const [barWidth, setBarWidth] = useState('0%'); // Local state for width transition
  const [addMoneyModalOpen, setAddMoneyModalOpen] = useState(false);
  const [withdrawMoneyModalOpen, setWithdrawMoneyModalOpen] = useState(false);

  const handleModalToggle = () => {
    setAddMoneyModalOpen(false);
    setWithdrawMoneyModalOpen(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBarWidth(item.bar || '0%'); // Update width after a delay
    }, 100); // Small delay to trigger transition
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [item.bar]); // Re-run if `item.bar` changes

  return (
    <li 
      className='bg-white rounded-lg xl:col-span-1'
      data-testid={`pot-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
      role="listitem"
      aria-label={`potcard-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <AddAndWithdrawMoneyModal
        handleModalToggle={handleModalToggle}
        addMoneyModalOpen={addMoneyModalOpen}
        withdrawMoneyModalOpen={withdrawMoneyModalOpen}
        currentPot={item}
        updateMoney={updateMoney}
      />
      <article className='flex flex-col gap-5 px-5 py-6 md:p-6'>
        <header className='flex items-center justify-between'>
          <div className='flex gap-4 items-center'>
            <span
              className='h-5 w-5 rounded-full'
              style={{
                background: item.hex,
              }}
              role="presentation"
              aria-hidden="true"
            ></span>
            <h2 
              className='flex w-full text-preset-2 capitalize flex-1'
              id={`pot-name-${item.id}`}
            >
              {item.name}
            </h2>
          </div>
          <EditingModals pots={item} editPot={editPot} deletePot={deletePot} />
        </header>

        <section 
          className='flex flex-col gap-5 text-preset-4 text-grey-500'
          aria-labelledby={`pot-name-${item.id}`}
        >
          <div className='flex justify-between items-end capitalize'>
            <h3>total saved</h3>
            <h3 
              className='text-preset-1 text-grey-900'
              data-testid={`pot-amount-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            >${item.saved}</h3>
          </div>

          {/* Progress Bar with Transition */}
          <figure className='flex flex-col'>
            <div className='w-full h-2 bg-beige-100 rounded-lg'>
              <div
                className='h-full rounded-lg max-w-full overflow-hidden'
                style={{
                  background: item.hex,
                  width: barWidth, // Controlled by state
                  transition: 'width 1s ease-in-out',
                }}
                role="progressbar"
                aria-valuenow={parseInt(barWidth)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${barWidth} progress towards target of ${item.target}`}
                data-testid={`pot-progress-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              ></div>
            </div>
            <figcaption className='flex justify-between items-center mt-2 text-preset-5 text-grey-500'>
              <p>{barWidth}</p>
              <p>Total of {item.target}</p>
            </figcaption>
          </figure>

          <footer className='flex gap-4'>
            <button
              className='group bg-beige-100 flex-1 rounded-md py-4 px-7 hover:bg-green'
              onClick={() => setAddMoneyModalOpen(true)}
              data-testid={`add-money-btn-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              aria-label={`Add money to ${item.name} pot`}
            >
              <p className='text-preset-4-bold text-gray-900 group-hover:text-white'>
                + Add Money
              </p>
            </button>
            <button
              className='group bg-beige-100 flex-1 rounded-md py-4 px-7 hover:bg-grey-900'
              onClick={() => setWithdrawMoneyModalOpen(true)}
              data-testid={`withdraw-btn-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              aria-label={`Withdraw money from ${item.name} pot`}
            >
              <p className='text-preset-4-bold text-gray-900 group-hover:text-white'>
                Withdraw
              </p>
            </button>
          </footer>
        </section>
      </article>
    </li>
  );
};

interface AddMoneyModalProps {
  handleModalToggle: () => void;
  addMoneyModalOpen: boolean;
  withdrawMoneyModalOpen: boolean;
  currentPot: PotsArr;
  updateMoney: (potName: string, amount: number, isAdding: boolean) => void;
}

const AddAndWithdrawMoneyModal: React.FC<AddMoneyModalProps> = ({
  handleModalToggle,
  addMoneyModalOpen,
  withdrawMoneyModalOpen,
  currentPot,
  updateMoney,
}) => {
  const [barWidth, setBarWidth] = useState('0%'); // Local state for width transition
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBarWidth(currentPot.bar || '0%'); // Update width after a delay
    }, 100); // Small delay to trigger transition
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [currentPot.bar]); // Re-run if `item.bar` changes

  const ModalBackdrop = () =>
    (addMoneyModalOpen || withdrawMoneyModalOpen) && (
      <div className='fixed inset-0 bg-black/30 z-0'></div>
    );

  interface HandleModalProps {
    currentPot: PotsArr;
    status: boolean;
  }

  const handleModal = ({ currentPot, status }: HandleModalProps) => {
    updateMoney(currentPot.name, Number(inputValue), status);
    setInputValue(400);
    handleModalToggle();
  };

  /**
   * Render the add money modal
   */
  const renderAddMoneyModal = () => {
    return (
      <Dialog
        open={addMoneyModalOpen}
        as='div'
        className='relative z-50 focus:outline-none'
        onClose={handleModalToggle}
        aria-labelledby="add-money-title"
        data-testid={`add-money-modal-${currentPot.name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <section className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <aside className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8'>
              <DialogTitle
                as='h3'
                id="add-money-title"
                className='text-preset-1 flex justify-between items-center'
              >
                Add to '{currentPot.name}'
                <XCircleIcon
                  className='size-8 cursor-pointer text-grey-500'
                  onClick={handleModalToggle}
                />
              </DialogTitle>

              <p className='text-preset-4 text-grey-500 mb-5'>
                Add money to your pot to keep it separate from your main
                balance. As soon as you add this money, it will be deducted from
                your current balance.
              </p>

              <section className='flex flex-col'>
                <header className='flex items-center justify-between mb-4'>
                  <h2 className='text-preset-4 text-grey-500'>New ammout</h2>
                  <p className='text-preset-1'>{`$ ${currentPot.saved}`}</p>
                </header>
                <figure className='w-full h-2 bg-beige-100 rounded-lg max-w-full overflow-hidden'>
                  <div
                    className='h-full rounded-lg'
                    style={{
                      background: currentPot.hex,
                      maxWidth: barWidth, // Controlled by state
                      transition: 'width 1s ease-in-out',
                    }}
                    role="progressbar"
                    aria-valuenow={parseInt(barWidth)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </figure>
                <figcaption className='flex justify-between items-center mt-2 text-preset-5 text-grey-500'>
                  <p>{barWidth}</p>
                  <p>Total of {currentPot.target}</p>
                </figcaption>
              </section>

              <Field className='flex flex-col gap-1 w-full'>
                <Label className='text-preset-5-bold text-grey-500'>
                  Amount to add
                </Label>
                <fieldset className='group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50'>
                  <Input
                    data-testid={`money-input-${currentPot.name.toLowerCase().replace(/\s+/g, '-')}`}
                    value={inputValue}
                    type='number'
                    placeholder='$ 400'
                    className='w-full py-[0.08rem] px-2 border-0 text-preset-5 items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    onChange={e => setInputValue(Number(e.target.value))}
                  />
                </fieldset>
              </Field>

              <footer className='mt-4'>
                <Button
                  className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none'
                  onClick={() => {
                    handleModal({
                      currentPot,
                      status: true,
                    });
                  }}
                  data-testid={`confirm-add-btn-${currentPot.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Confirm Addition
                </Button>
              </footer>
            </DialogPanel>
          </aside>
        </section>
      </Dialog>
    );
  };

  /**
   * Render the withdraw money modal
   */
  const renderWithdrawMoneyModal = () => {
    return (
      <Dialog
        open={withdrawMoneyModalOpen}
        as='div'
        className='relative z-50 focus:outline-none'
        onClose={handleModalToggle}
        aria-labelledby="withdraw-money-title"
        data-testid={`withdraw-money-modal-${currentPot.name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <section className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <aside className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8'>
              <DialogTitle
                as='h3'
                id="withdraw-money-title"
                className='text-preset-1 flex justify-between items-center'
              >
                Withdraw from '{currentPot.name}'
                <XCircleIcon
                  className='size-8 cursor-pointer text-grey-500'
                  onClick={handleModalToggle}
                />
              </DialogTitle>

              <p className='text-preset-4 text-grey-500 mb-5'>
                Withdraw from your pot to put money back in your main balance.
                This will reduce the amount you have in this pot.
              </p>

              <section className='flex flex-col'>
                <header className='flex items-center justify-between mb-4'>
                  <h2 className='text-preset-4 text-grey-500'>New ammout</h2>
                  <p className='text-preset-1'>${currentPot.saved}</p>
                </header>
                <figure className='w-full h-2 bg-beige-100 rounded-lg max-w-full overflow-hidden'>
                  <div
                    className='h-full rounded-lg'
                    style={{
                      background: currentPot.hex,
                      maxWidth: barWidth, // Controlled by state
                      transition: 'width 1s ease-in-out',
                    }}
                    role="progressbar"
                    aria-valuenow={parseInt(barWidth)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </figure>
                <figcaption className='flex justify-between items-center mt-2 text-preset-5 text-grey-500'>
                  <p>{barWidth}</p>
                  <p>Total of {currentPot.target}</p>
                </figcaption>
              </section>

              <Field className='flex flex-col gap-1 w-full'>
                <Label className='text-preset-5-bold text-grey-500'>
                  Amount to Withdraw
                </Label>
                <fieldset className='group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50'>
                  <Input
                   data-testid={`money-input-${currentPot.name.toLowerCase().replace(/\s+/g, '-')}`}
                    value={inputValue}
                    type='number'
                    placeholder='$ 400'
                    className='w-full py-[0.08rem] px-2 border-0 text-preset-5 items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                    onChange={e => setInputValue(Number(e.target.value))}
                  />
                </fieldset>
              </Field>
              
              <footer className='mt-4'>
                <Button
                  className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none'
                  onClick={() => {
                    handleModal({
                      currentPot,
                      status: false,
                    });
                  }}
                  data-testid={`confirm-withdraw-btn-${currentPot.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Confirm Withdrawal
                </Button>
              </footer>
            </DialogPanel>
          </aside>
        </section>
      </Dialog>
    );
  };

  return (
    <>
      <ModalBackdrop />
      {addMoneyModalOpen && renderAddMoneyModal()}
      {withdrawMoneyModalOpen && renderWithdrawMoneyModal()}
    </>
  );
};
export default Pots;
