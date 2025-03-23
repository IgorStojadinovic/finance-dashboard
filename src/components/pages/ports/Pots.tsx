import React from 'react';
import Modals from '../../modals/Modals';
import { usePotStore } from '../../../lib/store/usePotStore';
import PotItem from './PotItem';

/**
 * Renders the Pots page with a list of pots and a modal for adding a new pot
 */
const Pots = () => {
  const { handleAddPot } = usePotStore();
  const potStorePots = usePotStore(state => state.pots);

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
          <Modals addNewPot={handleAddPot} />
        </header>
        <ul
          className='flex flex-col gap-6 xl:grid xl:grid-cols-2 xl:gap-6 xl:w-full'
          data-testid='pots-list'
          aria-label='Lista svih potova'
          role='list'
        >
          {potStorePots.map(item => (
            <PotItem key={item.id} item={item} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Pots;
