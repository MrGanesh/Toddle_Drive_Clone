import { useState } from "react";
import "./styles.css";
import folder from "../../assets/folder.png";
import file from "../../assets/file.png";
import edit from "../../assets/edit.png";
import deleteImg from "../../assets/delete.png";

export default function FileFolderItem({
  item,
  onFolderClick,
  curSelectedId,
  onEditItem,
  onDeleteData
}) {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div className="itemContainer">
        {item?.isFolder ? (
          <img
            src={folder}
            alt=""
            width="60"
            height="60"
            onClick={(e) => {
              setExpand(!expand);
              onFolderClick(item.id, item.name);
            }}
            className="folder"
          />
        ) : (
          <img src={file} width="60" height="60" alt="file" />
        )}
        <p>{item?.name}</p>
        <div className="editAndDelete">
          <img
            src={edit}
            height="15"
            width="15"
            alt="edit"
            onClick={() => onEditItem(item.name)}
          />
          <img
            src={deleteImg}
            height="15"
            width="15"
            alt="delete"
            onClick={() => onDeleteData(item.id)}
          />
        </div>
      </div>
    </>
  );
}
