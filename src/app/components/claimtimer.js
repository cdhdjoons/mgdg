"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';

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

    const startInterval = (initialTime) => {
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
        startInterval(TIMER_DURATION);
    };

    const handleN2O = () => {
        const currentN2O = localStorage.getItem("n2o");
        const newN2O = (Number(currentN2O) || 0) + 1000; // 🔥 기존 값에 1000 더함
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
            <motion.div className=" flex flex-col gap-[3vmax]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >

                <div className="w-full flex justify-center items-center relative">
                    <div className="w-[30vmax] max-w-[272px] aspect-[272/47] relative">
                        <div className=" absolute w-[30%] -top-1/2 translate-y-[8%] -left-1/4 translate-x-1/2 aspect-[65/68] z-20 ">
                            <Image
                                src="/image/n2o_Icon.png"
                                alt="main logo"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <div className=" aspect-[272/47] absolute left-0 h-full bg-cover bg-no-repeat w-full opacity-55 transition-all duration-1000 z-10  "
                            style={{
                                width: progressWidth,
                                backgroundImage: `url(/image/orangeBar.png)`
                            }}>

                        </div>
                        <Image
                            src="/image/progressBar.png"
                            alt="main logo"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                        <p className=" absolute top-[-20px] right-0 text-white text-[2.2vmax] sm:text-[1.3vmax] [-webkit-text-stroke:1.5px_black]">{formatTime(time)}</p>
                        <p className=" z-50 absolute w-full text-center top-1/2 -translate-y-1/2 text-white text-[1.8vmax] sm:text-[1.5vmin] [-webkit-text-stroke:1px_black]">Farming 1000 N2O</p>

                    </div>
                </div>
                <div className="w-full flex justify-center items-center relative">

                    <div className="w-[28vmax] max-w-[235px] aspect-[235/235] relative">
                        <Image
                            src="/image/balancebtn.png"
                            alt="main logo"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                        <p className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[3.5vmax] sm:text-[2.2vmax]
             [-webkit-text-stroke:2px_black]">{n2o >= 1000000 ? `${n2o / 1000000}m` : n2o >= 1000 ? `${n2o / 1000}k` : n2o}</p>
                    </div>

                </div>
                {onClaim ? <div className="w-full pl-[15%] aspect-[344/60] flex justify-center items-center relative">
                    <div className=" w-[32vmax] sm:w-[25vmax] aspect-[299/59] relative ">
                        <Link href="/balance">
                            <Image
                                src="/image/ontickets.png"
                                alt="main logo"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </Link>
                    </div>
                    <div onClick={() => startTimer(10)} className=" w-[8vmax] sm:w-[6vmax] aspect-[101/84] relative right-[15%] ">
                        <Image
                            src="/image/claimenable.png"
                            alt="main logo"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>

                </div> : <div className="w-full pl-[15%] aspect-[344/60] flex justify-center items-center relative ">
                    <div className=" w-[32vmax] sm:w-[25vmax] aspect-[299/59] relative ">
                        <Link href="/balance">
                            <Image
                                src="/image/offtickets.png"
                                alt="main logo"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </Link>
                    </div>
                    <div className=" w-[8vmax] sm:w-[6vmax] aspect-[101/84] relative right-[15%] ">
                        <Image
                            src="/image/claimdisable.png"
                            alt="main logo"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>}

            </motion.div>
        </AnimatePresence>
    );
};

