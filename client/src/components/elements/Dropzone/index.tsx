import React, { useState, useRef, DragEvent } from "react";
import Icon from "../Icon";
import { DropzoneInput, DropzoneMessage, DropzoneWrapper } from "./styles";

interface DropzoneProps {
  fileCallback: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ fileCallback }) => {
  const [dropzoneActive, setDropzoneActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    setDropzoneActive(true);
    e.preventDefault();
  };

  const dragEnter = (e: DragEvent<HTMLDivElement>) => {
    setDropzoneActive(true);
    e.preventDefault();
  };

  const dragLeave = (e: DragEvent<HTMLDivElement>) => {
    setDropzoneActive(false);
    e.preventDefault();
  };

  const fileDrop = (e: DragEvent<HTMLDivElement>) => {
    setDropzoneActive(false);
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current?.files) {
      handleFile(fileInputRef.current.files[0]);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (file: File) => {
    fileCallback(file);
  };

  return (
    <DropzoneWrapper
      active={dropzoneActive}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
      onClick={fileInputClicked}
    >
      <DropzoneMessage>
        <DropzoneInput
          type="file"
          ref={fileInputRef}
          onChange={filesSelected}
        />
        <Icon name="Camera" size={50} color="#ff596d" />
        Add a cover photo
      </DropzoneMessage>
    </DropzoneWrapper>
  );
};

export default Dropzone;
