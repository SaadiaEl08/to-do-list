import { Check } from "lucide-react";
import { useRef, useState } from "react";
import ActionBar from "./ActionBar";

const CreateCategory = () => {
  const colors = [
    { code: "#FF5733", name: "Vibrant Orange" },
    { code: "#33FF57", name: "Bright Green" },
    { code: "#3357FF", name: "Deep Blue" },
    { code: "#FFC300", name: "Golden Yellow" },
    { code: "#C70039", name: "Crimson Red" },
    { code: "#900C3F", name: "Burgundy" },
    { code: "#DAF7A6", name: "Light Green" },
    { code: "#581845", name: "Purple" },
    { code: "#1F618D", name: "Steel Blue" },
    { code: "#F39C12", name: "Saffron" },
    { code: "#7D3C98", name: "Amethyst" },
    { code: "#16A085", name: "Teal" },
  ];
  const pictureView = useRef();
  const [category, setCategory] = useState({ name: "", color: "", icon: "" });

  const handleCreateCategoryClick = () => {};

  const handleUploadedIcon = (e) => {
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageElement = document.createElement("img");
      imageElement.src = reader.result;
      imageElement.alt = "Uploaded icon";
      imageElement.classList = "w-6 h-6 rounded ";
      pictureView.current.innerHTML = "";
      pictureView.current.classList.add("w-10", "h-10");
      pictureView.current.appendChild(imageElement);
    };
    reader.readAsDataURL(file);
    setCategory({ ...category, icon: file });
  };
  return (
    <div className="flex flex-col gap-3 p-2 min-w-[80vw] sm:min-w-[50vw] ">
      <h1 className="text-xl">Create new category</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="category">Category name :</label>
        <input
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
          type="text"
          id="category"
          placeholder="Category name"
          className="border border-muted-foreground rounded p-3 bg-input placeholder:text-muted-foreground focus:outline-none focus:border-white"
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="categoryIcon">Category icon :</label>
        <div
          ref={pictureView}
          className="rounded px-4 py-2 w-fit bg-slate-500  flex items-center justify-center cursor-pointer"
          title="upload icon"
          onClick={() => document.getElementById("categoryIcon").click()}
        >
          Choose icon from library
        </div>
        <input
          type="file"
          accept="image/*"
          id="categoryIcon"
          placeholder="Choose icon from library"
          className="hidden"
          onChange={handleUploadedIcon}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="categoryColor">Category color :</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color.code}
              className="w-8 h-8 rounded-full border  flex item-center justify-center cursor-pointer"
              style={{ backgroundColor: color.code }}
              title={color.name}
              onClick={() =>
                category.color !== color.code
                  ? setCategory({ ...category, color: color.code })
                  : setCategory({ ...category, color: "" })
              }
            >
              {category.color === color.code && (
                <Check className="text-white w-full h-full" />
              )}
            </div>
          ))}
        </div>
      </div>
      <ActionBar
        nextClassName={`${
          category.name && category.color 
            ? "opacity-100 cursor-pointer pointer-events-auto"
            : "opacity-50 cursor-not-allowed pointer-events-none"
        }`}
      />
    </div>
  );
};

export default CreateCategory;
