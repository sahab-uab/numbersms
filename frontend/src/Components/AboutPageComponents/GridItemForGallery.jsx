import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const GridItemForGallery = ({ item }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className={`item${item.id} overflow-hidden`}
      data-aos={item.animStyle}
      data-aos-duration={item.animDuration}
      data-aos-delay={item.animDelay}
    >
      <img
        src={item.src}
        width={50}
        height={50}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default GridItemForGallery;
