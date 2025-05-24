import { Outlet } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';

const Layout = () => {
  return (
    <div className='flex flex-col h-full  justify-between md:h-screen xl:flex-row-reverse xl:h-screen  relative'>
      <Outlet />
      <Navbar />
    </div>
  );
};

export default Layout;
