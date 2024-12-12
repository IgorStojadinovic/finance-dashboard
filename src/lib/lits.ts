import PapaSoftwareIcon from "../assets/images/avatars/bytewise.jpg";
import QuebecServiceIcon from "../assets/images/avatars/urban-services-hub.jpg";
import RomeoCloudIcon from "../assets/images/avatars/nimbus-data-storage.jpg";
import CharlieElectricIcon from "../assets/images/avatars/spark-electric-solutions.jpg";
import FoxtronWaterlineIcon from "../assets/images/avatars/aqua-flow-utilities.jpg";
import TangoGasCompanyIcon from "../assets/images/avatars/ecofuel-energy.jpg";
import LimaDiningHouseIcon from "../assets/images/avatars/flavor-fiesta.jpg";
import YunaKimAvatar from "../assets/images/avatars/yuna-kim.jpg";
import JulietRestaurantIcon from "../assets/images/avatars/savory-bites-bistro.jpg";
import BravoZenSpa from "../assets/images/avatars/serenity-spa-and-wellness.jpg";
import SofiaPetersonAvatar from "../assets/images/avatars/sofia-peterson.jpg";
import ElevateEducationIcon from "../assets/images/avatars/elevate-education.jpg";
import IconDeltaTaxi from "../assets/images/avatars/swift-ride-share.jpg";
import IconEcoGame from "../assets/images/avatars/pixel-playground.jpg";

type MenuArr = {
    name: string,
    description: string,
}


const sortMenu: MenuArr[] = [
    {
        name: "latest",
        description: "Latest"
    },
    {
        name: "oldest",
        description: "Oldest"
    },
    {
        name: "a-z",
        description: "A to Z"
    },
    {
        name: "z-a",
        description: "Z to A"
    },
    {
        name: "highest",
        description: "Highest"
    },
    {
        name: "lowest",
        description: "Lowest"
    }
];

const categoriesMenu: MenuArr[] = [
    {
        name: "all transactions",
        description: "All Transactions"
    },
    {
        name: "entertainment",
        description: "Entertainment"
    },
    {
        name: "bills",
        description: "Bills"
    },
    {
        name: "groceries",
        description: "Groceries"
    },
    {
        name: "dining out",
        description: "Dining Out"
    },
    {
        name: "transportation",
        description: "Transportation"
    },
    {
        name: "personal care",
        description: "Personal Care"
    },
    {
        name: "education",
        description: "Education"
    },
    {
        name: "lifestyle",
        description: "Lifestyle"
    },
    {
        name: "shopping",
        description: "Shopping"
    },
    {
        name: "general",
        description: "General"
    }
];

type BudgetsArr = {
    category: string,
    spent: string,
    totalBudget: string,
    color: string
}

const budgetStatus: BudgetsArr[] = [
    {
        category: "bills",
        spent: "$250.00",
        totalBudget: "$750.00",
        color: "#82C9D7"
    },
    {
        category: "dining out",
        spent: "$67.00",
        totalBudget: "$75.00",
        color: "#F2CDAC"
    },
    {
        category: "personal care",
        spent: "$65.00",
        totalBudget: "$100.00",
        color: "#626070"
    },
    {
        category: "entertainment",
        spent: "$65.00",
        totalBudget: "$100.00",
        color: "#277C78"
    }
];
export type BudgetEntry = {
    category: string;
    hex: string;
    max: string;
    spent: string;
    free: string;
    bar: string;
    latest: {
        name: string;
        price: string;
        date: string;
        icon: string;
    }[];
};

const userBudget: BudgetEntry[] = [
    {
        category: "entertainment",
        hex: "#277C78",
        max: "50",
        spent: "25",
        free: "50",
        bar: "50%",
        latest: [
            {
                name: "papa software",
                price: "-$10.00",
                date: "16 Aug 2024",
                icon: PapaSoftwareIcon
            },
            {
                name: "quebec services",
                price: "-$5.00",
                date: "12 Aug 2024",
                icon: QuebecServiceIcon
            },
            {
                name: "romeo cloud service",
                price: "-$10.00",
                date: "05 Aug 2024",
                icon: RomeoCloudIcon
            }
        ]
    },
    {
        category: "bills",
        hex: "#82C9D7",
        max: "750",
        spent: "250",
        free: "750",
        bar: "33%",
        latest: [
            {
                name: "charlies electric company",
                price: "-$100.00",
                date: "01 Aug 2024",
                icon: CharlieElectricIcon
            },
            {
                name: "foxtrot waterline",
                price: "-$105.00",
                date: "01 Aug 2024",
                icon: FoxtronWaterlineIcon
            },
            {
                name: "tango gas company",
                price: "-$50.00",
                date: "01 Aug 2024",
                icon: TangoGasCompanyIcon
            }
        ]
    },
    {
        category: "dining out",
        hex: "#F2CDAC",
        max: "75",
        spent: "67",
        free: "8",
        bar: "89%",
        latest: [
            {
                name: "lima dining house",
                price: "-$30.00",
                date: "21 Aug 2024",
                icon: LimaDiningHouseIcon
            },
            {
                name: "yuna kim",
                price: "-$21.50",
                date: "20 Aug 2024",
                icon: YunaKimAvatar
            },
            {
                name: "juliet restaurant",
                price: "-$15.50",
                date: "12 Aug 2024",
                icon: JulietRestaurantIcon
            }
        ]
    },
    {
        category: "personal care",
        hex: "#626070",
        max: "100",
        spent: "65",
        free: "35",
        bar: "49%",
        latest: [
            {
                name: "bravo zen spa",
                price: "-$25.00",
                date: "29 Aug 2024",
                icon: BravoZenSpa
            },
            {
                name: "sofia peterson",
                price: "-$15.00",
                date: "15 Aug 2024",
                icon: SofiaPetersonAvatar
            },
            {
                name: "bravo zen spa",
                price: "-$25.00",
                date: "13 Aug 2024",
                icon: BravoZenSpa
            }
        ]
    }
];


