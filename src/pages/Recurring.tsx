import RecitIcon from "../assets/images/icon-nav-recurring-bills.svg";
import {sortMenu, userRecurringBills} from "../lib/lits.ts";
import {CheckCircleIcon} from "@heroicons/react/16/solid";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import IconSort from "../assets/images/icon-sort.svg";
import {useState} from "react";

const RecurringBills = () => {
    const [currentSort] = useState("latest");
    return (
        <div className="w-full bg-beige-100 py-6 px-4 md:px-10 md:py-8 xl:px-10 gap-8 xl:gap-8 flex flex-col ">
            <h1 className="text-preset-1">Recurring Bills</h1>
            <section className="flex flex-col gap-3 md:flex-wrap md:flex-row md:gap-6  ">


                <section className="xl:w-1/2 flex flex-col gap-5 w-full md:flex-row xl:flex-col">

                    <div
                        className="flex items-center bg-grey-900 text-white rounded-lg p-5 py-6 md:flex-1 xl:h-1/2  xl:flex-grow-0  ">
                        <div>
                            <img src={RecitIcon} alt="Recit Icon" className="w-10 mr-5 "/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-preset-4">Total bills</h2>
                            <span className="text-preset-1">$384.98</span>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white p-5 rounded-lg gap-5 md:flex-1 xl:h-1/2  xl:flex-grow-0">
                        <h2 className="text-preset-3">Summary</h2>
                        <ul>
                            <li className="flex justify-between pb-4 border-b-2 border-b-grey-100">
                                <p>Paid Bills</p>
                                <p>2($320.00)</p>
                            </li>
                            <li className="flex justify-between py-4 border-b-2 border-b-grey-100">
                                <p>Total Upcomming</p>
                                <p>6($1,220.00)</p>
                            </li>
                            <li className="flex justify-between pt-4 text-red">
                                <p>Due Soon</p>
                                <p>2($40.00)</p>
                            </li>
                        </ul>
                    </div>
                </section>


                <div className="flex flex-col bg-white p-5 rounded-lg gap-5 w-full xl:flex-1 ">
                    <div className="flex items-center gap-6 md:justify-between">
                        <input
                            className="w-full py-3 px-5  h-full capitalize items-center ring-gray-400 justify-between rounded-md ring-1 focus:ring-1 focus:outline-none focus:bg-gray-50 md:w-1/2  "
                            placeholder="Search bills"
                        />
                        <Menu as="div" className="relative inline-block text-left">
                            <div className="flex items-center gap-3 text-preset-5 text-grey-500">
                                <p className="hidden md:block">Sort by</p>
                                <MenuButton
                                    className="inline-flex md:min-w-[100px] h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white md:px-3 md:py-2 text-sm font-semibold text-gray-900 md:shadow-sm md:ring-1 ring-inset ring-gray-400 hover:bg-gray-50 ">
                                    <p className="hidden md:flex">{currentSort}</p>
                                    <ChevronDownIcon aria-hidden="true"
                                                     className="-mr-1 size-5 text-gray-400 hidden md:flex"/>
                                    <img
                                        src={IconSort}

                                        className="h-6 w-6 md:hidden"
                                        alt="Icon Sort"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-8 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    {sortMenu.map((listItem) => {
                                        return (
                                            <MenuItem key={listItem.name}>
                                                <li
                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                >
                                                    {listItem.description}
                                                </li>
                                            </MenuItem>
                                        );
                                    })}
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                    <table>
                        <tr className="hidden md:flex justify-between text-preset-5 text-grey-300  ">
                            <th className="flex-1 text-left">Bill Title</th>
                            <th className="flex-1 text-left">Due Date</th>
                            <th className=" text-right">Amount</th>
                        </tr>

                        {
                            userRecurringBills.map((item) => {
                                return (
                                    <tr className=" border-b last:border-b-0 ">
                                        <th className="py-5 flex flex-col gap-2 md:flex-row w-full md:flex md:justify-between">
                                            <div className="flex items-center gap-4 md:w-1/3 ">
                                                <img src={item.icon} className="rounded-full h-8"/>
                                                <h3 className="text-preset-4-bold capitalize">{item.name}</h3>
                                            </div>
                                            <div className="items-center gap-3 md:flex hidden">
                                                <span
                                                    className="text-preset-4 capitalize text-green ">{item.order}</span>
                                                {item.status === "paid" ?
                                                    <CheckCircleIcon className="fill-green h-4"/> :
                                                    <CheckCircleIcon className="fill-red h-4"/>}
                                            </div>
                                            <div className="flex items-center justify-between md:w-1/3 md:justify-end ">
                                                <div className="flex items-center gap-3 md:hidden">
                                                <span
                                                    className="text-preset-4 capitalize text-green ">{item.order}</span>
                                                    {item.status === "paid" ?
                                                        <CheckCircleIcon className="fill-green h-4"/> :
                                                        <CheckCircleIcon className="fill-red h-4"/>}
                                                </div>
                                                <span
                                                    className={item.status === "paid" ? "text-green text-preset-4-bold " : "text-grey-900 text-preset-4-bold  text-center"}>
                                                {item.amount}
                                            </span>

                                            </div>
                                        </th>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
            </section>
        </div>);
};

export default RecurringBills;
