'use client';

import { FC, useRef, useState } from 'react';
import TextField from './TextField';
import Typography from './Typography';
import classNames from 'classnames';
import { useClickOutside } from '@/hooks/click-outside';

interface SelectProps {
  defaultValue: string;
  items: any[];
  itemTitle?: string;
  itemValue?: string;
  returnObject?: boolean;
  required?: boolean;
  errorMessage?: string;
  register?: any;
  onChange?: (item: any) => void;
}

const Select: FC<SelectProps> = ({
  defaultValue,
  items,
  itemTitle,
  itemValue,
  returnObject,
  required,
  errorMessage,
  register,
  onChange
}) => {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const getItemValue = (item: any) => {
    return itemValue ? item[itemValue] : item.value;
  };

  const getItemTitle = (item: any) => {
    return itemTitle ? item[itemTitle] : item.title;
  };

  const onSelectItem = async (item: any) => {
    setMenuIsActive(false);

    const returnValue = returnObject ? item : getItemValue(item);
    onChange?.(returnValue);
  };

  useClickOutside(selectRef, () => setMenuIsActive(false));

  return (
    <div
      ref={selectRef}
      className={classNames('select relative', { active: menuIsActive })}
    >
      <TextField
        defaultValue={defaultValue}
        label="Category"
        placeholder="Select Category"
        appendIcon="chevron-down"
        readOnly
        required={required}
        register={register}
        errorMessage={errorMessage}
        onInputClick={() => setMenuIsActive(!menuIsActive)}
      />
      {menuIsActive ? (
        <div className="select-menu theme-bg">
          {items.map((item: any, index: number) => (
            <div
              key={`${getItemValue(item)}-${index}`}
              className="menu_item"
              onClick={() => onSelectItem(item)}
            >
              <Typography variant="caption">{getItemTitle(item)}</Typography>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
