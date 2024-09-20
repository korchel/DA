import clsx from "clsx";

import { DetailedHTMLProps, TableHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface ITableProps extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  headers: string[];
  data: {
    id: number;
    data: (string | number | undefined)[];
  }[] | undefined;
  handleGoToDetailsPage: (id: number) => void;
}

export const Table = ({ headers, data, handleGoToDetailsPage, className }: ITableProps) => {
  const { t } = useTranslation();
   
  const isEmpty = !(data && (data.length > 0));

  return (
    <table className={clsx(className, "w-full bg-white dark:bg-secondaryDark text-left rounded-md shadow-md table-fixed")}>
      <thead className="block xl:table-header-group float-left xl:float-none uppercase
        text-secondary dark:text-whiteDark whitespace-nowrap"
      >
        <tr className="border-r xl:border-r-0 border-b-0 xl:border-b border-gray overflow-hidden">
          {headers.map((header, index) => (
            <th key={index} className="block xl:table-cell py-4 px-5 truncate">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="block xl:table-row-group overflow-x-auto">
        {isEmpty
          ? <tr className="text-secondary dark:text-whiteDark font-bold xl:h-44 block mt-10 xl:table-row">
              <td colSpan={7} className="text-center block xl:table-cell">
                {t('emptyTable')}
              </td>
            </tr>
          : data?.map((item) => (
            <tr
              className="table-cell xl:table-row border-r last:border-r-0 xl:border-r-0 xl:border-b xl:last:border-b-0 border-gray overflow-hidden hover:bg-whiteHover dark:hover:bg-secondaryDarkHover cursor-pointer"
              key={item.id}
              onClick={() => handleGoToDetailsPage(item.id)}
            >
              {
                item.data.map((param, index) => (
                  <td key={index} className="block max-w-48 xl:table-cell py-4 px-5 truncate h-14">{param}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};