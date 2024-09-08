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
    <table className="w-[100%] bg-white text-left rounded-md shadow-md table-fixed">
      <thead className="block xl:table-header-group float-left xl:float-none uppercase text-sky-600 whitespace-nowrap">
        <tr className="border-r xl:border-r-0 border-b-0 xl:border-b">
          {headers.map((header, index) => (
            <th key={index} className="block xl:table-cell py-4 px-5">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="block xl:table-row-group overflow-x-auto">
        {
          data?.map((item) => (
            <tr
              className="table-cell xl:table-row border-r xl:border-r-0 xl:border-b overflow-hidden hover:bg-sky-50 cursor-pointer"
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