import React from "react";
import {usePagination} from "./usePagination.ts";
import {FaCaretLeft, FaCaretRight} from "react-icons/fa";
import {clsx} from "clsx";

interface PaginationProps {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount: number;
    currentPage: number;
    pageSize: number;
}


const Pagination: React.FC<PaginationProps> = ({
                                                   onPageChange,
                                                   totalCount,
                                                   siblingCount = 1,
                                                   currentPage,
                                                   pageSize,
                                               }) => {
    const paginationRange = usePagination({currentPage, totalCount, siblingCount, pageSize});

    // If paginationRange is not an array or its length is less than 2, return null
    if (!Array.isArray(paginationRange) || paginationRange.length < 2) {
        return null;
    }
    // If there are less than 2 times in pagination range do  not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul
            className="flex justify-between items-center mt-6 xl:mt-0 xl:justify-center "
        >
            {/* Left navigation arrow  disabled: currentPage === 1*/}
            {currentPage === 1 ? (
                <li
                    className="w-10 h-10 md:w-24 md:gap-3  border rounded-lg flex items-center justify-center text-grey-500 cursor-pointer"

                >
                    <FaCaretLeft/>
                    <p className="hidden md:flex">Prev</p>
                </li>
            ) : (

                <li
                    className="w-10 h-10 md:w-24 md:gap-3  border rounded-lg flex items-center justify-center hover:bg-grey-900 hover:text-white cursor-pointer"
                    onClick={onPrevious}
                >
                    <FaCaretLeft/>
                    <p className="hidden md:flex">Prev</p>
                </li>
            )}
            <div className="flex justify-around w-full md:w-1/3 xl:w-1/5">
                {paginationRange.map((pageNumber, index) => {

                    // If the pageItem is a DOT, render the DOTS
                    if (pageNumber === "...") {
                        return <li className="w-10 h-10 border rounded-lg flex items-center justify-center">...</li>;
                    }

                    // Render our Page Pills   selected: pageNumber === currentPage
                    return (

                        <li
                            key={index}
                            className={clsx(
                                "w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-grey-900 hover:text-white cursor-pointer",
                                {"w-10 h-10 border rounded-lg flex items-center justify-center bg-grey-900 text-white": pageNumber === currentPage}
                            )}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
            </div>
            {/*  Right Navigation arrow    disabled: currentPage === lastPage */}
            {currentPage === lastPage ? (<li
                className="w-10 h-10  md:w-24 md:gap-3 border rounded-lg flex items-center justify-center text-grey-500 cursor-pointer"
            >
                <p className="hidden md:flex">Next</p>
                <FaCaretRight/>

            </li>) : (<li
                className="w-10 h-10 md:w-24 md:gap-3 border rounded-lg flex items-center justify-center hover:bg-grey-900 hover:text-white cursor-pointer"
                onClick={onNext}
            >
                <p className="hidden md:flex">Next</p>
                <FaCaretRight/>
            </li>)}

        </ul>
    );
};

export default Pagination;