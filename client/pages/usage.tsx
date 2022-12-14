import Image from "next/image";
import ScrollImg from "../components/ScrollImg";
import TopBtn from "../components/TopBtn";
import { motion } from "framer-motion";

import Link from "next/link";
import { useEffect } from "react";

const Usage = () => {
  const logoAnimate = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 1 },
    },
  };

  const firstH1TextAnimate = {
    offscreen: { x: 30, opacity: 0 },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 1, delay: 0.3 },
    },
  };

  const descriptionTitleAnimate = {
    offscreen: { y: 30, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 1 },
    },
  };

  const descriptionSubAnimate = {
    offscreen: { y: 30, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 1, delay: 0.3 },
    },
  };

  // useEffect(() => {
  //   window.addEventListener("wheel", e => {
  //     const scrollPos: number = window.scrollY;
  //     const viewHeight: number = window.innerHeight;
  //     console.log(scrollPos, viewHeight);

  //     // console.log(e);
  //     const { deltaY } = e;
  //     // console.log(deltaY);

  //     if (deltaY > 0) {
  //       if (scrollPos <= viewHeight / 2) {
  //         window.scrollTo({
  //           top: document.getElementById("2page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       } else if (scrollPos <= viewHeight + viewHeight / 2) {
  //         window.scrollTo({
  //           top: document.getElementById("3page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       } else if (scrollPos <= viewHeight + viewHeight + viewHeight / 2) {
  //         window.scrollTo({
  //           top: document.getElementById("4page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       } else if (
  //         scrollPos <=
  //         viewHeight + viewHeight + viewHeight + viewHeight / 2
  //       ) {
  //         window.scrollTo({
  //           top: document.getElementById("5page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       } else if (
  //         scrollPos <=
  //         viewHeight + viewHeight + viewHeight + viewHeight + viewHeight / 2
  //       ) {
  //         window.scrollTo({
  //           top: document.getElementById("6page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       }
  //     } else {
  //       if (scrollPos <= viewHeight) {
  //         window.scrollTo({
  //           top: document.getElementById("1page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       } else if (scrollPos <= viewHeight * 2) {
  //         window.scrollTo({
  //           top: document.getElementById("2page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       } else if (scrollPos <= viewHeight * 3) {
  //         window.scrollTo({
  //           top: document.getElementById("3page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       } else if (scrollPos <= viewHeight * 4) {
  //         window.scrollTo({
  //           top: document.getElementById("4page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       } else if (scrollPos <= viewHeight * 5) {
  //         window.scrollTo({
  //           top: document.getElementById("5page")?.offsetTop,
  //           behavior: "smooth",
  //         });
  //       }
  //     }
  //   });
  // }, []);

  return (
    <>
      <ScrollImg />
      <TopBtn />
      <div className="flex-col items-center justify-center">
        <div
          id="1page"
          className="flex items-center justify-center w-full h-screen bg-cover bg-[url('/images/solid_background.png')]"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center h-fit z-10 w-full pl-5 pr-3 sm:pl-3 sm:pr-5">
            <motion.div
              className="flex items-center justify-left w-fit ml-3 mr-3 mb-2"
              variants={logoAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              <Image
                src="/images/logo export(white).svg"
                width={180}
                height={60}
              />
            </motion.div>
            <motion.div
              className="font-SCDream2 text-lg md:text-xl lg:text-2xl text-gray-100"
              variants={firstH1TextAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              ??? ???????????? ????????? ??????????????????!
            </motion.div>
          </div>
        </div>

        <div
          id="2page"
          className="flex items-center justify-center w-full h-screen bg-cover bg-[url('/images/solid_background.png')]"
        >
          <div className="flex flex-col items-center sm:items-center justify-center h-fit z-10 w-full pl-3 pr-3 md:pl-5 md:pr-5">
            <div className="relative items-center justify-center w-fit h-fit">
              <div className="flex items-center justify-left w-fit ml-3 mr-3">
                <Image
                  src="/images/???????????????.gif"
                  width={850}
                  height={450}
                  className="rounded-lg drop-shadow-lg"
                />
              </div>
              {/* <div className="absolute top-5 right-36 bottom-20 w-10 h-10 rounded-full border-4 border-orange"></div> */}
            </div>
            <motion.div
              className="font-SCDream4 text-sm md:text-base lg:text-2xl text-gray-100 mt-5"
              variants={descriptionTitleAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              ????????? ????????? +????????? ???????????? ???????????? ???????????????!
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center"
              variants={descriptionSubAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              <div className="font-SCDream1 text-xs md:text-xs lg:text-base pr-0 md:pr-1.5 text-gray-100 mt-5">
                ???????????? ????????? ??????????????? ????????? ??? ??????,
              </div>
              <div className="font-SCDream1 text-xs md:text-xs lg:text-base text-gray-100 mt-1 md:mt-5">
                ?????? ?????? ????????? ????????? ??? ?????????!
              </div>
            </motion.div>
          </div>
        </div>

        <div
          id="3page"
          className="flex items-center justify-center w-full h-screen bg-cover bg-[url('/images/solid_background.png')]"
        >
          <div className="flex flex-col items-center sm:items-center justify-center h-fit z-10 w-full pl-3 pr-3 md:pl-5 md:pr-5">
            <div className="flex items-center justify-left w-fit ml-3 mr-3">
              <Image
                src="/images/???????????? (??????, ??????).gif"
                width={850}
                height={450}
                className="rounded-lg drop-shadow-lg"

              />
            </div>
            <motion.div
              className="font-SCDream4 text-sm md:text-base lg:text-2xl text-gray-100 mt-5"
              variants={descriptionTitleAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              ???????????? ????????? ???????????? ????????? ??????????????????!
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center"
              variants={descriptionSubAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              <div className="font-SCDream1 text-xs md:text-xs lg:text-base pr-0 md:pr-1.5 text-gray-100 mt-5">
                ???????????? ???????????? ???????????? ???????????? ?????????
              </div>
              <div className="font-SCDream1 text-xs md:text-xs lg:text-base text-gray-100 mt-1 md:mt-5">
                ????????? ??? ????????????!
              </div>
            </motion.div>
          </div>
        </div>

        <div
          id="4page"
          className="flex items-center justify-center w-full h-screen bg-cover bg-[url('/images/solid_background.png')]"
        >
          <div className="flex flex-col items-center sm:items-center justify-center h-fit z-10 w-full pl-3 pr-3 md:pl-5 md:pr-5">
            <div className="flex items-center justify-left w-fit ml-3 mr-3">
              <Image
                src="/images/???????????? ??? ??????.gif"
                width={850}
                height={450}
                className="rounded-lg drop-shadow-lg"

              />
            </div>
            <motion.div
              className="font-SCDream4 text-sm md:text-base lg:text-2xl text-gray-100 mt-5"
              variants={descriptionTitleAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              ?????????????????? ???????????? ????????? ????????? ??? ????????????!
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center"
              variants={descriptionSubAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              <div className="font-SCDream1 text-xs md:text-xs lg:text-base pr-0 md:pr-1.5 text-gray-100 mt-5">
                ????????? ?????? ??? ????????? ??????????????????
              </div>
              <div className="font-SCDream1 text-xs md:text-xs lg:text-base text-gray-100 mt-1 md:mt-5">
                ??????????????? ???????????? ????????? ??? ????????????!
              </div>
            </motion.div>
          </div>
        </div>

        <div
          id="5page"
          className="flex items-center justify-center w-full h-screen bg-cover bg-[url('/images/solid_background.png')]"
        >
          <div className="flex flex-col items-center sm:items-center justify-center h-fit z-10 w-full pl-3 pr-3 md:pl-5 md:pr-5">
            <div className="flex items-center justify-left w-fit ml-3 mr-3">
              <Image
                src="/images/???????????????.gif"
                width={850}
                height={450}
                className="rounded-lg drop-shadow-lg"

              />
            </div>
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center"
              variants={descriptionTitleAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              <div className="font-SCDream4 text-sm md:text-base lg:text-2xl text-gray-100 mt-9 pr-0 md:pr-2">
                ????????? ???????????? ??????????????? ?????????
              </div>
              <div className="font-SCDream4 text-sm md:text-base lg:text-2xl text-gray-100 mt-1 md:mt-9 ">
                ????????? ??? ????????????!
              </div>
            </motion.div>
          </div>
        </div>

        <div
          id="6page"
          className="flex items-center justify-center w-full h-screen bg-cover bg-[url('/images/solid_background.png')]"
        >
          <div className="flex flex-col items-center sm:items-center justify-center h-fit z-10 w-full pl-3 pr-3 md:pl-5 md:pr-5">
            <motion.div
              className="flex flex-row items-center justify-center"
              variants={logoAnimate}
              initial={"offscreen"}
              whileInView={"onscreen"}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.5 }}
            >
              <div className="font-SCDream4 text-xl md:text-2xl lg:text-3xl text-gray-100 pr-1 md:pr-2">
                ??????
              </div>
              <div className="relative items-center justify-center w-fit h-fit">
                <div className="font-SCDream4 text-xl md:text-2xl lg:text-3xl text-gray-100">
                  ????????? ??????
                </div>
                <div className="absolute top-7 left-0 right-0 bottom-0.5 bg-mainOrange/40"></div>
              </div>
              <div className="font-SCDream4 text-xl md:text-2xl lg:text-3xl text-gray-100">
                ?????? ???????????????????
              </div>
            </motion.div>
            <div className="flex flex-row items-center mt-8 justify-left w-fit">
              <Link href="/login">
                <div className="relative items-center justify-center cursor-pointer w-fit h-7 mr-5">
                  <div className="z-10 text-sm md:text-base lg:text-xl text-gray-100 font-SCDream2">
                    ????????????
                  </div>
                  <div className="absolute top-4 md:top-5 lg:top-6 left-0 right-0 bottom-2 md:bottom-1 lg:bottom-0 bg-mainOrange/40"></div>
                </div>
              </Link>
              <Link href="/">
                <div className="relative items-center justify-center cursor-pointer w-fit h-7">
                  <div className="z-10 text-sm md:text-base lg:text-xl text-gray-100 font-SCDream2">
                    ?????????????????? ????????????
                  </div>
                  <div className="absolute top-4 md:top-5 lg:top-6 left-0 right-0 bottom-2 md:bottom-1 lg:bottom-0 bg-mainOrange/40"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usage;
