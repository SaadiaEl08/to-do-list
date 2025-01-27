import ActionBar from "./ActionBar";
import PopOver from "./PopOver";
import CameraCapture from "./CameraCapture";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ChangeAccountImage = ({ setChangeAccount }) => {
  const [chosenOption, setChosenOption] = useState(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const handleSetImage = () => {
    localStorage.setItem(
      "accountInfo",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("accountInfo")),
        image: image,
      })
    );
    dispatch({ type: "SET_ACCOUNT_INFO", payload: { image: image } });
    setChangeAccount(null);
  };

  const importFromGallery = () => {};
  const takePicture = () => {
    setChosenOption("camera");
  };
  const importFromGoogleDrive = () => {};
  const list = [
    {
      key: "camera",
      title: "Tack picture",
      onClick: takePicture,
    },
    {
      key: "gallery",
      title: "Import from gallery",
      onClick: importFromGallery,
    },
    {
      key: "drive",
      title: "Import from Google Drive",
      onClick: importFromGoogleDrive,
    },
  ];
  return (
    <PopOver isOpen={true} toggle={() => setChangeAccount(null)}>
      <div className="flex flex-col items-center gap-4 p-4 w-[80vw]">
        <h3>Change account name</h3>
        <div className="w-full border "></div>
        <div className="w-full flex flex-col gap-4  sm:flex-row">
          <div className="w-full flex flex-col gap-4  sm:w-1/2 ">
            {list.map((item) => (
              <div
                className={`flex items-center gap-2  hover:bg-slate-600 cursor-pointer p-3 ${
                  chosenOption === item.key ? "bg-slate-600" : ""
                } `}
                key={item.key}
                onClick={item.onClick}
              >
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          {chosenOption === "camera" && (
            <div id="cameraCapture" className="w-full">
              <CameraCapture image={image} setImage={setImage} />
            </div>
          )}
        </div>

        <ActionBar
          cancelActionFunction={() => setChangeAccount(null)}
          nextActionFunction={handleSetImage}
          disableNext={image === null}
        />
      </div>
    </PopOver>
  );
};

export default ChangeAccountImage;