type ColorsArr = {
    name: string,
    hex: string,
}
const colorTags: ColorsArr [] = [
    {
        name: "green",
        hex: "#277C78"
    },
    {
        name: "yellow",
        hex: "#F2CDAC"
    },
    {
        name: "cyan",
        hex: "#82C9D7"
    },
    {
        name: "navy",
        hex: "#626070"
    },
    {
        name: "red",
        hex: "#C94736"
    },
    {
        name: "purple",
        hex: "#826CB0"
    },
    {
        name: "light-purple",
        hex: "#AF81BA"
    },
    {
        name: "turquoise",
        hex: "#597C7C"
    },
    {
        name: "brown",
        hex: "#93674F"
    },
    {
        name: "magenta",
        hex: "#934F6F"
    },
    {
        name: "blue",
        hex: "#3F82B2"
    },
    {
        name: "navy-grey",
        hex: "#97A0AC"
    },
    {
        name: "army-green",
        hex: "#7F9161"
    },
    {
        name: "gold",
        hex: "#CAB361"
    },
    {
        name: "orange",
        hex: "#BE6C49"
    }
];

export type PotsArr = {
    name: string;
    saved: string;
    bar: string;
    target: string;
    hex: string;
    colorName: string
}
const userPots: PotsArr[] = [
    {
        name: "saving",
        saved: "$159.00",
        bar: "7.95%",
        target: "2.000",
        hex: "#277C78",
        colorName: "green"
    },
    {
        name: "concert ticket",
        saved: "$110.00",
        bar: "73.3%",
        target: "150",
        hex: "#626070",
        colorName: "navy"
    },
    {
        name: "gift",
        saved: "$40.00",
        bar: "66.6%",
        target: "60",
        hex: "#3F82B2",
        colorName: "blue"
    },
    {
        name: "new laptop",
        saved: "$10.00",
        bar: "1%",
        target: "1000",
        hex: "#F2CDAC",
        colorName: "yellow"
    },
    {
        name: "holiday",
        saved: "531.00",
        bar: "36%",
        target: "1440",
        hex: "#826CB0",
        colorName: "purple"
    },
];
type UserRecurringBillsOBJ = {
    name: string;
    amount: string;
    icon: string;
    order: string;
    status: string;
}

const userRecurringBills: UserRecurringBillsOBJ[] = [
    {
        name: "elevate education",
        icon: ElevateEducationIcon,
        amount: "$250",
        order: "monthly-1st",
        status: "paid"
    },
    {
        name: "bravo zen spa",
        icon: BravoZenSpa,
        amount: "$250",
        order: "monthly-1st",
        status: "paid"
    },
    {
        name: "elevate education",
        amount: "$70",
        icon: CharlieElectricIcon,
        order: "monthly-3rd",
        status: "paid"
    },
    {
        name: "charlies electric company",
        amount: "$10",
        icon: CharlieElectricIcon,
        order: "monthly-5th",
        status: "open"
    },
    {
        name: "delta taxi",
        amount: "$250",
        icon: IconDeltaTaxi,
        order: "monthly-6th",
        status: "open"
    },
    {
        name: "echo game store",
        amount: "$50",
        icon: IconEcoGame,
        order: "monthly-12st",
        status: "paid"
    },
    {
        name: "echo game store",
        amount: "$10",
        icon: IconEcoGame,
        order: "monthly-16th",
        status: "paid"
    },
    {
        name: "tango gas company",
        amount: "$220",
        icon: TangoGasCompanyIcon,
        order: "monthly-22nd",
        status: "paid"
    },
    {
        name: "juliet restaurant",
        amount: "$950",
        icon: JulietRestaurantIcon,
        order: "monthly-28th",
        status: "paid"
    },
];

export {sortMenu, categoriesMenu, colorTags, budgetStatus, userBudget, userPots, userRecurringBills};