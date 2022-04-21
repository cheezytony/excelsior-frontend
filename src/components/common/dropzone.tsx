import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from './button';
import { IconClose, IconDocument, IconFolder, IconLink } from './icons';

interface DropzoneAttributes {
  accept?: string | Array<string>;
  multiple?: boolean;
  title?: string;
  value?: Array<File>;
  onChange?: (value: Array<File>) => void;
}

export const Dropzone = ({ accept, multiple, title, value, onChange }: DropzoneAttributes) => {
  const [files, setFiles] = useState<Array<File>>(value || []);
  const inputRef = useRef<HTMLInputElement>(null);
  const acceptedTypes = useMemo<string | undefined>(
    () => (typeof accept === 'string' ? accept : accept?.join(', ')),
    [accept]
  );
  const openFileBrowser: VoidFunction = () => inputRef.current.click();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFiles(Array.from(event.target.files));
    onChange?.(Array.from(event.target.files));
  };
  const removeFile = (index: number) => {
    const f = [...files];
    f.splice(index, 1);
    setFiles(f);
    Array.from(f);
  };
  useEffect(() => setFiles(value || []), [value]);

  return (
    <div className="bg-gray-50 flex flex-col h-[20rem] relative rounded">
      <input
        accept={acceptedTypes}
        className="hidden"
        ref={inputRef}
        multiple={multiple}
        type="file"
        onChange={handleChange}
      />
      {title && (
        <div className="absolute inset-6 font-semibold pointer-events-none text-gray-500">
          {title}
        </div>
      )}
      {files.length ? (
        <div className="grid grid-cols-2 gap-4 pb-6 pt-16 px-6 w-full">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-white border flex gap-3 items-center px-4 py-4 rounded"
            >
              <span className="text-blue-300">
                <IconDocument height={28} width={28} />
              </span>
              <span>{file.name}</span>
              <span className="font-medium ml-auto text-gray-400 text-sm">
                {file.type}
              </span>
              <button
                type="button"
                className="text-red-300"
                onClick={() => removeFile(index)}
              >
                <IconClose />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-5 m-auto">
            <Button
              className="gap-1"
              colorScheme="gray"
              size="sm"
              onClick={openFileBrowser}
            >
              <IconFolder height={22} width={22} />
              <span>Select File</span>
            </Button>
            <Button className="gap-1" colorScheme="blue" size="sm">
              <IconLink height={22} width={22} />
              <span>Enter Link</span>
            </Button>
          </div>
          {acceptedTypes && (
            <div className="absolute bottom-4 font-medium left-6 pointer-events-none text-gray-500 text-xs">
              Supported file types:{' '}
              <em className="font-semibold not-italic">
                {acceptedTypes.toUpperCase()}
              </em>
            </div>
          )}
        </>
      )}
    </div>
  );
};
