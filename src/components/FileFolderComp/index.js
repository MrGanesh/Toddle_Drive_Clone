import { useState } from "react";
import driveDataDB from "../../fileDB/FileFolderList";
import FileFolderItem from "./fileFolderItem";
import "./styles.css";
import { ReactModal } from "../Shared/reactModal";
import addNewBtn from "../../assets/add_new_button.png";
import arrow from "../../assets/arrow_up.png";

export default function FileFolderComp() {
  const [driveData, setDriveData] = useState(driveDataDB);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [inputFieldVal, setInputFieldVal] = useState("");
  const [curSelectedId, setCurSelectedId] = useState(driveDataDB.id);
  const [breadCrumbStack, setBreadCrumbStack] = useState(["global"]);
  const [isEditItem, setIsEditItem] = useState(false);
  const [editName, setEditName] = useState("");
  //validating already folder/file entry present or not
  const checkName = (e) => {
    let isNameExist = false;
    setInputFieldVal(e.target.value);
    //globally avoid duplicate code

    // const iterate = (array) => {
    //   for (let item in array) {
    //     if (array[item].name === e.target.value) {
    //       isNameExist = true;
    //       return;
    //     }
    //     if (array[item].fileList.length > 0) {
    //       iterate(array[item].fileList);
    //     }
    //   }
    // }
    // iterate(driveDataDB.fileList);
    driveData.fileList.forEach((item) => {
      if (item.name === e.target.value) {
        item.isVisible = true;
        isNameExist = true;
        return;
      }
    });
    if (isNameExist) {
      setError("File/Folder name already exist");
    } else {
      setError("");
    }
  };

  //adding new entry to DB
  const addData = (isFolder) => {
    console.log("called", curSelectedId);
    if (error !== "") {
      return;
    }

    let dummyObj = {
      id: new Date().getTime().toString(),
      name: inputFieldVal,
      isFolder: isFolder,
      fileList: [],
      isVisible: true
    };
    let tempArr = {};
    const iterate = (array) => {
      for (let item in array) {
        if (array[item].id === curSelectedId) {
          array[item].fileList.push(dummyObj);
          setDriveData({ fileList: array[item].fileList });
          setInputFieldVal("");
          setShowModal(!setShowModal);
        }
        if (array[item].fileList.length > 0) {
          iterate(array[item].fileList);
        }
        tempArr[item] = array[item];
      }
    };
    if (curSelectedId === "1") {
      console.log({ curSelectedId });
      driveDataDB.fileList.push(dummyObj);
      setDriveData(driveDataDB);
      setInputFieldVal("");
      setShowModal(!setShowModal);
    } else {
      console.log("called");
      iterate(driveDataDB.fileList);
    }
  };

  //on folder click functionality
  const onFolderClick = (id, name = "") => {
    let tempBreadCrumbArr = [...breadCrumbStack];

    if (!tempBreadCrumbArr.includes(name)) {
      tempBreadCrumbArr.push(name);
      setBreadCrumbStack(tempBreadCrumbArr);
    }
    setCurSelectedId(id);
    let dummyObj = {};
    for (let item in driveData.fileList) {
      if (
        driveData.fileList[item].id === id &&
        driveData.fileList[item].isFolder === true
      ) {
        dummyObj.fileList = [...driveData.fileList[item].fileList];
      }
    }
    setDriveData(dummyObj);
  };

  const navigateByName = (name, popByOne) => {
    let newBreadCrumbData = [...breadCrumbStack];
    if (newBreadCrumbData.length === 1) {
      return;
    }
    let i = newBreadCrumbData.length - 1;
    if (popByOne) {
      newBreadCrumbData.pop();
      name = newBreadCrumbData[newBreadCrumbData.length - 1];
    } else {
      newBreadCrumbData.splice(newBreadCrumbData.indexOf(name) + 1, i);
    }
    setBreadCrumbStack(newBreadCrumbData);
    let tempArr = {};
    if (name === "global") {
      setDriveData(driveDataDB);
      setCurSelectedId(driveDataDB.id);
    }
    const iterate = (array) => {
      for (let item in array) {
        if (array[item].name === name) {
          setDriveData({ fileList: array[item].fileList });
          setCurSelectedId(array[item].id);
        }
        if (array[item].fileList.length > 0) {
          iterate(array[item].fileList);
        }
        tempArr[item] = array[item];
      }
    };
    iterate(driveDataDB.fileList);
  };

  //edit modal opening
  const onEditItem = (name) => {
    setEditName(name);
    setShowModal(!showModal);
    setIsEditItem(!isEditItem);
  };

  //edit callback
  const editData = (isFolder) => {
    if (error !== "") {
      return;
    }
    let tempArr = {};
    const iterate = (array) => {
      for (let item in array) {
        if (array[item].name === editName) {
          array[item].name = inputFieldVal;
          setInputFieldVal("");
          setShowModal(!setShowModal);
          setIsEditItem(!isEditItem);
        }
        if (array[item].fileList.length > 0) {
          iterate(array[item].fileList);
        }
        tempArr[item] = array[item];
      }
    };
    iterate(driveDataDB.fileList);
  };

  //delete functionality
  const onDeleteData = (id) => {
    // setCurSelectedId(id);
    let deletedItemName = "";
    let confirm = window.confirm("Are you sure, want to delete?");
    if (!confirm) {
      return;
    }
    let tempArr = {};
    const iterate = (array) => {
      for (let item in array) {
        if (array[item].id === id) {
          deletedItemName = array[item].name;
          array.splice(item, 1);
          setDriveData({ fileList: [...array] });
          return;
        }
        if (array[item]?.fileList.length > 0) {
          iterate(array[item].fileList);
        }
        tempArr[item] = array[item];
      }
    };
    iterate(driveDataDB.fileList);
    if (breadCrumbStack.includes(deletedItemName)) {
      let dummyBreadCrumbData = breadCrumbStack.filter(
        (item) => item.name !== deletedItemName
      );
      setBreadCrumbStack(dummyBreadCrumbData);
    }
  };

  return (
    <div className="parentContainer">
      <div className="breadCrumb">
        {breadCrumbStack && breadCrumbStack.length > 0 && (
          <div className="breadCrumbContainer">
            <img
              src={arrow}
              alt="arrow"
              height="20"
              width="20"
              onClick={() => navigateByName("global", "popByOne")}
            />

            {breadCrumbStack.map((item) => {
              return (
                <p onClick={() => navigateByName(item)}>
                  {item} {" / "}
                </p>
              );
            })}
          </div>
        )}
      </div>
      <div className="container">
        {driveData && driveData?.fileList?.length > 0 ? (
          <>
            {driveData?.fileList.map((item, index) => {
              return (
                <FileFolderItem
                  item={item}
                  onFolderClick={(id, name) => onFolderClick(id, name)}
                  curSelectedId={curSelectedId}
                  onEditItem={(name) => onEditItem(name)}
                  onDeleteData={(id) => onDeleteData(id)}
                />
              );
            })}
          </>
        ) : (
          <div className="notFound">No files/folders found!</div>
        )}
        <img
          src={addNewBtn}
          alt="add_new_button"
          onClick={() => {
            setShowModal(!showModal);
          }}
          className="addNewBtn"
        />
        {showModal && (
          <ReactModal
            showModal={showModal}
            closeModal={() => setShowModal(!showModal)}
            checkName={(e) => checkName(e)}
            error={error}
            inputFieldVal={inputFieldVal}
            addData={(isFolder) => addData(isFolder)}
            isEditItem={isEditItem}
            editData={(isFolder) => editData(isFolder)}
          />
        )}
      </div>
    </div>
  );
}
