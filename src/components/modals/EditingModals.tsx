import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import {
  BudgetEntry,
  categoriesMenu,
  colorTags,
  PotsArr,
} from '../../lib/lits.ts';
import React, { useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useLocation } from 'react-router-dom';

interface BudgetProps {
  budget?: BudgetEntry;
  pots?: PotsArr;
  editPot?: (pot: PotsArr) => void;
  deletePot?: (id: string) => void;
}

const EditingModals: React.FC<BudgetProps> = ({
  budget,
  pots,
  editPot,
  deletePot,
}) => {
  const { pathname } = useLocation();

  const [editPotModalOpen, setEditPotModalOpen] = useState(false);
  const [editBudgetModalOpen, setEditBudgetModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('green');
  const [maxValue, setMaxValue] = useState(pots?.target ?? '');
  const [potName, setPotName] = useState(pots?.name ?? '');
  const [currentPotId] = useState(pots?.id ?? '');
  const [currentCategory, setCurrentCategory] = useState(
    budget?.category ?? ''
  );

  const categories = categoriesMenu.filter(
    item => !item.name.toLowerCase().includes('all transactions')
  );
  const currentColorTag = colorTags.filter(color =>
    color.name.toLowerCase().includes(currentColor.toLowerCase())
  );

  const ModalBackdrop = () =>
    (editPotModalOpen || editBudgetModalOpen || deleteModalOpen) && (
      <div className='fixed inset-0 bg-black/30 z-0'></div>
    );

  const handleEditPot = () => {
    const newPot = {
      id: pots?.id,
      name: potName,
      target: maxValue,
      colorName: currentColor,
      saved: pots?.saved ?? '',
      bar: pots?.bar ?? '',
      hex: currentColorTag[0].hex ?? '',
    };
    setEditPotModalOpen(false);
    if (editPot) {
      editPot(newPot);
    }
  };

  const handleEditButton = () => {
    if (pathname === '/dashboard/budgets') {
      setEditBudgetModalOpen(true);
    } else {
      setEditPotModalOpen(true);
    }
  };

  const CategoryMenu = () => (
    <Menu as='div' className='relative w-full'>
      <div className='flex flex-col w-full gap-1 text-preset-5-bold text-grey-500'>
        <p>Budget Category</p>
        <MenuButton className='inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white   font-semibold text-gray-900  ring-1 ring-gray-300 hover:bg-gray-50 '>
          <p>{currentCategory}</p>
          <ChevronDownIcon
            aria-hidden='true'
            className='-mr-1 size-5 text-gray-400'
          />
        </MenuButton>
      </div>
      <MenuItems className='absolute w-full max-h-[300px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-grey-white scrollbar-track-gray-50  '>
        <div className='py-1'>
          {categories.map(listItem => (
            <MenuItem key={listItem.name}>
              <li
                onClick={() => setCurrentCategory(listItem.name)}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                {listItem.description}
              </li>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );

  const RenderEditPotModal = () => {
    return (
      <Dialog
        open={editPotModalOpen}
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={() => {
          setEditPotModalOpen(false);
        }}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
            >
              <DialogTitle
                as='h3'
                className='text-preset-2 flex justify-between items-center'
              >
                {pathname === '/dashboard/budgets'
                  ? 'Edit Budget'
                  : 'Edit Pots'}
                <XCircleIcon
                  className='size-8 cursor-pointer text-grey-500'
                  onClick={() => {
                    setEditPotModalOpen(false);
                  }}
                />
              </DialogTitle>
              <p className='text-preset-4 text-grey-500'>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
                neque, aliquet.
              </p>
              <div className='flex flex-col gap-4'>
                <Field className='flex flex-col gap-1 w-full'>
                  <Label className='text-preset-5-bold text-grey-500 '>
                    Pot Name
                  </Label>
                  <div className='group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 '>
                    <Input
                      onChange={e => {
                        setPotName(e.target.value);
                      }}
                      type='text'
                      className='w-full capitalize py-[0.08rem] px-2 border-0 text-preset-5-bold  items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                      value={potName}
                    />
                  </div>
                </Field>
                <Field className='flex flex-col gap-1 w-full'>
                  <Label className='text-preset-5-bold text-grey-500 '>
                    Maximum Spending
                  </Label>
                  <div className='group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 '>
                    <p className='text-preset-4 text-grey-400'>$</p>
                    <Input
                      onChange={e => {
                        setMaxValue(e.target.value);
                      }}
                      type='number'
                      placeholder='$ e.g 2000'
                      className='w-full py-[0.08rem] px-2 border-0 text-preset-5  items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                      value={maxValue}
                    />
                  </div>
                </Field>

                <Menu as='div' className='relative w-full'>
                  <div className='flex flex-col w-full gap-1 text-preset-5-bold text-grey-500 '>
                    <p>Color tag</p>
                    <MenuButton className='inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white   font-semibold text-gray-900  ring-1 ring-gray-300 hover:bg-gray-50  '>
                      <div className='flex gap-2'>
                        <div
                          className='w-4 h-4 rounded-full'
                          style={{ background: currentColorTag[0].hex }}
                        ></div>
                        <p className=''>{currentColor}</p>
                      </div>
                      <ChevronDownIcon
                        aria-hidden='true'
                        className='-mr-1 size-5 text-gray-400'
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className='absolute w-full max-h-[200px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-grey-white scrollbar-track-gray-50  '
                  >
                    <div className='py-1'>
                      {colorTags.map(color => {
                        return (
                          <MenuItem key={color.name}>
                            <li
                              onClick={() => {
                                setCurrentColor(color.name);
                              }}
                              className='flex items-center gap-2 capitalize px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
                            >
                              <div
                                className='w-4 h-4 rounded-full'
                                style={{ background: color.hex }}
                              ></div>
                              {color.name}
                            </li>
                          </MenuItem>
                        );
                      })}
                    </div>
                  </MenuItems>
                </Menu>
              </div>
              <div className='mt-4'>
                <Button
                  className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                  onClick={() => {
                    handleEditPot();
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  };

  const RenderDeleteModal = () => {
    return (
      <Dialog
        open={deleteModalOpen}
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={() => {
          setDeleteModalOpen(false);
        }}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6  md:p-8 duration-200 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
            >
              <DialogTitle
                as='h3'
                className='text-preset-2 flex justify-between items-center capitalize'
              >
                {`Delete ${pots?.name}?`}
                <XCircleIcon
                  className='size-8 cursor-pointer text-grey-500'
                  onClick={() => {
                    setDeleteModalOpen(false);
                  }}
                />
              </DialogTitle>
              <p className='text-preset-4 text-grey-500'>
                Are you sure you want to delete this budget? This action cannot
                be reversed, and all the data inside it will be removed forever.
              </p>
              <div className='mt-4 flex flex-col gap-2'>
                <Button
                  className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-red py-1.5 px-4 text-preset-4-bold text-white focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                  onClick={() => {
                    if (deletePot) {
                      deletePot(currentPotId);
                    }
                  }}
                >
                  Yes, Confirm Deletion
                </Button>
                <Button
                  className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-white py-1.5 px-4 text-preset-4 text-grey-500 focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white '
                  onClick={() => {
                    setDeleteModalOpen(false);
                  }}
                >
                  No, I want to go back
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  };

  const RenderEditBudgetModal = () => {
    return (
      <>
        <ModalBackdrop />

        <Dialog
          open={editBudgetModalOpen}
          as='div'
          className='relative z-10 focus:outline-none'
          onClose={() => {
            setEditBudgetModalOpen(false);
          }}
        >
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <DialogPanel
                transition
                className='w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
              >
                <DialogTitle
                  as='h3'
                  className='text-preset-2 flex justify-between items-center'
                >
                  Edit Budget
                  <XCircleIcon
                    className='size-8 cursor-pointer text-grey-500'
                    onClick={() => {
                      setEditBudgetModalOpen(false);
                    }}
                  />
                </DialogTitle>
                <p className='text-preset-4 text-grey-500'>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In
                  nisi neque, aliquet.
                </p>
                <div className='flex flex-col gap-4'>
                  <Field className='flex flex-col gap-1 w-full'>
                    <CategoryMenu />
                  </Field>

                  <Field className='flex flex-col gap-1 w-full'>
                    <Label className='text-preset-5-bold text-grey-500 '>
                      Maximum Spending
                    </Label>
                    <div className='group inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 '>
                      <p className='text-preset-4 text-grey-400'>$</p>
                      <Input
                        onChange={e => {
                          setMaxValue(e.target.value);
                        }}
                        type='number'
                        placeholder='$ e.g 2000'
                        className='w-full py-[0.08rem] px-2 border-0 text-preset-5  items-center justify-between rounded-md focus:ring-0 focus:outline-none group-hover:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        value={maxValue}
                      />
                    </div>
                  </Field>

                  <Menu as='div' className='relative w-full'>
                    <div className='flex flex-col w-full gap-1 text-preset-5-bold text-grey-500 '>
                      <p>Color tag</p>
                      <MenuButton className='inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white   font-semibold text-gray-900  ring-1 ring-gray-300 hover:bg-gray-50  '>
                        <div className='flex gap-2'>
                          <div
                            className='w-4 h-4 rounded-full'
                            style={{ background: currentColorTag[0].hex }}
                          ></div>
                          <p className=''>{currentColor}</p>
                        </div>
                        <ChevronDownIcon
                          aria-hidden='true'
                          className='-mr-1 size-5 text-gray-400'
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className='absolute w-full max-h-[200px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-grey-white scrollbar-track-gray-50  '
                    >
                      <div className='py-1'>
                        {colorTags.map(color => {
                          return (
                            <MenuItem key={color.name}>
                              <li
                                onClick={() => {
                                  setCurrentColor(color.name);
                                }}
                                className='flex items-center gap-2 capitalize px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
                              >
                                <div
                                  className='w-4 h-4 rounded-full'
                                  style={{ background: color.hex }}
                                ></div>
                                {color.name}
                              </li>
                            </MenuItem>
                          );
                        })}
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
                <div className='mt-4'>
                  <Button
                    className='flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                    onClick={() => {
                      handleEditPot();
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    );
  };

  return (
    <>
      <div className='w-52 text-right'>
        <Menu as='div'>
          <MenuButton>
            <EllipsisHorizontalIcon className='size-8 text-grey-300 cursor-pointer' />
          </MenuButton>
          <MenuItems
            transition
            anchor='bottom end'
            className='w-42 text-gray-900 ring-1 ring-grey-300 origin-top-right bg-white rounded-xl border border-white/5 shadow-md py-3 px-5 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
          >
            <MenuItem>
              <button
                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
                onClick={() => {
                  handleEditButton();
                }}
              >
                {pathname === '/dashboard/budgets'
                  ? 'Edit Budget'
                  : 'Edit Pots'}
              </button>
            </MenuItem>
            <div className='my-1 h-px bg-gray-100' />
            <MenuItem>
              <button
                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-red'
                onClick={() => {
                  setDeleteModalOpen(prevState => !prevState);
                }}
              >
                {pathname === '/dashboard/budgets'
                  ? 'Delete Budget'
                  : 'Delete Pots'}
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <ModalBackdrop />
      {editPotModalOpen && RenderEditPotModal()}
      {editBudgetModalOpen && RenderEditBudgetModal()}
      {deleteModalOpen && RenderDeleteModal()}
    </>
  );
};

const MemoizedEditingModals = React.memo(EditingModals);
export default MemoizedEditingModals;
