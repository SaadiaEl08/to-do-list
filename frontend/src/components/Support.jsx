import { X } from "lucide-react";

const Support = ({ close }) => {
  const social = [
    {
      name: "portfolio",
      icon: "/myImage.png",
      link: "https://saadia-el-achguir.vercel.app/",
    },
    {
      name: "github",
      icon: "https://img.icons8.com/?size=100&id=12599&format=png&color=000000",
      link: "https://github.com/SaadiaEl08",
    },
  ];

  return (
    <div className="flex flex-col items-start gap-2 w-full p-6 ">
      <header className="w-full flex justify-between items-center p-2">
        <h3 className="text-2xl mb-3">Support Us</h3>
        <X
          className="hover:cursor-pointer hover:text-red-600"
          onClick={() => close()}
        />
      </header>

      {/* Main Content Section */}
      <main className="w-full ">
        <p className="text-foreground text-lg mb-3">
          This is a non-profit app. It is only for learning purposes and a
          showcase of my skills.
        </p>
        <p className="text-foreground text-lg mb-6">
          You can know more about me by visiting the links below:
        </p>

        {/* Social Links Section */}
        <section className="flex flex-col gap-4 ">
          {social.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4 hover:scale-105 transition-transform"
            >
              <a href={item.link} target="_blank" rel="noreferrer">
                <img
                  src={item.icon}
                  alt={item.name}
                  title={"Click me to visit my " + item.name}
                  className="w-12 h-12 rounded-full border-2 border-primary transition-all duration-200 hover:opacity-80"
                />
              </a>
              <span className="text-lg font-medium text-foreground capitalize">{item.name}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Support;
