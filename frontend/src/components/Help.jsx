import { X } from "lucide-react";

const Help = ({ close }) => {
  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
    },
  ];

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {/* Header Section */}
      <header className="w-full flex justify-between items-center p-2">
        <h3 className="text-2xl ">Help & Feedback</h3>
        <X
          className="hover:cursor-pointer hover:text-red-600 "
          onClick={() => close()}
        />
      </header>

      {/* Form Section */}
      <div className="w-full flex flex-col gap-4 items-start">
        <h3>Let us know how we can help you 😊</h3>
        <div className="w-full grid gap-5">
          {formFields.map((field, index) => (
            <div key={index} className="relative">
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  id={field.name}
                  placeholder=" "
                  className="w-full p-2 pt-4 bg-transparent border rounded outline-none peer focus:border-primary ps-4 h-32 resize-none"
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  placeholder="placeholder"
                  className="w-full p-2 bg-transparent border  rounded outline-none peer focus:border-primary ps-4 placeholder:text-transparent "
                />
              )}

              <label
                htmlFor={field.name}
                className="absolute bg-popover left-4 -top-4  px-2 
                  transform transition-all duration-200
                  peer-placeholder-shown:top-2 
                  peer-placeholder-shown:text-gray-500 
                  peer-focus:-top-4 peer-focus:text-primary
                  peer:not(:placeholder-shown):-top-3 peer:not(:placeholder-shown):text-sm
                  "
              >
                {field.label}
              </label>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end">
          <button className="text-foreground h-12 px-5 bg-primary rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
