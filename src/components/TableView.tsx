import { ITableVarible1 } from "@/utils/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import React, { FC, useMemo } from "react";
import * as _ from "lodash";
import { tableDataWithSchema } from "@/utils/data";

interface TableViewProps {
  data: ITableVarible1[];
  operationType: string;
}

const extractColumnDefination = (tableSchema: any) => {
  if (tableSchema.columns) {
    return {
      ...tableSchema,
      key: undefined,
      columns: tableSchema.columns.map((item: any) =>
        extractColumnDefination(item)
      ),
    };
  }
  if (tableSchema.key) {
    return {
      ...tableSchema,
      key: undefined,
      accessorFn: (row: any) => {
        return row[`${tableSchema.key}`];
      },
    };
  }
};

const TableView: FC<TableViewProps> = ({ data, operationType }) => {
  // console.log("coming in tableView and ", operationType);

  // const defaultColumns = useMemo(() => {
  //   return _.chain(tableDataWithSchema[operationType])
  //     .map((def) => extractColumnDefination(def))
  //     .value();
  // }, [operationType]);

  const defaultColumns = useMemo(() => {
    if (data.length === 0) return [];
    const columnHelper = createColumnHelper<any>();
    return Object.keys(data[0]).map((key) =>
      columnHelper.accessor(key, {
        header: key,
        cell: (info) => info.getValue(),
      })
    );
  }, [data]);
  
  const table = useReactTable({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="none">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`border border-solid ${
                        header.subHeaders.length === 0
                          ? "bg-info"
                          : "bg-secondary"
                      }`}
                    >
                      {header.id === "parameters" ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  if (
                    !(
                      cell.id ===
                      `${
                        table.getState().pagination.pageSize *
                        table.getState().pagination.pageIndex
                      }_parameters`
                    ) &&
                    cell.column.id === "parameters"
                  ) {
                    return null
                  } else {
                    return (
                      <td
                        key={cell.id}
                        rowSpan={
                          cell.id ===
                          `${
                            table.getState().pagination.pageSize *
                            table.getState().pagination.pageIndex
                          }_parameters`
                            ? table.getRowModel().rows.length
                            : 1
                        }
                        className={`border border-solid text-center ${
                          cell.column.id === "parameters" ? `bg-info` : ""
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    )
                  }
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <div className="flex justify-between items-center gap-2">
        <select
          className="border-2 px-5"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <div className="join">
          {table.getPageOptions().map((page) => (
            <button
              key={page}
              className={`join-item btn btn-sm btn-primary-content ${
                table.getState().pagination.pageIndex === page
                  ? "btn-active"
                  : ""
              }`}
              onClick={() => {
                table.setPageIndex(page);
              }}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TableView;
