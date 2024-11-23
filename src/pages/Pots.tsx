import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/solid";
import {userPots} from "../lib/lits.ts";
import EditPot from "../lib/modals/EditPot.tsx";
import {useState} from "react";
import DeleteBudgetModal from "../lib/modals/DeleteBudgetModal.tsx";
import AddNewPot from "../lib/modals/AddNewPot.tsx";


const Pots = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    return (
        <div className="xl:flex-1 bg-beige-100 py-6 px-4 md:px-10 md:py-8 xl:px-10 relative overflow-y-scroll">
            {
                (modalOpen || modalDelete) && (
                    <div className="fixed inset-0 bg-black/30 z-10"></div>)
            }

            <section className="flex flex-col xl:flex-row xl:flex-wrap w-full gap-6">
                <div className="flex justify-between items-center xl:w-full">
                    <h1 className="text-preset-1">Budgets</h1>
                    <AddNewPot/>
                </div>
                <section className="flex flex-col gap-6 xl:grid xl:grid-cols-2 xl:gap-6 xl:w-full">
                    {userPots.map((item) => {
                        return (
                            <section className="bg-white rounded-lg xl:col-span-1" key={item.name}>
                                <EditPot modalOpen={modalOpen} currentPot={item} setEditStatus={setModalOpen}/>
                                <DeleteBudgetModal modalOpen={modalDelete} setDeleteStatus={setModalDelete}
                                                   name={item.name}/>
                                <div className="flex flex-col gap-5 px-5 py-6 md:p-6 ">
                                    <section className="flex items-center justify-between">
                                        <div className="flex gap-4 items-center">
                                            <div className="h-5 w-5 rounded-full"
                                                 style={{background: item.hex}}></div>
                                            <h2 className="flex w-full text-preset-2 capitalize flex-1 ">{item.name}</h2>
                                        </div>
                                        <div className=" text-right">
                                            <Menu key={item.name} as="div">
                                                <MenuButton>
                                                    <EllipsisHorizontalIcon
                                                        className="size-8 text-grey-300 cursor-pointer flex-1"
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
                                                                setModalOpen(true);
                                                            }}
                                                        >
                                                            Edit Pot
                                                        </button>
                                                    </MenuItem>
                                                    <div className="my-1 h-px bg-gray-100"/>
                                                    <MenuItem>
                                                        <button
                                                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-red"

                                                            onClick={() => {
                                                                setModalDelete(true);
                                                            }}
                                                        > Delete Pot
                                                        </button>

                                                    </MenuItem>
                                                </MenuItems>
                                            </Menu>

                                        </div>
                                    </section>

                                    <section className="flex flex-col gap-5  text-preset-4 text-grey-500">
                                        <div className="flex justify-between items-end capitalize">
                                            <h3>total saved</h3>
                                            <h3 className="text-preset-1 text-grey-900">{item.saved}</h3>
                                        </div>


                                        <div className="flex flex-col">
                                            <div className="w-full h-2 bg-beige-100 rounded-lg">
                                                <div className="h-full w-1/2 rounded-lg"
                                                     style={{background: item.hex, width: item.bar}}>
                                                </div>
                                            </div>
                                            <div
                                                className="flex justify-between items-center mt-2 text-preset-5 text-grey-500">
                                                <p>{item.bar}</p>
                                                <p>Total of {item.target}</p>
                                            </div>
                                        </div>
                                        <section className="flex gap-4">
                                            <button
                                                className=" group bg-beige-100 flex-1 rounded-md py-4 px-7 hover:bg-green ">
                                                <p className="text-preset-4-bold text-gray-900 group-hover:text-white">+
                                                    Add
                                                    Money</p>
                                            </button>
                                            <button
                                                className="group bg-beige-100 flex-1 rounded-md py-4 px-7 hover:bg-grey-900">
                                                <p className="text-preset-4-bold text-gray-900 group-hover:text-white">Withdraw</p>
                                            </button>

                                        </section>
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

export default Pots;
