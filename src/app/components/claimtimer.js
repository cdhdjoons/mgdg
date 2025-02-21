"use client";

import Link from "next/link";
import Image from "next/image";
import { Libre_Caslon_Text } from "next/font/google"
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';

const libreCaslon = Libre_Caslon_Text({
    subsets: ["latin"],
    weight: ["400", "700"], // Regular (400) & Bold (700)
    display: "swap",
});

export default function ClaimTimer() {
    const TIMER_DURATION = 21600; // 6 hours in seconds

    const [time, setTime] = useState(TIMER_DURATION); // 10초 타이머
    const [onClaim, setOnClaim] = useState(true);
    const [n2o, setN2O] = useState(0);
    const timerRef = useRef(null);
    const hasFinished = useRef(false);



    useEffect(() => {
        // localStorage에서 시작 시간 불러오기
        const storedStartTime = localStorage.getItem("timerStartTime");
        const lastCompletionTime = localStorage.getItem("lastCompletionTime");//timer 만료 후 체크위한 값

        if (storedStartTime) {
            const elapsedTime = Math.floor((Date.now() - Number(storedStartTime)) / 1000);
            const remainingTime = Math.max(TIMER_DURATION - elapsedTime, 0);

            if (remainingTime > 0) {
                setTime(remainingTime);
                setOnClaim(false);
                startInterval(remainingTime);
            } else {
                // Timer has finished while away
                if (!lastCompletionTime || lastCompletionTime !== storedStartTime) {
                    // Only increment N2O if we haven't recorded this completion
                    handleN2O();
                    localStorage.setItem("lastCompletionTime", storedStartTime);
                }
                localStorage.removeItem("timerStartTime");
                setOnClaim(true);
            }
        }

        // 초기 n2o 값 불러오기
        const storedN2O = localStorage.getItem("n2o");
        if (storedN2O) {
            setN2O(Number(storedN2O));
        }

        // Cleanup interval on unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startInterval = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setOnClaim(true);
                    const currentStartTime = localStorage.getItem("timerStartTime");
                    localStorage.setItem("lastCompletionTime", currentStartTime);
                    localStorage.removeItem("timerStartTime");
                    if (!hasFinished.current) {
                        handleN2O();
                        hasFinished.current = true;
                    }
                    return 0; // Return 0 instead of 10
                }
                return prev - 1;
            });
        }, 1000);
    };

    const startTimer = () => {
        setOnClaim(false);
        setTime(TIMER_DURATION);
        hasFinished.current = false;
        localStorage.setItem("timerStartTime", Date.now().toString());
        startInterval();
    };

    const handleN2O = () => {
        const currentN2O = localStorage.getItem("n2o");
        const newN2O = (Number(currentN2O) || 0) + 2000; // 🔥 기존 값에 1000 더함
        localStorage.setItem("n2o", newN2O); // 🔥 업데이트된 값 저장
        setN2O(newN2O); // 🔥 상태 업데이트

    };



    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


    // 프로그레스 바 너비 계산 (0% ~ 100%)

    const progressWidth = onClaim ? '0%' : `${((TIMER_DURATION - time) / TIMER_DURATION) * 100}%`;


    return (
        <AnimatePresence mode="wait">
            <motion.div className=" flex flex-col h-full justify-evenly items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="w-full flex justify-center items-center relative">
                    <div className="w-[28vmax] max-w-[450px] aspect-[285/285] relative">
                        <Image
                            src="/image/balancebtn.png"
                            alt="main logo"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                        <p className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[2.8vmax] sm:text-[2.2vmax]
             [-webkit-text-stroke:1px_black] ${libreCaslon.className} font-bold mt-1 `}>{n2o >= 1000000 ? `${n2o / 1000000}m` : n2o >= 1000 ? `${n2o / 1000}k` : n2o}</p>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center relative">
                    <div className="w-[78%] sm:w-[80%] aspect-[510/105] relative flex justify-start">
                        <div className=" absolute w-full aspect-[510/105]  ">
                            <Image
                                src="/image/farmmanabar.png"
                                alt="mana bar"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <p className=" absolute top-1/3 -translate-y-1/2 right-[5%] text-white text-[1.5vmax] sm:text-[1vmax] [-webkit-text-stroke:0.2px_black]">{formatTime(time)}</p>
                        {onClaim ? <p onClick={startTimer} className=" absolute top-[70%] -translate-y-1/2 right-[5%] text-[#DD9300] text-[1.5vmax] sm:text-[1vmax] [-webkit-text-stroke:0.2px_black]
                        active:scale-90 transition-transform duration-200">Claim now</p>
                            :
                            <p onClick={startTimer} className=" absolute top-[70%] -translate-y-1/2 right-[5%] text-[#646464] text-[1.5vmax] sm:text-[1vmax] [-webkit-text-stroke:0.2px_black]
                        active:scale-90 transition-transform duration-200">Claim now</p>}
                        <div className=" h-full w-[68%] relative flex flex-col justify-evenly py-[2%] items-end  ">
                            <p className=" w-[65%] text-center text-[#FFA15C] text-[3.2vmin] sm:text-[1.5vmin] [-webkit-text-stroke:0.3px_black]">Farming 2000 MANA</p>
                            <div className="w-[65%] h-[35%] border border-[#EB9F15] relative ">
                                <div className="w-full bg-[#DD9300] h-full absolute left-0" style={{ width: progressWidth }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <Link href="/balance" className="w-[85%] sm:w-[85%] aspect-[530/145] flex justify-center items-center relative active:scale-90 transition-transform duration-200">
                    <p className=" ml-[10%] text-[#F9BC2F] text-[4vmin] sm:text-[1.8vmin] z-10">Now Get More Magic Water!!</p>
                    <Image
                        src="/image/getmanaIcon.png"
                        alt="main logo"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </Link>
            </motion.div>
        </AnimatePresence>
    );
};

