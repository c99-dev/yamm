import Slider from "react-slick";

const settings = {
    dots: true,
    className: "min-w-[150px] max-w-[300px] min-h-[150px] max-h-[300px] bg-yellow1",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 1,
    speed: 500
  };

  const TodayEatFoodNull = ({ images }) => {
  return (
    <div>
      <div className="font-bold px-8 pt-6 pb-2 text-xl">
          <p>오늘 먹은 음식</p>
      </div>
      <div className="px-8 flex justify-center">
        <Slider {...settings} >
          <div className= "min-w-[150px] max-w-[300px] min-h-[150px] max-h-[300px] px-2 rounded-3xl items-center text-center m-auto">
              사진을 추가해주세요
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default TodayEatFoodNull;
