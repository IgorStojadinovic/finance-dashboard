import React from 'react';
import Overview from './Overview';
import Posts from './Posts';
import Budgets from './Budgets';
import Bills from './Bills';
const Home = () => {
  return (
    <main
      className='bg-beige-100 flex flex-col justify-between xl:flex-row xl:justify-normal xl:flex-1'
      data-testid='home-page'
      role='main'
    >
      <section className='flex flex-col w-full gap-6 px-4 py-6 md:p-8 xl:h-dvh'>
        <Overview currentBalance={4860} income={3814.25} expenses={1700.5} />
        <article className='block-container flex flex-col lg:flex-row xl:gap-6 flex-1'>
          <Posts />
          <section className='block-wapper flex flex-col xl:w-1/2 gap-6'>
            <Budgets />
            <Bills />
          </section>
        </article>
      </section>
    </main>
  );
};

export default Home;
