import { BsArrowRight } from "react-icons/bs";

import { Link } from "react-router-dom";
import GridItemForGallery from "./GridItemForGallery";

const data = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/865773/pexels-photo-865773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Women tops",
    animStyle: "fade-right",
    animDuration: "800",
    animDelay: "250",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/837306/pexels-photo-837306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Women shirts",
    animStyle: "fade-right",
    animDuration: "800",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Men shirts",
    animStyle: "fade-down",
    animDuration: "800",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/859265/pexels-photo-859265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Men pants",
    animStyle: "fade-down",
    animDuration: "800",
    animDelay: "250",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/997512/pexels-photo-997512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Women pants",
    animStyle: "fade-up",
    animDuration: "800",
    animDelay: "500",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Men shirts",
    animStyle: "fade-up",
    animDuration: "800",
    animDelay: "250",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Women skirts",
    animStyle: "fade-up",
    animDuration: "800",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Men shoes",
    animStyle: "fade-left",
    animDuration: "800",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Women shoes",
    animStyle: "fade-left",
    animDuration: "800",
    animDelay: "250",
  },
  {
    id: 10,
    src: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Men jackets",
    animStyle: "fade-left",
    animDuration: "800",
    animDelay: "500",
  },
];

const Gallery = () => {
  return (
    <div className="wrapper image-container my-20 overflow-x-hidden">
      <div className="text-center mb-10 flex flex-col gap-5">
        <span className="font-medium tracking-widest">{`LET'S SEE`}</span>

        <Link
          to="/contact"
          className="self-center font-medium tracking-widest flex gap-2 items-center group"
        >
          <span className="group-hover:translate-x-5 duration-300">
            <BsArrowRight />
          </span>
        </Link>
      </div>

      <div className="grid-container">
        {data.map((item) => (
          <GridItemForGallery key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
