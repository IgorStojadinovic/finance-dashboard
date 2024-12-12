import Modals from "../../components/modals/Modals.tsx";
import BudgetCard from "./component/BudgetCard.tsx";
import BudgetChart from "./component/BudgetChart.tsx";

const Budget = () => {
    console.log("Budget PAGE");
    return (
        <div className="xl:flex-1 bg-beige-100 py-6 px-4 md:px-10 md:py-8 relative overflow-y-scroll">
            <div className="flex justify-between items-center">
                <h1 className="text-preset-1">Budgets</h1>
                <Modals/>
            </div>
            <section className="flex flex-col mt-8 gap-6 xl:flex-row  ">
                <BudgetChart/>
                <BudgetCard/>
            </section>
        </div>
    );
};

export default Budget;
