type ButtonProps = {
  onClick: () => void;
  type: 'add' | 'withdraw';
};

const Button = ({ onClick, type }: ButtonProps) => {
  return (
    <button
      className='group bg-beige-100 flex-1 rounded-md py-4 px-7 hover:bg-green'
      onClick={onClick}
    >
      <p className='text-preset-4-bold text-gray-900 group-hover:text-white'>
        {type === 'add' ? '+ Add Money' : 'Withdraw'}
      </p>
    </button>
  );
};

export { Button };
