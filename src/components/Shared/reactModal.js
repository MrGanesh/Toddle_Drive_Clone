import React, { useState } from "react";
import Modal from "react-modal";
import "./modalStyles.css";
import closeIcon from "../../assets/close.png";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
function afterOpenModal() {
  // references are now sync'd and can be accessed.
}

export const ReactModal = ({
  showModal,
  closeModal,
  checkName,
  error,
  addData,
  inputFieldVal,
  isEditItem,
  editData
}) => {
  const [isFolder, setIsFolder] = useState(true);
  return (
    <Modal
      isOpen={showModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modalContainer">
        <img
          src={closeIcon}
          alt="close"
          onClick={closeModal}
          height="20"
          width="20"
          className="closeIcon"
        />
        <p className="title">{isEditItem ? "Edit Item" : "Create New"}</p>
        {!isEditItem && (
          <div className="itemTyeDiv">
            <span
              className={`${isFolder ? "activeBtn" : "inactiveBtn"}`}
              onClick={() => setIsFolder(true)}
            >
              Folder
            </span>
            <span
              className={`${!isFolder ? "activeBtn" : "inactiveBtn"}`}
              onClick={() => setIsFolder(false)}
            >
              File
            </span>
          </div>
        )}

        <input
          type="text"
          className="inputField"
          onChange={(e) => {
            e.stopPropagation();
            checkName(e);
          }}
          value={inputFieldVal}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              isEditItem ? editData(isFolder) : addData(isFolder);
            }
          }}
        />
        <span className="error">{error}</span>
        {isEditItem ? (
          <button className="createBtn" onClick={() => editData(isFolder)}>
            Edit Item
          </button>
        ) : (
          <button className="createBtn" onClick={() => addData(isFolder)}>
            Create
          </button>
        )}
      </div>
    </Modal>
  );
};
