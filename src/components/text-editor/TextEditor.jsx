import { Editor } from "react-draft-wysiwyg";

const TextEditor = ({ text, handleChange }) => {
  return (
    <Editor
      editorState={text}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={handleChange}
    />
  );
};

export default TextEditor;
