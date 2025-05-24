import { CardHeading } from '../../../ui/CardHeading/CardHeading';
import { EditCardButton } from '../../modals/EditCardButton';
import { PotHeaderProps } from './pot.types';

const PotHeader = ({ pot }: PotHeaderProps) => (
  <header className='flex items-center justify-between'>
    <CardHeading hex={pot.hex} name={pot.name} type='pot'>
      <EditCardButton item={pot} type='pot' />
    </CardHeading>
  </header>
);

export default PotHeader;
