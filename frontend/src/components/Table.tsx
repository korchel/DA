import clsx from 'clsx';
import {
  DetailedHTMLProps,
  SetStateAction,
  TableHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import chunk from 'lodash/chunk';
import { useTranslation } from 'react-i18next';
import { ITableColumn, ITableData } from '../interfaces';
import { SortArrow } from './ui/icons';
import { useSortableTable } from '../hooks';
import { PageSizeSwitcher } from './PageSizeSwitcher';
import { Pagination } from './ui/Pagination';

interface ITableProps
  extends DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  tableColumns: ITableColumn[];
  tableData: ITableData[] | undefined;
  handleGoToDetailsPage: (id: number) => void;
}

export const Table = ({
  tableColumns,
  tableData,
  handleGoToDetailsPage,
  className,
}: ITableProps) => {
  const { t } = useTranslation();

  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedData, sortTable] = useSortableTable(tableData);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const pages = chunk(sortedData, pageSize);
  const numberOfPages = pages.length || 1;
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    sortTable(sortField, sortOrder);
  }, [tableData]);

  const handleSort = (accessor) => {
    const newSortOrder =
      accessor === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setSortOrder(newSortOrder as SetStateAction<'asc' | 'desc'>);
    sortTable(accessor, newSortOrder);
  };

  const isEmpty = !(tableData && tableData.length > 0);

  return (
    <div className='flex flex-col md:gap-5'>
      <PageSizeSwitcher
        onChange={setPageSize}
        value={pageSize}
        className='justify-self-start'
      />
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
                className={clsx(
                  tableColumn.sortable && 'cursor-pointer',
                  'flex xl:table-cell py-1 sm:py-2 md:py-4 px-1 sm:px-2 md:px-5 ',
                )}
              >
                <div className='flex it'>
                  <div className='truncate'>{tableColumn.label}</div>
                  {tableColumn.sortable && (
                    <SortArrow
                      className={clsx(
                        sortOrder === 'asc' &&
                          tableColumn.accessor === sortField &&
                          'rotate-180',
                        'block, min-w-6',
                      )}
                      active={tableColumn.accessor === sortField}
                    />
                  )}
                </div>
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
            pages[currentPage - 1]?.map((item) => (
              <tr
                className='table-cell xl:table-row overflow-hidden cursor-pointer
                  border-gray border-r last:border-r-0 xl:border-r-0 xl:border-b xl:last:border-b-0
                  hover:bg-whiteHover dark:hover:bg-secondaryDarkHover'
                key={item.id}
                onClick={() => handleGoToDetailsPage(item.id)}
              >
                {Object.values(item.data).map((param, index) => (
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
      <Pagination
        className='ml-auto'
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        goToPage={handleChangePage}
      />
    </div>
  );
};
