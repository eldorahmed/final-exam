import { hero } from "../..";

const Hero = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center lg:flex-row">
      <h1 className="text-7xl font-bold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </h1>
      <img className="w-[50%]" src={hero} alt="" />
    </div>
  );
};

export default Hero;
