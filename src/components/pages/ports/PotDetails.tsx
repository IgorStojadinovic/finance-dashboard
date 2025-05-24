import { CardStatusBar } from '../../../ui';
import { PotDetailsProps } from './pot.types';

function PotDetails({ pot }: PotDetailsProps) {
  return (
    <section className='flex flex-col gap-5 text-preset-4 text-grey-500'>
      <div className='flex justify-between items-end capitalize'>
        <h3>total saved</h3>
      </div>
      <figure className='flex flex-col'>
        <CardStatusBar item={pot} />
        <figcaption className='flex justify-between items-center mt-2 text-preset-5 text-grey-500'>
          <p>{pot.progressBar}</p>
          <p>Total of {pot.target}</p>
        </figcaption>
      </figure>
    </section>
  );
}

export default PotDetails;
