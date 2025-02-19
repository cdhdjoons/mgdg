'use client'

import Image from "next/image";
import Link from "next/link";
import { franklinGothic } from "../../../styles/fonts";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";

export default function DailyTask() {
    //task list 버튼 관리
    const [disabledTask, setDisabledTask] = useState([true, true]);
    //daily reward 관리
    const [disabledDaily, setDisabledDaily] = useState([true, true]);
    //1/24 표시 관리
    const [remainHours, setRemainHours] = useState(null);


    useEffect(() => {
        // localStorage에서 task 버튼 상태 불러오기
        const storedState = localStorage.getItem("DisabledTask");
        // localStorage에서 daily 시간 가져오기 및 비교
        const lastUpdateDaily = localStorage.getItem("last_update_day1"); //daily
        const lastUpdateRetweet = localStorage.getItem("last_update_day2"); //retweet
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식
        // 현재 시간만 표시
        const nowTime = new Date();
        const nowHours = nowTime.getHours();
        // 현재 시간 표시
        setRemainHours(24 - nowHours);

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
    const links = ['https://x.com/Fnfs_Official', '/invite']

    return (
        <AnimatePresence mode="wait">
            <motion.div className={` w-full h-full bg-balanceBg`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-evenly items-center bg-cover bg-no-repeat " >
                    <div className={` max-w-[500px] relative `} >
                        <p className="w-full text-center text-[7vmax] sm:text-[6vmin] -rotate-2
        bg-gradient-to-r from-[#F9BC2F] via-[#FED9A5] to-[#EB9F15] bg-clip-text text-transparent [-webkit-text-stroke:0.6px_black] ">Mystic Task</p>
                    </div>
                    <div className=" w-full flex flex-col items-center relative ">
                        <div className=" w-[36vmax] sm:w-[22vmax] aspect-[480/125] relative">
                            <Image
                                src="/image/taskinfo.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                            <p className="absolute top-[18%] left-[8%] text-[2.6vmax] text-[#D0D0D0] font-bold">DAILY TASK</p>
                            <p className="absolute bottom-[5%] right-[8%] text-[2vmax] text-[#D0D0D0] font-bold">{remainHours}/24h</p>
                        </div>
                        {disabledDaily[0] ? <div onClick={() => dailyHandleClick(0, 100)} className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/dailyreward1.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div> :
                            <div className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/dailyreward1_off.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>}
                        {disabledDaily[1] ?
                            <div onClick={() => dailyHandleClick(1, 1000)} className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/dailyreward2.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            :
                            <div className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/dailyreward2_off.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        }
                        <div className="absolute bottom-0 w-[38vmax] aspect-[480/75]">
                            <Image
                                src="/image/taskpartition.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>

                    <div className=" w-full flex flex-col items-center relative">
                        <div className=" w-[36vmax] sm:w-[22vmax] aspect-[480/125] relative">
                            <Image
                                src="/image/taskinfo2.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                            <p className="absolute top-[18%] left-[8%] text-[2.6vmax] text-[#D0D0D0] font-bold">OPTION TASK</p>

                        </div>
                        {disabledTask[0] ? <div onClick={() => handleClick(0, 1000)} className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/taskx.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div> :
                            <div className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/taskx_off.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>}
                        {disabledTask[1] ?
                            <div onClick={() => handleClick(1, 5000)} className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/taskinvite.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            :
                            <div className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/taskinvite_off.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        }
                        <div className="absolute bottom-0 w-[38vmax] aspect-[480/75]">
                            <Image
                                src="/image/taskpartition.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
