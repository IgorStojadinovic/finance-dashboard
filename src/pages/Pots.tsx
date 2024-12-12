import React, {useEffect, useState} from "react";
import {PotsArr, userPots} from "../lib/lits.ts";
import Modals from "../components/modals/Modals.tsx";
import EditingModals from "../components/modals/EditingModals.tsx";

interface PotProps {
    item: PotsArr;
}

const PotItem: React.FC<PotProps> = ({item}) => {
    const [barWidth, setBarWidth] = useState("0%"); // Local state for width transition

    useEffect(() => {
        const timeout = setTimeout(() => {
            setBarWidth(item.bar); // Update width after a delay
        }, 100); // Small delay to trigger transition
        return () => clearTimeout(timeout); // Cleanup timeout
    }, [item.bar]); // Re-run if `item.bar` changes

    return (
        <section className="bg-white rounded-lg xl:col-span-1">
            <div className="flex flex-col gap-5 px-5 py-6 md:p-6">
                <section className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div
                            className="h-5 w-5 rounded-full"
                            style={{background: item.hex}}
                        ></div>
                        <h2 className="flex w-full text-preset-2 capitalize flex-1 ">
                            {item.name}
                        </h2>
                    </div>
                    <EditingModals pots={item}/>
                </section>
                <section className="flex flex-col gap-5 text-preset-4 text-grey-500">
                    <div className="flex justify-between items-end capitalize">
                        <h3>total saved</h3>
                        <h3 className="text-preset-1 text-grey-900">{item.saved}</h3>
                    </div>

                    {/* Progress Bar with Transition */}
                    <div className="flex flex-col">
                        <div className="w-full h-2 bg-beige-100 rounded-lg">
                            <div
                                className="h-full rounded-lg"
                                style={{
                                    background: item.hex,
                                    width: barWidth, // Controlled by state
                                    transition: "width 1s ease-in-out",
                                }}
                            ></div>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-preset-5 text-grey-500">
                            <p>{barWidth}</p>
                            <p>Total of {item.target}</p>
                        </div>
                    </div>
                    <section className="flex gap-4">
                        <button className="group bg-beige-100 flex-1 rounded-md py-4 px-7 hover:bg-green">
                            <p className="text-preset-4-bold text-gray-900 group-hover:text-white">
                                + Add Money
                            </p>
                        </button>
                        <button className="group bg-beige-100 flex-1 rounded-md py-4 px-7 hover:bg-grey-900">
                            <p className="text-preset-4-bold text-gray-900 group-hover:text-white">
                                Withdraw
                            </p>
                        </button>
                    </section>
                </section>
            </div>
        </section>
    );
};

const Pots = () => {
    return (
        <div className="xl:flex-1 bg-beige-100 py-6 px-4 md:px-10 md:py-8 xl:px-10 relative overflow-y-scroll">
            <section className="flex flex-col xl:flex-row xl:flex-wrap w-full gap-6">
                <div className="flex justify-between items-center xl:w-full">
                    <h1 className="text-preset-1">Pots</h1>
                    <Modals/>
                </div>
                <section className="flex flex-col gap-6 xl:grid xl:grid-cols-2 xl:gap-6 xl:w-full">
                    {userPots.map((item) => (
                        <PotItem key={item.name} item={item}/>
                    ))}
                </section>
            </section>
        </div>
    );
};

export default Pots;