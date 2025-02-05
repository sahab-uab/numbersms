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
];

const Gallery = () => {
  return (
    <div className="wrapper image-container  overflow-x-hidden">
      <div className="grid-container">
        {data.map((item) => (
          <GridItemForGallery key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
