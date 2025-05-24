import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Budget } from '../../lib/types/types';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.overrides.doughnut.cutout = '110';
ChartJS.overrides.doughnut.radius = 110;

const Chart = ({ budgetsData }: { budgetsData: Budget[] }) => {
  const data = {
    labels: budgetsData.map(budget => budget.category),
    datasets: [
      {
        data: budgetsData.map(budget => budget.spent),
        backgroundColor: budgetsData.map(budget => budget.hex),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className='relative '>
      <Doughnut
        style={{ zIndex: 9000 }}
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              usePointStyle: true,
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.valueOf() !== null) {
                    label += new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(context.parsed.valueOf());
                  }
                  return label;
                },
              },
            },
          },
        }}
      />

      <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  text-center'>
        <h3 className='text-preset-1 '>
          {budgetsData.reduce((acc, budget) => acc + budget.spent, 0)}$
        </h3>
        <span className='text-preset-5 '>
          of{' '}
          {budgetsData.reduce((acc, budget) => acc + budget.spending_limit, 0)}$
          limit
        </span>
      </div>
    </div>
  );
};

export { Chart };
