import Slider from "react-slick";
import { assets } from "../assets/assets";

const Header = () => {
  const headers = [
    {
      title: "Book Appointment With Trusted Doctors",
      description:
        "Book appointments with top doctors instantly. Experience seamless healthcare management with our advanced appointment system.",
      bgColor: "bg-blue-600",
    },
    {
      title: "Quality Healthcare, Anytime",
      description:
        "Our platform helps you connect with certified specialists for quick and reliable care.",
      bgColor: "bg-green-600",
    },
    {
      title: "Your Health, Our Priority",
      description:
        "From booking to follow-up, manage your health needs with ease and confidence.",
      bgColor: "bg-purple-600",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <Slider {...settings}>
        {headers.map((header, index) => (
          <div
            key={index}
            className={`flex relative flex-col md:flex-row items-center justify-between ${header.bgColor} px-6 md:px-10 lg:px-20 pt-10 md:py-20`}
          >
            {/* Left Side (Text) */}
            <div className="w-full md:w-1/2 items-center justify-center md:items-start md:justify-start flex flex-col gap-6 text-left z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                {header.title}
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
                <img className="w-28" src={assets.group_profiles} alt="" />
                <p className="text-white/90 text-sm md:text-base max-w-md">
                  {header.description}
                </p>
              </div>
              <a
                href="#speciality"
                className="flex items-center  justify-center gap-2 bg-white px-8 py-3 rounded-full text-gray-700 text-sm w-fit hover:scale-105 transition-all duration-300"
              >
                Book appointment
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* Right Side (Image) */}
            <div className="w-full md:hidden block md:w-1/2  justify-center mt-8 md:mt-0">
              <img
                src={assets.header_img}
                alt="Healthcare"
                className="w-full  rounded-lg"
              />
            </div>

            <div className="w-full md:block hidden absolute  bottom-0 right-0  md:w-1/2  justify-center mt-8 md:mt-0">
              <img
                src={assets.header_img}
                alt="Healthcare"
                className="w-full max-w-lg rounded-lg"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Header;
