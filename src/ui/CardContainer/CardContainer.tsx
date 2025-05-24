import { ChevronRightIcon } from '@heroicons/react/24/outline';
type CardContainerProps = {
  children: React.ReactNode;
};

const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <section className='bg-beige-100 rounded-lg'>
      <div className='flex flex-col gap-5 p-4'>
        <div className='flex justify-between '>
          <h3 className='text-preset-3'>Latest Spending</h3>
          <div className='flex items-center gap-2 text-grey-500'>
            <span className='text-preset-5'>See All</span>
            <ChevronRightIcon className='size-4  cursor-pointer' />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export { CardContainer };
