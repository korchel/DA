import clsx from 'clsx';

import {
  DetailedHTMLProps,
  SetStateAction,
  TableHTMLAttributes,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ITableColumn } from '../interfaces';

interface ITableProps
  extends DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  tableColumns: ITableColumn[];
  data:
    | {
        id: number;
        data: (string | number | undefined | Date)[];
      }[]
    | undefined;
  handleGoToDetailsPage: (id: number) => void;
}

export const Table = ({
  tableColumns,
  data,
  handleGoToDetailsPage,
  className,
}: ITableProps) => {
  const { t } = useTranslation();

  const [tableData, setTableData] = useState(data);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'decs'>('asc');

  const sortTable = (sortField, sortOrder) => {};

  const handleSort = (accessor) => {
    const newSortOrder =
      accessor === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setSortOrder(newSortOrder as SetStateAction<'asc' | 'decs'>);
    sortTable(accessor, newSortOrder);
  };

  const isEmpty = !(data && data.length > 0);

  return (
    <table
      className={clsx(
        className,
        'w-full bg-white dark:bg-secondaryDark text-left rounded-md shadow-md table-fixed',
      )}
    >
      <thead
        className='block xl:table-header-group float-left xl:float-none uppercase
        text-secondary dark:text-whiteDark whitespace-nowrap'
      >
        <tr className='border-r xl:border-r-0 border-b-0 xl:border-b border-gray overflow-hidden'>
          {tableColumns.map((tableColumn) => (
            <th
              key={tableColumn.accessor}
              onClick={
                tableColumn.sortable
                  ? () => handleSort(tableColumn.accessor)
                  : undefined
              }
              className='block xl:table-cell py-1 sm:py-2 md:py-4 px-1 sm:px-2 md:px-5 truncate'
            >
              {tableColumn.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='block xl:table-row-group overflow-x-auto'>
        {isEmpty ? (
          <tr className='text-secondary dark:text-whiteDark font-bold xl:h-44 block mt-10 xl:table-row'>
            <td colSpan={7} className='text-center block xl:table-cell'>
              {t('emptyTable')}
            </td>
          </tr>
        ) : (
          tableData?.map((item) => (
            <tr
              className='table-cell xl:table-row overflow-hidden cursor-pointer
                border-gray border-r last:border-r-0 xl:border-r-0 xl:border-b xl:last:border-b-0
                hover:bg-whiteHover dark:hover:bg-secondaryDarkHover'
              key={item.id}
              onClick={() => handleGoToDetailsPage(item.id)}
            >
              {item.data.map((param, index) => (
                <td
                  key={index}
                  className='block max-w-48 xl:table-cell truncate
                      h-6 sm:h-9 md:h-14
                      py-1 sm:py-2 md:py-4
                      px-1 sm:px-2 md:px-5'
                >
                  {param instanceof Date ? param.toLocaleDateString() : param}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
