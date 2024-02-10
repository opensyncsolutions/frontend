import clsx from 'clsx'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const controlStyles = {
  base: 'border border-border rounded-lg bg-background hover:cursor-pointer hover:bg-secondary !min-h-[40px]',
  focus: 'border-border ring-ring ring-primary-500',
  nonFocus: 'border-border',
}
const placeholderStyles = 'text-muted-foreground text-sm ml-1'
const selectInputStyles = 'text-foreground text-sm ml-1'
const valueContainerStyles = 'text-foreground text-sm'
const singleValueStyles = 'ml-1'
const multiValueStyles =
  'ml-1 bg-background border border-border rounded items-center py-0.5 pl-2 pr-1 gap-1.5'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md bg-background'
const indicatorsContainerStyles = 'p-1 gap-1 bg-background rounded-lg'
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md hover:text-red-800'
const indicatorSeparatorStyles = 'bg-mutated'
const dropdownIndicatorStyles = 'p-1 hover:text-foreground text-gray-500'
const menuStyles =
  'mt-2 p-2 border border-border bg-background text-sm rounded-lg'
const optionsStyle =
  'bg-background p-2 border-0 text-base hover:bg-secondary hover:cursor-pointer'
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm bg-background'
const noOptionsMessageStyles = 'text-muted-foreground bg-background'

type SelectComponentProps = {
  options: any[]
  value?: { value: string; label: string }[] | string
  defaultValue?: string[] | string
  onChange?: (value: any) => void
  isMulti?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  placeholder?: string
}

const SelectInput = ({
  options,
  value,
  onChange,
  isMulti,
  isDisabled,
  isLoading,
  placeholder,
  defaultValue,
  ...props
}: SelectComponentProps) => {
  const animatedComponents = makeAnimated()
  return (
    <>
      <Select
        unstyled
        isSearchable
        value={value}
        defaultValue={value}
        isDisabled={isDisabled}
        isMulti={isMulti}
        placeholder={placeholder}
        components={animatedComponents}
        options={options}
        closeMenuOnSelect={false}
        noOptionsMessage={() => 'No options found!!'}
        onChange={onChange}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          option: () => optionsStyle,
          menu: () => menuStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          groupHeading: () => groupHeadingStyles,
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        {...props}
      />
    </>
  )
}

export default SelectInput
