import AddNewModal from "../lib/modals/AddNewBudget.tsx";
import EditBudgetModal from "../lib/modals/EditBudgetModal.tsx";
import {useState} from "react";
import Chart from "../components/Chart.tsx";
import {budgetStatus, userBudget} from "../lib/lits.ts";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/solid";
import {ChevronRightIcon} from "@heroicons/react/16/solid";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import DeleteBudgetModal from "../lib/modals/DeleteBudgetModal.tsx";


const Budget = () => {
    const [editStatus, setEditStatus] = useState(false);
    const [deleteStatus, setDeleteStaus] = useState(false);
    return (
        <div className="xl:flex-1 bg-beige-100 py-6 px-4 md:px-10 md:py-8 relative overflow-y-scroll">
            {
                (editStatus || deleteStatus) && (
                    <div className="fixed inset-0 bg-black/30 z-0"></div>)
            }

            <div className="flex justify-between items-center">
                <h1 className="text-preset-1">Budgets</h1>
                <AddNewModal/>
                <EditBudgetModal modalOpen={editStatus} setEditStatus={setEditStatus}/>
                <DeleteBudgetModal modalOpen={deleteStatus}
                                   setDeleteStatus={setDeleteStaus}
                />
            </div>
            <section className="flex flex-col mt-8 gap-6 xl:flex-row  ">
                <section className="bg-white rounded-lg xl:w-3/4 xl:h-1/2">
                    <div
                        className="flex px-5 py-6 flex-col justify-center items-center md:flex-row md:py-8 md:px-8 xl:flex-col xl:h-full">
                        <div className="flex justify-center md:w-3/5 xl:w-1/ z-10">
                            <Chart/>
                        </div>
                        <div className="w-full">
                            <h3 className="text-preset-2 self-start mb-6">Spending Summary</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 w-full last:border-b-none">

                                {budgetStatus.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex justify-between gap-4 pb-4 border-b last:border-b-0"
                                        >
                                            <div className="flex gap-4">
                                                <div
                                                    className="h-full w-1 bg-green rounded-lg"
                                                    style={{background: item.color}}
                                                ></div>
                                                <h3 className="text-preset-4 text-grey-500 capitalize">
                                                    {item.category}
                                                </h3>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-preset-3">{item.spent}</span>
                                                <p className="text-preset-5 text-grey-500">of {item.totalBudget}</p>
                                            </div>
                                        </div>
                                    );
                                })}


                            </div>
                        </div>

                    </div>
                </section>

                <section className="flex flex-col xl:flex-row xl:flex-wrap gap-6">
                    {userBudget.map((item) => {
                        return (
                            <section className="bg-white rounded-lg xl:w-full " key={item.category}>
                                <div className="flex flex-col gap-5 px-5 py-6 md:p-8">

                                    <section className="flex items-center justify-between">
                                        <div className="flex gap-4 items-center">
                                            <div className="h-5 w-5 rounded-full"
                                                 style={{background: item.hex}}></div>
                                            <h2 className="text-preset-2 capitalize">{item.category}</h2>
                                        </div>
                                        <div className="w-52 text-right">
                                            <Menu key={item.category} as="div">
                                                <MenuButton>
                                                    <EllipsisHorizontalIcon
                                                        className="size-8 text-grey-300 cursor-pointer"
                                                    />
                                                </MenuButton>
                                                <MenuItems
                                                    transition
                                                    anchor="bottom end"
                                                    className="w-42 text-gray-900 ring-1 ring-grey-300 origin-top-right bg-white rounded-xl border border-white/5 shadow-md py-3 px-5 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                                >
                                                    <MenuItem>
                                                        <button
                                                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                                            onClick={() => {
                                                                setEditStatus((prev) => !prev);
                                                            }}
                                                        >
                                                            Edit Budget
                                                        </button>
                                                    </MenuItem>
                                                    <div className="my-1 h-px bg-gray-100"/>
                                                    <MenuItem>
                                                        <button
                                                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-red"
                                                            onClick={() => {
                                                                setDeleteStaus((prev) => !prev);
                                                            }}
                                                        >
                                                            Delete Budget
                                                        </button>

                                                    </MenuItem>
                                                </MenuItems>
                                            </Menu>
                                        </div>
                                    </section>

                                    <section className="flex flex-col gap-5">
                                        <h3>Maximum of ${item.max}</h3>
                                        <div className="w-full h-8 bg-beige-100 p-2 rounded-md">
                                            <div className="h-6 w-1/2 rounded-sm"
                                                 style={{background: item.hex, width: item.bar}}>
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
                                                            key={latest.name}>
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
                            </section>
                        );
                    })}
                </section>
            </section>
        </div>
    );
};

export default Budget;
