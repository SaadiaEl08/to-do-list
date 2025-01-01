import { Check } from "lucide-react";
import { useState } from "react";

const CreateCategory = () => {
  const [selectedColor, setSelectedColor] = useState(null);
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
  const [category, setCategory] = useState({});

  const handleCreateCategoryClick = () => {

  };
  return (
    <div className="flex flex-col gap-3 p-2 min-w-[80vw] ">
      <h1 className="text-xl">Create new category</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="category">Category name :</label>
        <input
          type="text"
          id="category"
          placeholder="Category name"
          className="border border-muted-foreground rounded p-3 bg-input placeholder:text-muted-foreground focus:outline-none focus:border-white"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="categoryIcon">Category icon :</label>
        <div
          className="rounded px-4 py-2 w-fit bg-slate-700"
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
              onClick={() => setSelectedColor(color.code)}
            >
              {selectedColor === color.code && (
                <Check className="text-white w-full h-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
