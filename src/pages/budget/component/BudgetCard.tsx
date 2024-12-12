import {BudgetEntry, userBudget} from "../../../lib/lits.ts";
import {ChevronRightIcon} from "@heroicons/react/16/solid";
import EditingModals from "../../../components/modals/EditingModals.tsx";
import React, {useEffect, useState} from "react";

interface BudgetProps {
    item: BudgetEntry;
}

const BudgetItem: React.FC<BudgetProps> = ({item}) => {
    const [barWidth, setBarWidth] = useState("0%");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setBarWidth(item.bar);
        }, 100);
        return () => clearTimeout(timeout);
    }, [item.bar]);

    return (<section className="bg-white rounded-lg xl:w-full " key={item.category}>
        <div className="flex flex-col gap-5 px-5 py-6 md:p-8">
            <section className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <div className="h-5 w-5 rounded-full"
                         style={{background: item.hex}}></div>
                    <h2 className="text-preset-2 capitalize">{item.category}</h2>
                </div>
                <EditingModals budget={item}/>
            </section>
            <section className="flex flex-col gap-5">
                <h3>Maximum of ${item.max}</h3>
                <div className="w-full h-10 bg-beige-100 p-2 rounded-md">
                    <div className="h-full w-1/2 rounded-sm"
                         style={{
                             background: item.hex,
                             width: barWidth, // Controlled state for width
                             transition: "width 1s ease-in-out",
                         }}>
                    </div>
                </div>
                <section className="flex">
                    <div className="flex gap-4 flex-1">
                        <div className="h-11 w-1 bg-green  rounded-md"></div>
                        <div>
                            <p className="text-preset-5 text-gray-500">Spent</p>
                            <p>${item.spent}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 flex-1">
                        <div className="h-11 w-1 bg-beige-100 rounded-md"></div>
                        <div>
                            <p className="text-preset-5 text-gray-500">Free</p>
                            <p>${item.free}</p>
                        </div>
                    </div>
                </section>

            </section>

            <section className="bg-beige-100 rounded-lg">
                <div className="flex flex-col gap-5 p-4">
                    <div className="flex justify-between ">
                        <h3 className="text-preset-3">Latest Spending</h3>
                        <div className="flex items-center gap-2 text-grey-500">
                            <span className="text-preset-5">See All</span>
                            <ChevronRightIcon className="size-4  cursor-pointer"/>
                        </div>
                    </div>
                    <ul>
                        {item.latest.map((latest, index) => {
                            return (
                                <li className="flex flex-col justify-between items-center text-preset-5"
                                    key={index}>
                                    <div className="flex w-full justify-between items-center">
                                        <div className="flex items-center gap-4 ">
                                            <img src={latest.icon}
                                                 className="rounded-full h-8 w-8 md:flex hidden"
                                                 alt={latest.name}
                                            />
                                            <p className="text-preset-5-bold capitalize">{latest.name}</p>
                                        </div>

                                        <div className="flex flex-col text-right">
                                                                <span
                                                                    className="text-preset-5-bold ">{latest.price}</span>
                                            <span className="text-grey-500">{latest.date}</span>
                                        </div>
                                    </div>
                                    {index !== item.latest.length - 1 && (
                                        <div className="h-[1px] w-full bg-gray-300 mt-3"></div>
                                    )}

                                </li>
                            );
                        })}

                    </ul>
                </div>
            </section>
        </div>
    </section>);
};

const BudgetCard = () => {
    return (<section className="flex flex-col xl:flex-row xl:flex-wrap gap-6">
            {userBudget.map((item) => (
                <BudgetItem key={item.category} item={item}/>
            ))}
        </section>
    );
};

export default BudgetCard;