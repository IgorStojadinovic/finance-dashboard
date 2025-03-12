// @ts-ignore
import React from "react";
import caretRightIcon from "../assets/images/icon-caret-right.svg";
import user1 from "../assets/images/avatars/emma-richardson.jpg";
import user2 from "../assets/images/avatars/savory-bites-bistro.jpg";
import user3 from "../assets/images/avatars/daniel-carter.jpg";
import user4 from "../assets/images/avatars/sun-park.jpg";
import user5 from "../assets/images/avatars/urban-services-hub.jpg";
import Chart from "../components/Chart";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <main className="bg-beige-100 flex flex-col justify-between xl:flex-row xl:justify-normal xl:flex-1" data-testid="home-page" role="main">
            <article className="flex flex-col w-full gap-6 px-4 py-6 md:p-8 xl:h-dvh">
                <section className="block-wapper xl:flex xl:flex-col gap-6" data-testid="overview-section">
                    <h1 className="text-preset-1" id="overview-title">Overview</h1>
                    <section className="flex flex-col gap-3 md:flex-row md:gap-6 xl:w-full xl:col-span-2" aria-labelledby="overview-title">
                        <article className="bg-grey-900 flex flex-col gap-3 text-white rounded-lg p-5 flex-1" aria-labelledby="current-balance-title">
                            <h3 id="current-balance-title" className="text-preset-4">Current Balance</h3>
                            <span className="text-preset-1" data-testid="current-balance-amount">$4,860.00</span>
                        </article>
                        <article className="bg-white flex flex-col gap-3 text-grey-900 rounded-lg p-5 flex-1" aria-labelledby="income-title">
                            <h3 id="income-title" className="text-preset-4">Income</h3>
                            <span className="text-preset-1" data-testid="income-amount">$3,814.25</span>
                        </article>
                        <article className="bg-white flex flex-col gap-3 text-grey-900 rounded-lg p-5 flex-1" aria-labelledby="expenses-title">
                            <h3 id="expenses-title" className="text-preset-4">Expenses</h3>
                            <span className="text-preset-1" data-testid="expenses-amount">$1,700.50</span>
                        </article>
                    </section>
                </section>

                <section className="block-container flex flex-col lg:flex-row xl:gap-6 flex-1">
                    <section className="block-wapper flex flex-col xl:w-1/2 gap-6">
                        {/* POTS */}
                        <section className="bg-white rounded-lg py-6 px-5 flex flex-col gap-5 justify-between" aria-labelledby="pots-title" data-testid="pots-section">
                            <header className="flex justify-between">
                                <h2 id="pots-title" className="text-preset-2 capitalize">
                                    pots
                                </h2>
                                <nav className="flex items-center justify-between capitalize gap-3">
                                    <Link className="text-preset-4 text-grey-500 hover:text-grey-900"
                                          to={"/dashboard/pots"}
                                          aria-label="See all pots details">
                                        see details
                                    </Link>
                                    <img
                                        src={caretRightIcon}
                                        alt="Arrow right"
                                        role="presentation"
                                    />
                                </nav>
                            </header>

                            <section className="flex flex-col gap-5 md:flex-row xl:h-3/4">
                                <article className="bg-beige-100 rounded-lg p-4 flex gap-4 items-center md:w-60" aria-labelledby="total-saved-title">
                                    <figure className="flex">
                                        <svg
                                            fill="none"
                                            height="40"
                                            viewBox="0 0 28 36"
                                            width="40"
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            aria-label="Savings icon"
                                        >
                                            <path
                                                d="m22.4375 5.8875v-2.8875c0-.58016-.2305-1.13656-.6407-1.5468-.4102-.41023-.9666-.6407-1.5468-.6407h-12.5c-.58016 0-1.13656.23047-1.5468.6407-.41023.41024-.6407.96664-.6407 1.5468v2.8875c-1.39375.22446-2.66214.93755-3.57823 2.01165-.91608 1.07411-1.420065 2.43915-1.42177 3.85085v17.5c0 1.5747.62556 3.0849 1.73905 4.1984 1.1135 1.1135 2.62373 1.7391 4.19845 1.7391h15c1.5747 0 3.0849-.6256 4.1984-1.7391s1.7391-2.6237 1.7391-4.1984v-17.5c-.0017-1.4117-.5057-2.77674-1.4218-3.85085-.9161-1.0741-2.1845-1.78719-3.5782-2.01165zm-1.875-2.8875v2.8125h-3.125v-3.125h2.8125c.0829 0 .1624.03292.221.09153.0586.0586.0915.13809.0915.22097zm-8.125 2.8125v-3.125h3.125v3.125zm-4.6875-3.125h2.8125v3.125h-3.125v-2.8125c0-.08288.03292-.16237.09153-.22097.0586-.05861.13809-.09153.22097-.09153zm17.8125 26.5625c0 .5335-.1051 1.0618-.3092 1.5547-.2042.4928-.5034.9407-.8807 1.3179-.3772.3773-.8251.6765-1.3179.8807-.4929.2041-1.0212.3092-1.5547.3092h-15c-.53349 0-1.06177-.1051-1.55465-.3092-.49289-.2042-.94073-.5034-1.31797-.8807-.37724-.3772-.67648-.8251-.88064-1.3179-.20416-.4929-.30924-1.0212-.30924-1.5547v-17.5c0-1.0774.42801-2.11075 1.18988-2.87262s1.79518-1.18988 2.87262-1.18988h15c1.0774 0 2.1108.42801 2.8726 1.18988.7619.76187 1.1899 1.79522 1.1899 2.87262zm-6.875-6.25c0 .9117-.3622 1.786-1.0068 2.4307-.6447.6446-1.519 1.0068-2.4307 1.0068h-.3125v1.5625c0 .2486-.0988.4871-.2746.6629s-.4143.2746-.6629.2746-.4871-.0988-.6629-.2746-.2746-.4143-.2746-.6629v-1.5625h-1.5625c-.2486 0-.4871-.0988-.6629-.2746s-.2746-.4143-.2746-.6629.0988-.4871.2746-.6629.4143-.2746.6629-.2746h3.75c.4144 0 .8118-.1646 1.1049-.4576.293-.2931.4576-.6905.4576-1.1049s-.1646-.8118-.4576-1.1049c-.2931-.293-.6905-.4576-1.1049-.4576h-2.5c-.9117 0-1.786-.3622-2.4307-1.0068-.64464-.6447-1.0068-1.519-1.0068-2.4307s.36216-1.786 1.0068-2.4307c.6447-.6446 1.519-1.0068 2.4307-1.0068h.3125v-1.5625c0-.2486.0988-.4871.2746-.6629s.4143-.2746.6629-.2746.4871.0988.6629.2746.2746.4143.2746.6629v1.5625h1.5625c.2486 0 .4871.0988.6629.2746s.2746.4143.2746.6629-.0988.4871-.2746.6629-.4143.2746-.6629.2746h-3.75c-.4144 0-.8118.1646-1.1049.4576-.293.2931-.4576.6905-.4576 1.1049s.1646.8118.4576 1.1049c.2931.293.6905.4576 1.1049.4576h2.5c.9117 0 1.786.3622 2.4307 1.0068.6446.6447 1.0068 1.519 1.0068 2.4307z"
                                                fill="#277c78"
                                            />
                                        </svg>
                                    </figure>

                                    <figure className="hidden">
                                        <svg
                                            fill="none"
                                            height="350"
                                            viewBox="0 0 28 36"
                                            width="80"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="m22.4375 5.8875v-2.8875c0-.58016-.2305-1.13656-.6407-1.5468-.4102-.41023-.9666-.6407-1.5468-.6407h-12.5c-.58016 0-1.13656.23047-1.5468.6407-.41023.41024-.6407.96664-.6407 1.5468v2.8875c-1.39375.22446-2.66214.93755-3.57823 2.01165-.91608 1.07411-1.420065 2.43915-1.42177 3.85085v17.5c0 1.5747.62556 3.0849 1.73905 4.1984 1.1135 1.1135 2.62373 1.7391 4.19845 1.7391h15c1.5747 0 3.0849-.6256 4.1984-1.7391s1.7391-2.6237 1.7391-4.1984v-17.5c-.0017-1.4117-.5057-2.77674-1.4218-3.85085-.9161-1.0741-2.1845-1.78719-3.5782-2.01165zm-1.875-2.8875v2.8125h-3.125v-3.125h2.8125c.0829 0 .1624.03292.221.09153.0586.0586.0915.13809.0915.22097zm-8.125 2.8125v-3.125h3.125v3.125zm-4.6875-3.125h2.8125v3.125h-3.125v-2.8125c0-.08288.03292-.16237.09153-.22097.0586-.05861.13809-.09153.22097-.09153zm17.8125 26.5625c0 .5335-.1051 1.0618-.3092 1.5547-.2042.4928-.5034.9407-.8807 1.3179-.3772.3773-.8251.6765-1.3179.8807-.4929.2041-1.0212.3092-1.5547.3092h-15c-.53349 0-1.06177-.1051-1.55465-.3092-.49289-.2042-.94073-.5034-1.31797-.8807-.37724-.3772-.67648-.8251-.88064-1.3179-.20416-.4929-.30924-1.0212-.30924-1.5547v-17.5c0-1.0774.42801-2.11075 1.18988-2.87262s1.79518-1.18988 2.87262-1.18988h15c1.0774 0 2.1108.42801 2.8726 1.18988.7619.76187 1.1899 1.79522 1.1899 2.87262zm-6.875-6.25c0 .9117-.3622 1.786-1.0068 2.4307-.6447.6446-1.519 1.0068-2.4307 1.0068h-.3125v1.5625c0 .2486-.0988.4871-.2746.6629s-.4143.2746-.6629.2746-.4871-.0988-.6629-.2746-.2746-.4143-.2746-.6629v-1.5625h-1.5625c-.2486 0-.4871-.0988-.6629-.2746s-.2746-.4143-.2746-.6629.0988-.4871.2746-.6629.4143-.2746.6629-.2746h3.75c.4144 0 .8118-.1646 1.1049-.4576.293-.2931.4576-.6905.4576-1.1049s-.1646-.8118-.4576-1.1049c-.2931-.293-.6905-.4576-1.1049-.4576h-2.5c-.9117 0-1.786-.3622-2.4307-1.0068-.64464-.6447-1.0068-1.519-1.0068-2.4307s.36216-1.786 1.0068-2.4307c.6447-.6446 1.519-1.0068 2.4307-1.0068h.3125v-1.5625c0-.2486.0988-.4871.2746-.6629s.4143-.2746.6629-.2746.4871.0988.6629.2746.2746.4143.2746.6629v1.5625h1.5625c.2486 0 .4871.0988.6629.2746s.2746.4143.2746.6629-.0988.4871-.2746.6629-.4143.2746-.6629.2746h-3.75c-.4144 0-.8118.1646-1.1049.4576-.293.2931-.4576.6905-.4576 1.1049s.1646.8118.4576 1.1049c.2931.293.6905.4576 1.1049.4576h2.5c.9117 0 1.786.3622 2.4307 1.0068.6446.6447 1.0068 1.519 1.0068 2.4307z"
                                                fill="#277c78"
                                            />
                                        </svg>
                                    </figure>

                                    <header>
                                        <h3 id="total-saved-title" className="text-preset-4 text-grey-500 mb-3">
                                            Total Saved
                                        </h3>
                                        <span className="text-preset-1" data-testid="total-saved-amount">
                                            $850
                                        </span>
                                    </header>
                                </article>
                                <ul className="grid grid-cols-2 gap-4 md:flex-1" aria-label="Savings breakdown">
                                    <li className="flex gap-4">
                                        <span className="h-full w-1 bg-cayan rounded-lg" role="presentation"></span>
                                        <article className="flex flex-col gap-1">
                                            <h3 className="">Savings</h3>
                                            <span className="" data-testid="savings-amount">$159</span>
                                        </article>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="h-full w-1 bg-cayan rounded-lg" role="presentation"></span>
                                        <article className="flex flex-col gap-1">
                                            <h3 className="text-preset-4 text-grey-500">
                                                Gift
                                            </h3>
                                            <span className="" data-testid="gift-amount">$40</span>
                                        </article>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="h-full w-1 bg-navy rounded-lg" role="presentation"></span>
                                        <article className="flex flex-col gap-1">
                                            <h3 className="text-preset-4 text-grey-500">
                                                Concert Ticket
                                            </h3>
                                            <span className="" data-testid="concert-ticket-amount">$110</span>
                                        </article>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="h-full w-1 bg-yellow rounded-lg" role="presentation"></span>
                                        <article className="flex flex-col gap-1">
                                            <h3 className="text-preset-4 text-grey-500">
                                                New Laptop
                                            </h3>
                                            <span className="" data-testid="new-laptop-amount">$10</span>
                                        </article>
                                    </li>
                                </ul>
                            </section>
                        </section>
                        {/* TRANSACTION */}
                        <section
                            className="bg-white rounded-lg py-6 px-5 flex flex-col gap-8 justify-between md:p-8 xl:flex-1"
                            aria-labelledby="transactions-title"
                            data-testid="transactions-section">
                            <header className="flex justify-between">
                                <h2 id="transactions-title" className="text-preset-2 capitalize">
                                    Transactions
                                </h2>
                                <nav className="flex items-center justify-between capitalize gap-3">
                                    <Link
                                        to="/dashboard/transactions"
                                        className="text-preset-4 text-grey-500 hover:text-grey-900"
                                        aria-label="View all transactions"
                                    >
                                        view all
                                    </Link>
                                    <img src={caretRightIcon} alt="Arrow right" role="presentation"/>
                                </nav>
                            </header>

                            <ul className="flex flex-col flex-1 gap-5 xl:gap-0 xl:justify-between" aria-label="Recent transactions">
                                <li className="flex items-center justify-between py-1">
                                    <img
                                        src={user1}
                                        alt="Emma Richardson profile"
                                        className="rounded-full h-8 mr-3 md:h-10"
                                    />
                                    <h3 className="flex-1">Emma Richardson</h3>
                                    <article className="flex flex-col items-end justify-between">
                                        <span className="text-preset-4-bold text-green mb-2">
                                            +$75.50
                                        </span>
                                        <time className="text-preset-5 text-grey-500">
                                            19 Aug 2024
                                        </time>
                                    </article>
                                </li>
                                <li role="separator" className="w-full h-[1px] bg-grey-100"></li>
                                <li className="flex items-center justify-between">
                                    <img
                                        src={user2}
                                        alt="Savory Bites Bristo profile"
                                        className="rounded-full h-8 mr-3 md:h-10"
                                    />
                                    <h3 className="flex-1">
                                        Savory Bites Bristo
                                    </h3>
                                    <article className="flex flex-col items-end">
                                        <span className="text-preset-4-bold text-green mb-2">
                                            +$75.50
                                        </span>
                                        <time className="text-preset-5 text-grey-500">
                                            19 Aug 2024
                                        </time>
                                    </article>
                                </li>
                                <li role="separator" className="w-full h-[1px] bg-grey-100"></li>
                                <li className="flex items-center justify-between">
                                    <img
                                        src={user3}
                                        alt="Daniel Carter profile"
                                        className="rounded-full h-8 mr-3 md:h-10"
                                    />
                                    <h3 className="flex-1">Daniel Carter</h3>
                                    <article className="flex flex-col items-end">
                                        <span className="text-preset-4-bold text-green mb-2">
                                            +$75.50
                                        </span>
                                        <time className="text-preset-5 text-grey-500">
                                            19 Aug 2024
                                        </time>
                                    </article>
                                </li>
                                <li role="separator" className="w-full h-[1px] bg-grey-100"></li>
                                <li className="flex items-center justify-between">
                                    <img
                                        src={user4}
                                        alt="Sam Park profile"
                                        className="rounded-full h-8 mr-3 md:h-10"
                                    />
                                    <h3 className="flex-1">Sam Park</h3>
                                    <article className="flex flex-col items-end">
                                        <span className="text-preset-4-bold text-green mb-2">
                                            +$75.50
                                        </span>
                                        <time className="text-preset-5 text-grey-500">
                                            19 Aug 2024
                                        </time>
                                    </article>
                                </li>
                                <li role="separator" className="w-full h-[1px] bg-grey-100"></li>
                                <li className="flex items-center justify-between">
                                    <img
                                        src={user5}
                                        alt="Urban Service profile"
                                        className="rounded-full h-8 mr-3 md:h-10"
                                    />
                                    <h3 className="flex-1">Urban Service</h3>
                                    <article className="flex flex-col items-end">
                                        <span className="text-preset-4-bold text-green mb-2">
                                            +$75.50
                                        </span>
                                        <time className="text-preset-5 text-grey-500">
                                            19 Aug 2024
                                        </time>
                                    </article>
                                </li>
                            </ul>
                        </section>
                    </section>

                    <section className="block-wapper flex flex-col xl:w-1/2 gap-6">
                        {/* BUDGETS */}
                        <section
                            className="bg-white rounded-lg py-6 px-5 flex flex-col gap-5 justify-between md:p-8 xl:flex-1"
                            aria-labelledby="budgets-title"
                            data-testid="budgets-section">
                            <header className="flex justify-between">
                                <h2 id="budgets-title" className="text-preset-2 capitalize">
                                    Budgets
                                </h2>
                                <nav className="flex items-center justify-between capitalize gap-3">
                                    <Link
                                        to="/dashboard/budgets"
                                        className="text-preset-4 text-grey-500 hover:text-grey-900"
                                        aria-label="See budget details"
                                    >
                                        see details
                                    </Link>
                                    <img src={caretRightIcon} alt="Arrow right" role="presentation"/>
                                </nav>
                            </header>
                            <section className="flex flex-col justify-center items-center md:flex-row xl:h-[200px]">
                                <figure className="flex justify-center md:w-3/5 xl:w-1/2">
                                    <Chart/>
                                </figure>

                                <ul className="grid grid-cols-2 gap-4 md:grid-cols-1 w-full" aria-label="Budget categories">
                                    <li className="flex gap-4">
                                        <span className="h-full w-1 bg-green rounded-lg" role="presentation"></span>
                                        <article>
                                            <h3 className="text-preset-4 text-grey-500">
                                                Entertainment
                                            </h3>
                                            <span className="text-preset-4-bold" data-testid="entertainment-amount">
                                                $50.00
                                            </span>
                                        </article>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="h-full w-1 bg-cayan rounded-lg" role="presentation"></span>
                                        <article>
                                            <h3 className="text-preset-4 text-grey-500">
                                                Bills
                                            </h3>
                                            <span className="text-preset-4-bold" data-testid="bills-amount">
                                                $750.00
                                            </span>
                                        </article>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="h-full w-1 bg-navy rounded-lg" role="presentation"></span>
                                        <article>
                                            <h3 className="text-preset-4 text-grey-500">
                                                Dining Out
                                            </h3>
                                            <span className="text-preset-4-bold" data-testid="dining-out-amount">
                                                $75.00
                                            </span>
                                        </article>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="h-full w-1 bg-yellow rounded-lg" role="presentation"></span>
                                        <article>
                                            <h3 className="text-preset-4 text-grey-500">
                                                Personal Care
                                            </h3>
                                            <span className="text-preset-4-bold" data-testid="personal-care-amount">
                                                $100.00
                                            </span>
                                        </article>
                                    </li>
                                </ul>
                            </section>
                        </section>
                        {/* BILLS */}
                        <section 
                            className="bg-white rounded-lg py-6 px-5 flex flex-col gap-8 justify-between"
                            aria-labelledby="recurring-bills-title"
                            data-testid="recurring-bills-section">
                            <header className="flex justify-between">
                                <h2 id="recurring-bills-title" className="text-preset-2 capitalize">
                                    Recurring Bills
                                </h2>
                                <nav className="flex items-center justify-between capitalize gap-3">
                                    <Link
                                        to="/dashboard/recurring"
                                        className="text-preset-4 text-grey-500 hover:text-grey-900"
                                        aria-label="See recurring bills details"
                                    >
                                        see details
                                    </Link>
                                    <img src={caretRightIcon} alt="Arrow right" role="presentation"/>
                                </nav>
                            </header>

                            <ul className="flex flex-col gap-6" aria-label="Bills summary">
                                <li
                                    className="bg-beige-100 py-5 px-4 rounded-lg flex justify-between border-l-4 border-l-green">
                                    <span className="text-preset-4 capitalize">
                                        paid bills
                                    </span>
                                    <span className="text-preset-4-bold" data-testid="paid-bills-amount">
                                        $190
                                    </span>
                                </li>
                                <li
                                    className="bg-beige-100 py-5 px-4 rounded-lg flex justify-between border-l-4 border-l-yellow">
                                    <span className="text-preset-4 capitalize">
                                        total upcoming
                                    </span>
                                    <span className="text-preset-4-bold" data-testid="upcoming-bills-amount">
                                        $194.89
                                    </span>
                                </li>
                                <li
                                    className="bg-beige-100 py-5 px-4 rounded-lg flex justify-between border-l-4 border-l-cayan">
                                    <span className="text-preset-4 capitalize">
                                        due soon
                                    </span>
                                    <span className="text-preset-4-bold" data-testid="due-soon-amount">
                                        $50.98
                                    </span>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </article>
        </main>
    );
};

export default Home;
