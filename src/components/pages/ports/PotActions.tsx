import { Button } from '../../../ui/Button/Button';
import { PotActionsProps } from './pot.types';

function PotActions({ onAdd, onWithdraw }: PotActionsProps) {
  return (
    <div className='flex gap-4'>
      <Button type='add' onClick={onAdd} />
      <Button type='withdraw' onClick={onWithdraw} />
    </div>
  );
}

export default PotActions;
