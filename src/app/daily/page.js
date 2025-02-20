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
    //invite 버튼 5번 클릭 시 포인트 지급 및 비활성화 관리
    const [inviteCount, setInviteCount] = useState(0);


    useEffect(() => {
        // localStorage에서 task 버튼 상태 불러오기
        const storedState = localStorage.getItem("DisabledTask");
        // localStorage에서 daily 시간 가져오기 및 비교
        const lastUpdateDaily = localStorage.getItem("last_update_day1"); //daily
        const lastUpdateRetweet = localStorage.getItem("last_update_day2"); //retweet
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식
        // 현재 시간 표시
        const nowHours = new Date().getHours();
        //invite 카운트 가져오기
        const savedCount = localStorage.getItem("clickCount");

        setRemainHours(24 - nowHours);

        setDisabledDaily([
            lastUpdateDaily !== today,
            lastUpdateRetweet === today ? false : true
        ]);

        if (storedState) {
            setDisabledTask(JSON.parse(storedState));
        }

        if (savedCount) {
            setInviteCount(Number(savedCount));
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
        if (index === 1 && inviteCount < 4) {
            setInviteCount((prev) => prev + 1);
        } else {
            const nowN2O = Number(localStorage.getItem("n2o"));
            setDisabledTask((prev) => {
                const newState = [...prev];
                newState[index] = false; // 클릭된 버튼 비활성화
                localStorage.setItem("DisabledTask", JSON.stringify(newState)); // localStorage에 저장
                return newState;
            });
            localStorage.setItem("n2o", nowN2O + reward);
        }
    };
    //invite카운트 변화 있을때만 로컬에 저장
    useEffect(() => {
        localStorage.setItem("clickCount", inviteCount);
    }, [inviteCount])

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
                        <div className="absolute bottom-0 w-[38vmax] max-w-[450px] aspect-[480/75]">
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
                                <p className="absolute bottom-[5%] right-[5%] text-[2.5vmax] sm:text-[1.5vmin] text-[#D0D0D0] font-bold">{inviteCount}/5</p>
                            </div>
                            :
                            <div className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/taskinvite_off.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <p className="absolute bottom-[5%] right-[5%] text-[2.5vmax] sm:text-[1.5vmin] text-[#D0D0D0] font-bold">5/5</p>
                            </div>
                        }
                        <div className="absolute bottom-0 w-[38vmax] max-w-[450px] aspect-[480/75]">
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
