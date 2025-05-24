const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='bg-white rounded-lg xl:w-3/4 xl:h-1/2'>
      <div className='flex px-5 py-6 flex-col justify-center items-center md:flex-row md:py-8 md:px-8 xl:flex-col xl:h-full'>
        {children}
      </div>
    </section>
  );
};

export { ChartContainer };
