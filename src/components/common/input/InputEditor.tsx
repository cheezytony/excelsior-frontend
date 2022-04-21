import dynamic from 'next/dynamic';
import { useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw, EditorState, RawDraftContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export interface InputEditorAttributes {
  id?: string;
  max?: number;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onEditorStateChange?: (value: RawDraftContentState) => void;
}

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const InputEditor = ({
  placeholder,
  value,
  onChange,
  onEditorStateChange,
}: InputEditorAttributes) => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const contentBlock = htmlToDraft(value || '');
    if (!contentBlock) return null;
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    return EditorState.createWithContent(contentState);
  });

  const handleStateChange = (state: EditorState) => {
    const rawState = convertToRaw(state.getCurrentContent());
    onEditorStateChange?.(rawState);
    onChange?.(draftToHtml(rawState));
    setEditorState(state);
  };

  return (
    <>
      <Editor
        wrapperClassName="input-editor-wrapper"
        editorClassName="input-editor-content prose max-w-full"
        toolbarClassName="input-editor-toolbar"
        placeholder={placeholder}
        handlePastedText={() => false}
        editorState={editorState}
        toolbar={{
          options: ['inline', 'blockType', 'list', 'image'],
          blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
          },
          image: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: undefined,
            previewImage: false,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
          },
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
        }}
        onEditorStateChange={handleStateChange}
      />
    </>
  );
};

// export const InputEditor: React.FC<InputEditorAttributes> = ({
//   id,
//   max,
//   placeholder,
//   value = '',
//   onChange,
// }: InputEditorAttributes) => {
//   const [currentValue, setCurrentValue] = useState<string>(value);
//   useEffect(() => setCurrentValue(value), [value]);

//   return (
//     <div className="duration-300 flex flex-col gap-4 min-h-[20rem] px-4 py-4 ring-2 ring-blue-100 rounded w-full focus-within:bg-gray-50 focus-within:ring-transparent">
//       <div className="flex gap-2 items-center">
//         <Button className="bg-gray-100 text-gray-500" variant="icon" size="md">
//           B
//         </Button>
//         <Button className="bg-gray-100 text-gray-500" variant="icon" size="md">
//           S
//         </Button>
//         <Button className="bg-gray-100 text-gray-500" variant="icon" size="md">
//           U
//         </Button>
//       </div>
//       <textarea
//         {...{ id, maxLength: max, placeholder, value: currentValue }}
//         className="bg-transparent flex-grow outline-none resize-none text-xl w-full focus:placeholder:opacity-0"
//         onChange={({ target: { value } }) => {
//           setCurrentValue(value);
//           onChange?.(value);
//         }}
//       />
//       {max && (
//         <div className="flex items-center">
//           <div
//             className={`font-semibold ml-auto text-sm ${
//               currentValue.length === max ? 'text-red-400' : 'text-gray-400'
//             }`}
//           >
//             {currentValue.length}/{max}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export default InputEditor;
