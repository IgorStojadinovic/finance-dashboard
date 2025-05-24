import { Button, DialogTitle } from '@headlessui/react';
import { DialogPanel } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import {
  ModalField,
  ModalInput,
  ModalCategoryMenu,
  ModalBackdrop,
  ModalColorTagsDropdown,
} from '../../../ui';
import { useBudgetStore } from '../../../lib/store/useBudgetStore';
import { useState } from 'react';
import { useCreateBudget } from '../../../lib/hooks/useBudgets';
import { NewBudget } from '../../../lib/types/types';
import { useUserId } from '../../../lib/hooks/useGetUser';
import toast, { Toaster } from 'react-hot-toast';

type AddNewModalProps = {
  type: 'budget' | 'pot';
};

const AddNewModal = ({ type }: AddNewModalProps) => {
  const { addBudgetModalOpen, setAddBudgetModalOpen } = useBudgetStore();
  const userId = useUserId();
  const [currentCategory, setCurrentCategory] = useState('All Transactions');

  const [newBudget, setNewBudget] = useState<NewBudget>({
    userId: userId,
    category: currentCategory,
    spending_limit: 0,
    spent: 0,
    theme: 'green',
    hex: '#277C78',
  });
  const { mutate: createBudget } = useCreateBudget(newBudget);

  const handleCreateBudget = () => {
    const { spending_limit, spent, category } = newBudget;
    if (spending_limit < spent) {
      toast.error('Spending limit cannot be less than spent amount');
      return;
    }
    if (category === 'All Transactions') {
      toast.error('Choose a category');
      return;
    }

    createBudget(newBudget);
    setAddBudgetModalOpen(false);
    setCurrentCategory('All Transactions');
  };

  const RenderModal = (
    <ModalBackdrop>
      <Dialog
        open={addBudgetModalOpen}
        as='div'
        className='relative z-50 focus:outline-none'
        onClose={() => setAddBudgetModalOpen(false)}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8'>
              <DialogTitle
                as='h3'
                className='text-preset-2 flex justify-between items-center'
              >
                Add New Budget
                <XCircleIcon
                  className='size-8 cursor-pointer text-grey-500'
                  onClick={() => setAddBudgetModalOpen(false)}
                />
              </DialogTitle>
              <p className='text-preset-4 text-grey-500'>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </p>
              <div className='flex flex-col gap-4'>
                <ModalField label='Budget Category'>
                  <ModalCategoryMenu
                    currentCategory={currentCategory}
                    setCurrentCategory={category => {
                      setCurrentCategory(category);
                      setNewBudget({ ...newBudget, category });
                    }}
                  />
                </ModalField>
                <ModalField label='Spending Limit'>
                  <ModalInput
                    placeholder='$ e.g 2000'
                    onChange={e => {
                      setNewBudget({
                        ...newBudget,
                        spending_limit: Number(e.target.value),
                      });
                    }}
                  />
                </ModalField>
                <ModalField label='Spent'>
                  <ModalInput
                    placeholder='$ e.g 2000'
                    onChange={e => {
                      setNewBudget({
                        ...newBudget,
                        spent: Number(e.target.value),
                      });
                    }}
                  />
                </ModalField>
                <ModalField label='Color Tag'>
                  <ModalColorTagsDropdown
                    item={newBudget}
                    setCurrentColorTag={(theme, hex) =>
                      setNewBudget({ ...newBudget, theme, hex })
                    }
                  />
                </ModalField>
              </div>
              <div className='mt-4'>
                <Button
                  className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none'
                  onClick={() => {
                    handleCreateBudget();
                  }}
                >
                  Add Budget
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Toaster position='bottom-right' reverseOrder={false} />
    </ModalBackdrop>
  );
  return (
    <>
      <Button
        onClick={() => {
          setAddBudgetModalOpen(true);
          setCurrentCategory('All Transactions');
        }}
        className='rounded-md text-preset-4-bold bg-grey-900 p-4 font-medium text-white'
      >
        Add New {type === 'budget' ? 'Budget' : 'Pot'}
      </Button>
      {addBudgetModalOpen && RenderModal}
    </>
  );
};

export { AddNewModal };
