import { useTranslation } from 'react-i18next';

import { ISelectOption } from '../interfaces';
import { SelectComponent } from './ui';

interface IPageSizeSwitcherProps {
  onChange: (option: number) => void;
  value: number;
}

export const PageSizeSwitcher = ({
  onChange,
  value,
}: IPageSizeSwitcherProps) => {
  const { t } = useTranslation();

  const selectOptions: ISelectOption[] = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
  ];

  return (
    <div className='flex gap-2 items-center text-secondary dark:text-whiteDark'>
      <div>{t('show')}</div>
      <SelectComponent
        className='w-20'
        required={false}
        onChange={onChange}
        selectOptions={selectOptions}
        value={value}
      />
    </div>
  );
};
