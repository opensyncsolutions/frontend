import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Table as TableDef,
} from "@tanstack/react-table";
import useDebounce from "@/shared/hooks/use-debounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Button } from "./button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import Loader from "./loader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (record: TData) => void;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  loading?: boolean;
  pagination?: Pagination;
  className?: string;
  headerClassname?: string;
  noDataMessage?: ReactNode;
  debounceDuration?: number;
}

interface DataTablePaginationProps<TData> {
  table: TableDef<TData>;
  pagination: Pagination;
  debounceDuration?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  setSorting,
  loading,
  sorting,
  debounceDuration = 400,
  className,
  headerClassname,
  noDataMessage,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    manualSorting: true,
    pageCount: pagination?.total || data?.length,

    state: {
      sorting,
      pagination: {
        pageSize: pagination?.pageSize ? pagination?.pageSize : 15,
        pageIndex: pagination?.page ? pagination?.page - 1 : 0,
      },
    },
  });

  return (
    <>
      <div className="rounded-md border relative w-full">
        <Table
          className={cn(pagination?.fetching || loading ? "opacity-50" : "")}
          containerClassName={className}
        >
          <TableHeader className={cn(headerClassname)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "text-neutral-0",
                        // @ts-ignore
                        header.column.columnDef?.meta?.className
                          ? // @ts-ignore
                            header.column.columnDef?.meta?.className +
                              " bg-neutral-100"
                          : ""
                      )}
                      style={{
                        width: header.getSize(),
                        minWidth: header?.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {(loading || pagination?.fetching) && (
              <div className="w-full h-full min-h-48 hover:bg-white">
                <div className="flex justify-center w-[100%] h-full max-w-[100vw] absolute top-10 items-center flex-col">
                  <Loader size={150} />
                </div>
              </div>
            )}

            {!table?.getRowModel()?.rows?.length &&
              !(loading || pagination?.fetching) && (
                <div className="w-full h-full min-h-48">
                  <div className="w-[100%] h-full absolute top-8">
                    {noDataMessage ?? (
                      <div className="flex flex-col justify-center items-center">
                        <h3 className="mt-4 text-lg font-bold text-slate-400 text-center">
                          No data Found
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              )}
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          // @ts-ignore
                          cell.column.columnDef?.meta?.className
                            ? // @ts-ignore
                              cell.column.columnDef?.meta?.className +
                                " bg-neutral-50 shadow-lg border-l-neutral-300 border-l-1"
                            : ""
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
      {!loading && data?.length > 0 && pagination && (
        <DataTablePagination
          table={table}
          pagination={{
            ...pagination,
          }}
          debounceDuration={debounceDuration}
        />
      )}
    </>
  );
}

export function DataTablePagination<TData>({
  table,
  pagination,
  debounceDuration = 400,
}: DataTablePaginationProps<TData>) {
  const [pageSize, setPageSize] = useState(pagination?.pageSize);
  //   debounce
  useDebounce(
    () => {
      pagination.setPageSize?.(pageSize);
    },
    [pageSize],
    debounceDuration
  );
  return (
    <div className="flex items-center justify-between p-4">
      <p className="text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table?.getPageCount()}
      </p>

      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          className="hidden w-8 h-8 p-0 lg:flex"
          onClick={() => {
            table.setPageIndex(0);
            pagination.setPage(1);
          }}
          disabled={!table.getCanPreviousPage() || pagination.fetching}
        >
          <ChevronsLeftIcon className="w-4 h-4 min-w-4" />
        </Button>
        <Button
          variant="secondary"
          className="w-8 h-8 p-0"
          onClick={() => {
            table.previousPage();
            pagination.setPage((prev: number) => prev - 1);
          }}
          disabled={!table?.getCanPreviousPage() || pagination?.fetching}
        >
          <ChevronLeftIcon className="w-4 h-4 min-w-4" />
        </Button>
        <Input
          type="text"
          placeholder="Size"
          value={pageSize}
          className="h-8 max-w-[80px] text-start py-0 px-3 rounded-sm border !border-neutral-50 hover:!border-neutral-200 focus:!border-neutral-200"
          onChange={(value) => {
            if (Number(value.target.value) > 0) {
              setPageSize(Number(value.target.value));
            }
          }}
        />

        <Button
          variant="secondary"
          className="w-8 h-8 p-0"
          onClick={() => {
            table.nextPage();
            pagination.setPage((prev: number) => prev + 1);
          }}
          disabled={!table?.getCanNextPage() || pagination?.fetching}
        >
          <ChevronRightIcon className="w-4 h-4 min-w-4" />
        </Button>
        <Button
          variant="secondary"
          className="hidden w-8 h-8 p-0 lg:flex"
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
            pagination.setPage(table.getPageCount());
          }}
          disabled={!table?.getCanNextPage() || pagination?.fetching}
        >
          <ChevronsRightIcon className="w-4 h-4 min-w-4" />
        </Button>
      </div>
    </div>
  );
}
