import { Link } from 'react-router-dom';
import { HeaderProps } from './home.types';
import caretRightIcon from '../../../assets/images/icon-caret-right.svg';

export default function SectionHeader({ title, link, linkText }: HeaderProps) {
  return (
    <header className='flex justify-between'>
      <h2 id='budgets-title' className='text-preset-2 capitalize'>
        {title}
      </h2>
      <nav className='flex items-center justify-between capitalize gap-3'>
        <Link
          to={link}
          className='text-preset-4 text-grey-500 hover:text-grey-900'
          aria-label='See budget details'
        >
          {linkText}
        </Link>
        <img src={caretRightIcon} alt='Arrow right' role='presentation' />
      </nav>
    </header>
  );
}
