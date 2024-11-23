import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Field,
    Input,
    Label,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from "@headlessui/react";
import {XCircleIcon} from "@heroicons/react/24/outline";
import {ChevronDownIcon,} from "@heroicons/react/16/solid";
import {colorTags, PotsArr} from "../lits.ts";
import React, {useState} from "react";


interface EditBudgetModalProps {
    modalOpen: boolean;
    setEditStatus: (status: boolean) => void;
    currentPot: PotsArr;
}

const EditPot: React.FC<EditBudgetModalProps> = ({
                                                     modalOpen,
                                                     setEditStatus,
                                                     currentPot
                                                 }) => {

    const {name, hex, colorName, target} = currentPot;
    const [currentColor, setCurrentColor] = useState(hex);
    const [colorTag, setColorTag] = useState(colorName);
    const [potName, setPotName] = useState(name);
    const [potMaxSpending, setPotMaxSpending] = useState(target);

    return (
        <>
            <Dialog open={modalOpen} as="div" className="relative z-10 focus:outline-none"
                    onClose={() => {
                        setEditStatus(false);
                    }}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full flex flex-col gap-5 max-w-md md:max-w-xl rounded-xl bg-white shadow-md p-6 md:p-8 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-preset-2 flex justify-between items-center">
                                Edit Pot
                                <XCircleIcon className="size-8 cursor-pointer text-grey-500"
                                             onClick={() => {
                                                 setEditStatus(false);
                                             }}/>
                            </DialogTitle>
                            <p className="text-preset-4 text-grey-500">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
                                Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
                            </p>
                            <div className="flex flex-col gap-4">
                                <Menu as="div" className="relative w-full">
                                    <div
                                        className="flex flex-col w-full gap-1 text-preset-5-bold text-grey-500">
                                        <p>Pot Name</p>
                                        <input
                                            className="w-full flex py-[0.75rem] px-5 h-full capitalize items-center justify-between rounded-md border-0 ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring-gray-300"
                                            value={
                                                potName}
                                            onChange={(e) => {
                                                setPotName(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute w-full max-h-[300px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >

                                    </MenuItems>
                                </Menu>
                                <Field className="flex flex-col gap-1 w-full">
                                    <Label className="text-preset-5-bold text-grey-500 ">Maximum Spending</Label>
                                    <div
                                        className="w-full flex py-[0.75rem] px-5 h-full capitalize items-center justify-between rounded-md border-0 ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring-gray-300">
                                        <p className="text-preset-4">$</p>
                                        <Input
                                            type={"number"}
                                            value={
                                                potMaxSpending}
                                            onChange={(e) => {
                                                setPotMaxSpending(e.target.value);
                                            }}
                                            className="w-full p-0 px-2 border-0 h-full capitalize items-center justify-between rounded-md focus:ring-0 focus:outline-none focus:bg-gray-50  "
                                        />
                                    </div>

                                </Field>

                                <Menu as="div" className="relative w-full">
                                    <div
                                        className="flex flex-col w-full gap-1 text-preset-5-bold text-grey-500">
                                        <p>Color tag</p>
                                        <MenuButton
                                            className="inline-flex py-[0.75rem] px-5 h-full capitalize items-center justify-between gap-x-1.5 rounded-md bg-white   font-semibold text-gray-900  ring-1 ring-gray-300 hover:bg-gray-50 ">
                                            <div className="flex gap-2">
                                                <div
                                                    className="w-4 h-4 rounded-full"
                                                    style={{
                                                        background: currentColor
                                                    }}>

                                                </div>
                                                <p className="">{colorTag}</p>
                                            </div>
                                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400"/>
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute w-full max-h-[200px] overflow-y-scroll z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-1">
                                            {colorTags.map((color) => {
                                                return (
                                                    <MenuItem key={color.name}>
                                                        <li
                                                            onClick={() => {
                                                                setColorTag(color.name);
                                                                setCurrentColor(color.hex);
                                                            }}
                                                            className="flex items-center gap-2 capitalize px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                        >
                                                            <div
                                                                className="w-4 h-4 rounded-full"
                                                                style={{background: color.hex}}>

                                                            </div>
                                                            {color.name}
                                                        </li>
                                                    </MenuItem>
                                                );
                                            })}
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>
                            <div className="mt-4">
                                <Button
                                    className="flex w-full justify-center items-center h-14 gap-2 rounded-md bg-grey-900 py-1.5 px-4 text-preset-4-bold text-white focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={() => {
                                        setEditStatus(false);
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default EditPot;