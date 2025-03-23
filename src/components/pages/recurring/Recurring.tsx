import { Sidebar } from './Sidebar';
import Table from './Table';
const RecurringBills = () => {
  return (
    <main
      className='w-full bg-beige-100 py-6 px-4 md:px-10 md:py-8 xl:px-10 gap-8 xl:gap-8 flex flex-col'
      data-testid='recurring-bills-page'
    >
      <h1 className='text-preset-1' aria-label='Recurring Bills'>
        Recurring Bills
      </h1>
      <section className='flex flex-col gap-3 md:flex-wrap md:flex-row md:gap-6 h-full'>
        <Sidebar />

        <Table />
      </section>
    </main>
  );
};

export default RecurringBills;
