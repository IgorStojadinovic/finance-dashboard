const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
      <div className='flex min-h-full items-center justify-center p-4'>
        {children}
      </div>
    </div>
  );
};

export { ModalContainer };
