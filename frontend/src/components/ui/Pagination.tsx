import clsx from "clsx";

import { ActionButton } from "./ActionButton";
import { usePagination } from "../../hooks/usePagination";

interface IPaginationProps {
  numberOfPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  className?: string,
}

export const Pagination = ({ numberOfPages, currentPage, goToPage, className }: IPaginationProps) => {
  const pageNumbers = usePagination({ numberOfPages, currentPage});

  const commonClassNames = 'bg-white hover:bg-whiteHover dark:bg-secondaryDark dark:hover:bg-secondaryDarkHover p-1 border-gray';
  const activePageClassNames = 'bg-highlight hover:bg-highlight dark:bg-secondaryDarkHover dark:hover:bg-secondaryDarkHover hover:text-secondary dark:hover:text-whiteDark';
  const inactiveButtonClassNames = 'text-secondaryHover hover:text-secondaryHover hover:bg-white dark:text-whiteDarkHover dark:hover:text-whiteDarkHover dark:hover:bg-secondaryDark';

  return (
    <div className={clsx(className, "flex rounded-md overflow-hidden shadow-md")}>
      <ActionButton
        actionType="chevronDouble"
        className={clsx(
          commonClassNames,
          currentPage === 1 && inactiveButtonClassNames,
          "border-l",
        )}
        mirrored
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      />
      <ActionButton
        actionType="chevronSingle"
        className={clsx(
          commonClassNames,
          currentPage === 1 && inactiveButtonClassNames,
          "border-l",
        )}
        mirrored
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {
        pageNumbers.map((number) => (
          <ActionButton
            actionType="character"
            className={clsx(
              commonClassNames,
              number === currentPage && activePageClassNames,
              "border-r w-8",
            )}
            disabled={number === currentPage}
            onClick={() => goToPage(number)}
          >
            {number}
          </ActionButton>
        ))
      }
      <ActionButton
        actionType="chevronSingle"
        className={clsx(
          commonClassNames,
          currentPage === numberOfPages && inactiveButtonClassNames,
          "border-r",
        )}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === numberOfPages}
      />
      <ActionButton
        actionType="chevronDouble"
        className={clsx(
          commonClassNames,
          currentPage === numberOfPages && inactiveButtonClassNames,
        )}
        onClick={() => goToPage(numberOfPages)}
        disabled={currentPage === numberOfPages}
      />
    </div>
  );
};
