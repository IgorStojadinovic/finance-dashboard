const ModalBackdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className='fixed inset-0 bg-black/20 z-50 transition-all duration-300 ease-out'
      role='presentation'
      aria-hidden='true'
    >
      {children}
    </div>
  );
};

export { ModalBackdrop };
