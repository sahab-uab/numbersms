import { motion } from "framer-motion";
import { ArrowRight, Globe2, Target, User } from "lucide-react";

import { FaCreativeCommonsShare } from "react-icons/fa";
import ReviewCard from "../Components/HomePageComponents/ReviewCard";

const HomePage = () => {
  const data = [
    {
      id: 1,
      title: "Quality scores",
      icon: <FaCreativeCommonsShare />,
      description:
        "Keep your strategic goals and planning in one place to improve  employee engagement.",
    },
    {
      id: 2,
      title: "Software support",
      icon: <FaCreativeCommonsShare />,
      description:
        "Keep your strategic goals and planning in one place to improve  employee engagement.",
    },
    {
      id: 1,
      title: "Quality scores",
      icon: <FaCreativeCommonsShare />,
      description:
        "Keep your strategic goals and planning in one place to improve  employee engagement.",
    },
  ];

  return (
    <div className={""}>
      <div className="relative background min-h-screen flex items-center justify-center">
        <div className="wrapper px-6 py-16 text-center md:py-32 ">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className=" "
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Don’t want to give out your phone number?{" "}
              <span className={"text-[#824DEB]"}>No Problem.</span> Use Ours.
            </h1>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white"
            >
              Protect your privacy and stay secure with our verified US mobile
              numbers, compatible with all platforms.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-[#824DEB] hover:bg-white text-white hover:text-[#824DEB] px-8 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition`}
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        <div className="absolute -bottom-32  lg:-bottom-44 h-56 md:h-96 lg:h-[30rem]">
          <img
            src="../../../webapp-mockup-2.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* 2nd section */}
      <div className="container mx-auto  mt-80 px-3">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-4xl font-semibold">
            A powerful <span className="text-[#824DEB]">easy-to-use</span>{" "}
            platform
          </h2>
          <p className="text-center">
            Discover the core pillars of our platform – quality Scores, <br />{" "}
            expert software support, and tailored management assistance.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5  my-14">
          {data.map((data) => (
            <div key={data.id} className="w-96 flex flex-col gap-2">
              <div className="flex">
                <span className="text-4xl text-[#824DEB]">{data.icon}</span>
              </div>

              <div className="mb-10">
                <h2 className="text-black text-2xl font-medium ">
                  {data.title}
                </h2>
                <p className="text-black font-light ">{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 3rd section */}
      <div className="background px-2 ">
        <div className="wrapper py-10">
          <div className="flex h-96 gap-10">
            <div className="">
              <img
                src="https://sierra.keydesign.xyz/web-app/wp-content/uploads/sites/4/2023/09/webapp-2.png"
                alt=""
              />
            </div>
            <div className="">
              <img
                src="https://sierra.keydesign.xyz/web-app/wp-content/uploads/sites/4/2023/09/webapp-1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/* 4th section */}

      <div className="bg-[#0A0226] md:mt-40 lg:mt-96">
        <div className="wrapper flex flex-col items-center justify-center gap-10 py-10">
          <h2 className="text-4xl font-semibold text-white text-center">
            Our <span className="text-[#824DEB]">step-by-step</span> approach
          </h2>
          <p className="text-white text-base lg:text-lg font-light text-center">
            With concepts in hand, we meticulously design, <br /> refining every
            detail to align with your vision and objectives.
          </p>

          <div className="bg-[#1B1435] p-10">
            <div className="flex gap-10 flex-wrap">
              <div className="text-white w-80 flex flex-col gap-5">
                <h2 className="text-3xl font-semibold">Pick a Service</h2>
                <p className="">
                  Go through each of your options, taking note of which check
                  the boxes of your needs.
                </p>
              </div>
              <div className="text-white w-80 flex flex-col gap-5">
                <h2 className="text-3xl font-semibold">Get Number</h2>
                <p className="">
                  Identify areas for improvement using our detailed insights.
                  Refine your content with ease.
                </p>
              </div>
              <div className="text-white w-80 flex flex-col gap-5">
                <h2 className="text-3xl font-semibold">Get Code</h2>
                <p className="">
                  Our real-time updates and alerts keep you informed. Watch your
                  ecommerce venture thrive.
                </p>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="bg-[#1B1435] p-10">
            <div className="flex gap-10">
              <div></div>
              <div>
                <div>
                  <img
                    src="https://sierra.keydesign.xyz/web-app/wp-content/uploads/sites/4/2023/09/web-app-clients.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-[#F5F5FF] py-20">
        <div className="wrapper">
          <div className=" flex flex-col items-center justify-center gap-10">
            <h2 className="text-4xl font-semibold text-center">
              We love <span className="text-[#793AEA]">our users</span> and they
              love us
            </h2>
            <p className="font-light text-center text-lg">
              The best way to showcase our commitment is through the <br />{" "}
              experiences and stories of those who have partnered with us.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
