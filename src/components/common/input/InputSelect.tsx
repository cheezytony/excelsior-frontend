import { Combobox } from '@headlessui/react';
import { useMemo, useState } from 'react';
import { getTheme, InputAttributes } from '../input';

export interface InputSelectAttributes {
  options?: Array<string>;
  variant?: InputAttributes['variant'];
}

export const InputSelect: React.FC<InputSelectAttributes> = ({
  options = [],
  variant = 'outline',
}: InputSelectAttributes) => {
  const theme = useMemo(() => getTheme(variant, 'px-6 py-4'), [variant]);
  const [selected, setSelected] = useState<string>(null);
  return (
    <Combobox value={selected} onChange={setSelected}>
      <div>
        <Combobox.Button className={`${theme} flex items-center text-left h-[50px] w-full`}>
          {selected}
        </Combobox.Button>
        <Combobox.Options>
          {options.map((option, index) => (
            <Combobox.Option key={index} value={index}>
              {index}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
};
