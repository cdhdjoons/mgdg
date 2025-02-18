'use client'

import Image from "next/image";
import Link from "next/link";
import { franklinGothic } from "../../../styles/fonts";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";

export default function DailyTask() {
    //task list 버튼 관리
    const [disabledTask, setDisabledTask] = useState([true, true, true, true]);
    //daily reward 관리
    const [disabledDaily, setDisabledDaily] = useState([true, true]);


    useEffect(() => {
        // localStorage에서 task 버튼 상태 불러오기
        const storedState = localStorage.getItem("DisabledTask");
        // localStorage에서 daily 시간 가져오기 및 비교
        const lastUpdateDaily = localStorage.getItem("last_update_day1"); //daily
        const lastUpdateRetweet = localStorage.getItem("last_update_day2"); //retweet
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식

        setDisabledDaily(prev => [
            lastUpdateDaily === today ? false : true,
            lastUpdateRetweet === today ? false : true
        ]);

        if (storedState) {
            setDisabledTask(JSON.parse(storedState));
        }
    }, []);

    //daily 클릭 시 상태 업데이트 
    const dailyHandleClick = (index, reward) => {
        const nowN2O = Number(localStorage.getItem("n2o"));
        setDisabledDaily(prev => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
        localStorage.setItem(`last_update_day${index + 1}`, new Date().toISOString().split("T")[0]); // 클릭한 날짜 저장
        localStorage.setItem("n2o", nowN2O + reward);
    }

    // task list 버튼 클릭 시 상태 업데이트 및 저장
    const handleClick = (index, reward) => {
        const newState = [...disabledTask];
        const nowN2O = Number(localStorage.getItem("n2o"));
        newState[index] = false; // 클릭된 버튼 비활성화
        setDisabledTask(newState);
        localStorage.setItem("DisabledTask", JSON.stringify(newState)); // localStorage에 저장
        localStorage.setItem("n2o", nowN2O + reward);
    };

    //task list 링크 
    const links = ['https://x.com/Fnfs_Official', '#', 'https://t.me/fnfs_official', '/invite']

    return (
        <AnimatePresence mode="wait">
            <motion.div className={`${franklinGothic.variable} font-franklin w-full h-full`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-evenly items-center bg-cover bg-no-repeat " >
                    <div className="w-full h-[15%] bg-cover bg-no-repeat flex justify-center absolute top-0 " style={{ backgroundImage: `url(/image/side_bg.png)` }}></div>
                    <div className={` w-[30vmax] max-w-[500px] relative `} >
                        <p className="w-full text-center text-[5vmax] sm:text-[4vmin] -rotate-2
        bg-gradient-to-r from-[#F92F2F] via-[#FEA5A5] to-[#EB1515] bg-clip-text text-transparent [-webkit-text-stroke:1px_black] ">Daily Task</p>
                    </div>
                    <div className=" w-full flex flex-col items-start gap-[5vmin]">
                        {disabledDaily[0] ? <div onClick={() => dailyHandleClick(0, 100)} className="w-[78vmin] sm:w-[22vmax] aspect-[518/105] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/dailyreward1.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div> :
                            <div className="w-[78vmin] sm:w-[22vmax] aspect-[518/105] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/dailyreward1_off.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>}
                        {disabledDaily[1] ? <a href="https://x.com/Fnfs_Official" target="_blank" rel="noopener noreferrer">
                            <div onClick={() => dailyHandleClick(1, 1000)} className="w-[80vmin] sm:w-[22vmax] aspect-[520/105] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/dailyreward2.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </a> :
                            <div className="w-[80vmin] sm:w-[22vmax] aspect-[520/105] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/dailyreward2_off.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        }
                    </div>
                    <div className="w-[30vmax] max-w-[500px] relative ">
                        <p className="w-full text-center text-[5vmax] sm:text-[4vmin] -rotate-2
        bg-gradient-to-r from-[#2F80F9] via-[#A5D3FE] to-[#1527EB] bg-clip-text text-transparent [-webkit-text-stroke:1px_black] ">Task List</p>
                    </div>
                    <div className=" w-full flex flex-col items-start gap-[5vmin]">
                        {[...Array(4)].map((_, index) => (
                            disabledTask[index] ? (
                                links[index] !== "#" ? (  // 2번째 버튼은 <a> 태그 없이 렌더링
                                    index !== 3 ? (
                                        <a key={index} href={links[index]} target="_blank" rel="noopener noreferrer">
                                            <div
                                                onClick={() => handleClick(index, 1000)}
                                                className="w-[79vmin] sm:w-[23vmax] aspect-[520/108] relative active:scale-90 transition-transform duration-200"
                                            >
                                                <Image
                                                    src={`/image/follow${index + 1}.png`}
                                                    alt={`button ${index + 1}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                        </a>
                                    ) : (
                                        <Link key={index} href={links[index]}>
                                            <div
                                                onClick={() => handleClick(index, 5000)}
                                                className="w-[79vmin] sm:w-[23vmax] aspect-[520/108] relative active:scale-90 transition-transform duration-200"
                                            >
                                                <Image
                                                    src={`/image/follow${index + 1}.png`}
                                                    alt={`button ${index + 1}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                        </Link>
                                    )
                                ) : (
                                    <div
                                        key={index}
                                        onClick={(e) => e.preventDefault()} // 클릭해도 아무 동작 안 함
                                        className="w-[79vmin] sm:w-[23vmax] aspect-[520/108] relative active:scale-90 transition-transform duration-200"
                                    >
                                        <Image
                                            src={`/image/follow${index + 1}.png`}
                                            alt={`button ${index + 1}`}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                )
                            ) : (
                                <div
                                    key={index}
                                    className="w-[79vmin] sm:w-[23vmax] aspect-[520/108] relative active:scale-90 transition-transform duration-200"
                                >
                                    <Image
                                        src={`/image/usedfollow${index + 1}.png`}
                                        alt={`disabled button ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
