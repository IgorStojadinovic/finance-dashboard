import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.overrides.doughnut.cutout = "110";
ChartJS.overrides.doughnut.radius = 110;

const Chart = () => {
    const data = {
        labels: ["Entertainment", "Bills", "Dining Out", "Personal Care"],
        datasets: [
            {
                data: [50, 750, 75, 100],
                backgroundColor: ["#277C78", "#82C9D7", "#626070", "#F2CDAC"],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="relative ">
            <Doughnut
                className="z-10"
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
                                    let label = context.dataset.label || "";

                                    if (label) {
                                        label += ": ";
                                    }
                                    if (context.parsed.valueOf() !== null) {
                                        label += new Intl.NumberFormat(
                                            "en-US",
                                            {
                                                style: "currency",
                                                currency: "USD",
                                            }
                                        ).format(context.parsed.valueOf());
                                    }
                                    return label;
                                },
                            },
                        },
                    },
                }}
            />

            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center">
                <h3 className="text-preset-1">$338</h3>
                <span className="text-preset-5">of $975 limit</span>
            </div>
        </div>
    );
};

export default Chart;
