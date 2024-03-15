import { ReactNode, useState } from "react";
import { format, parse } from "date-fns";
import BottomSheet from "../ui/bottom-sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FilterIcon } from "lucide-react";
import SelectInput from "../ui/select-input";
import DatePicker from "../ui/date-picker";
import { DATE_FORMAT } from "@/shared/constants/constants";

interface TableFiltersProps {
  title?: ReactNode;
  search?: {
    key: string;
    placeholder?: string;
    value: string;
  }[];
  dateFilters?: {
    key: string;
    value: string[];
  }[];
  selectInputfilters?: {
    key: string;
    placeholder: string;
    value: string | string[];
    options: ValueLabel[];
    isMulti?: boolean;
  }[];
  defaultFilters?: Filter[];
  onFiltersSubmit?: (filters: Filter[]) => void;
}

const TableFilters = ({
  search,
  title,
  defaultFilters,
  selectInputfilters,
  dateFilters,
  onFiltersSubmit,
}: TableFiltersProps) => {
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState<Filter[]>(defaultFilters || []);

  return (
    <>
      {filters?.find((filter) => filter?.value?.[0]?.length) && (
        <button
          className="text-red-500 text-xs"
          onClick={() => {
            setFilters([]);
            onFiltersSubmit?.([]);
          }}
        >
          Clear FIlters
        </button>
      )}
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => setOpenFilters(!openFilters)}
      >
        <FilterIcon
          size={15}
          className={
            filters?.find((filter) => filter?.value?.[0]?.length)
              ? "text-primary"
              : ""
          }
        />
      </Button>
      <BottomSheet
        open={openFilters}
        close={() => setOpenFilters(false)}
        title={title || "Filter Table"}
      >
        <div className="min-h-60 space-y-5 px-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {search?.length
              ? search.map((search) => (
                  <Input
                    key={search.key}
                    placeholder={search.placeholder}
                    value={
                      filters.find((filter) => filter?.key === search.key)
                        ?.value?.[0] || ""
                    }
                    onChange={(e) =>
                      setFilters((filters) => {
                        let filtersCopy = [...filters];
                        const filterIndex = filtersCopy.findIndex(
                          (filter) => filter?.key === search.key
                        );
                        if (filterIndex >= 0) {
                          filtersCopy[filterIndex] = {
                            ...filtersCopy[filterIndex],
                            value: [e.target.value],
                          };
                        } else {
                          filtersCopy = [
                            ...filtersCopy,
                            { key: search.key, value: [e.target.value] },
                          ];
                        }
                        return [...filtersCopy];
                      })
                    }
                  />
                ))
              : null}
            {selectInputfilters?.length
              ? selectInputfilters.map((filter) => (
                  <SelectInput
                    key={filter?.key}
                    options={filter.options}
                    isMulti={filter?.isMulti}
                    placeholder={`Filter ${filter?.key}`}
                    onChange={(e) => {
                      setFilters((filters) => {
                        let filtersCopy = [...filters];
                        const filterIndex = filtersCopy.findIndex(
                          (item) => item?.key === filter.key
                        );
                        if (filterIndex >= 0) {
                          filtersCopy[filterIndex] = {
                            ...filtersCopy[filterIndex],
                            value: [
                              ...e.map(
                                (value: { value: string }) => value.value
                              ),
                            ],
                          };
                        } else {
                          filtersCopy = [
                            ...filtersCopy,
                            {
                              key: filter.key,
                              value: [
                                ...e.map(
                                  (value: { value: string }) => value.value
                                ),
                              ],
                            },
                          ];
                        }
                        return [...filtersCopy];
                      });
                    }}
                    value={
                      filters
                        .find((item) => item?.key === filter?.key)
                        ?.value?.map((value) => {
                          const item = filter?.options?.find(
                            (option) => option?.value === value
                          );
                          if (item)
                            return {
                              ...item,
                            };
                          else {
                            return {
                              value: "",
                              label: "",
                            };
                          }
                        }) || []
                    }
                  />
                ))
              : null}
            {dateFilters?.length
              ? dateFilters.map((filter) => {
                  const value = filters.find(
                    (item) => item?.key === filter?.key
                  )?.value;

                  return (
                    <DatePicker
                      key={filter?.key}
                      onChange={(date) => {
                        setFilters((filters) => {
                          let filtersCopy = [...filters];
                          const filterIndex = filtersCopy.findIndex(
                            (item) => item?.key === filter.key
                          );
                          let value: string[] = [];
                          if (date?.from) {
                            value = [format(date?.from, DATE_FORMAT)];
                          }
                          if (date?.to) {
                            value = [...value, format(date?.to, DATE_FORMAT)];
                          }
                          if (filterIndex >= 0) {
                            filtersCopy[filterIndex] = {
                              ...filtersCopy[filterIndex],
                              value,
                            };
                          } else {
                            filtersCopy = [
                              ...filtersCopy,
                              {
                                key: filter.key,
                                value,
                              },
                            ];
                          }
                          return [...filtersCopy];
                        });
                      }}
                      value={{
                        ...(value?.[0]
                          ? {
                              from: parse(value?.[0], DATE_FORMAT, new Date()),
                            }
                          : { from: undefined }),
                        ...(value?.[1]
                          ? {
                              to: parse(value?.[1], DATE_FORMAT, new Date()),
                            }
                          : {}),
                      }}
                    />
                  );
                })
              : null}
          </div>
          <div className="text-right space-x-4">
            {filters?.find((filter) => filter?.value?.[0]?.length) && (
              <button
                className="text-red-500 text-xs"
                onClick={() => {
                  setFilters([]);
                }}
              >
                Clear FIlters
              </button>
            )}
            <Button onClick={() => setOpenFilters(false)} variant={"outline"}>
              Close
            </Button>
            <Button
              onClick={() => {
                onFiltersSubmit?.(filters);
                setOpenFilters(false);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default TableFilters;
