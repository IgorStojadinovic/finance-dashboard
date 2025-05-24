type CardHeadingProps = {
  children: React.ReactNode;
  hex: string;
  category?: string;
  name?: string;
  type: 'budget' | 'pot';
};

const CardHeading = ({
  children,
  hex,
  category,
  name,
  type,
}: CardHeadingProps) => {
  const budgetHeading = (
    <section className='flex items-center justify-between'>
      <div className='flex gap-4 items-center'>
        <div className='h-5 w-5 rounded-full' style={{ background: hex }}></div>
        <h2 className='text-preset-2 capitalize'>{category}</h2>
      </div>
      {children}
    </section>
  );

  const potHeading = (
    <div className='flex gap-4 items-center justify-between w-full'>
      <span
        className='h-5 w-5 rounded-full'
        style={{ background: hex }}
        role='presentation'
        aria-hidden='true'
      />
      <h2 className='flex w-full text-preset-2 capitalize flex-1'>{name}</h2>
      {children}
    </div>
  );

  return type === 'budget' ? budgetHeading : potHeading;
};

export { CardHeading };
