import { X } from "lucide-react";

const About = ({ close }) => {
  return (
    <div className="flex flex-col items-start gap-2  w-full">
      <div className="w-full flex justify-between items-center p-2  ">
        <h3 className="text-2xl ">
          About <span className="text-primary font-bold">U</span>p
          <span className="text-primary font-bold">T</span>odo
        </h3>{" "}  
        <X
          className="hover:cursor-pointer hover:text-red-600"
          onClick={() => close()}
        />
      </div>

      <p className="rounded-md bg-textBackground p-2 w-full">
        <span className="text-primary font-bold">U</span>p
        <span className="text-primary font-bold">T</span>odo is a productivity
        tool designed to help you organize tasks, achieve your goals, and manage
        projects efficiently. <br /> This app serves as a showcase of my
        expertise in React, Laravel, and various libraries like Tailwind CSS,
        MUI, and Framer Motion.
      </p>
      <p className="rounded-md bg-textBackground p-2 w-full">
        The app's design, created by{" "}
        <a
          href="https://amirbaghestani.com/"
          target="_blank"
          className="text-primary"
        >
          @Amir Baghestani
        </a>
        , which focuses on simplicity and user-friendliness. I discovered the
        design on the web and was inspired by its attractive, well-thought-out
        layout.
      </p>
      <p className="rounded-md bg-textBackground p-2 w-full">
        Using this design as inspiration, I aimed to create a sleek and
        intuitive application that reflects modern design principles while
        highlighting my development skills.
      </p>
    </div>
  );
};

export default About;
