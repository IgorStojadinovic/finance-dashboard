type PageHederProps = {
  children: React.ReactNode;
  title: string;
};

const PageHeder = ({ children, title }: PageHederProps) => {
  return (
    <div className='flex justify-between items-center'>
      <h1 className='text-preset-1'>{title}</h1>
      {children}
    </div>
  );
};

export { PageHeder };
