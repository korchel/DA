interface ITableProps {
  type: 'documents' | 'files' | 'users';
  headers: string[];
  data: {
    id: number;
    data: (string | number | undefined)[];
  }[] | undefined;
  handleGoToDetailsPage: (id: number) => void;
}

export const Table = ({ type, headers, data, handleGoToDetailsPage }: ITableProps) => {

  return (
    <table className="w-[100%] bg-white dark:bg-secondaryDark text-left rounded-md shadow-md table-fixed ">
      <thead className="block xl:table-header-group float-left xl:float-none uppercase text-secondary dark:text-whiteDark whitespace-nowrap">
        <tr className="border-r xl:border-r-0 border-b-0 xl:border-b border-gray">
          {headers.map((header, index) => (
            <th key={index} className="block xl:table-cell py-4 px-5">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="block xl:table-row-group overflow-x-auto">
        {
          data?.map((item) => (
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