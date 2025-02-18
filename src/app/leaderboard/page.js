'use client'
import Image from "next/image";
import '../../../styles/leaderboard.css';
import { franklinGothic } from "../../../styles/fonts";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';

export default function LeaderBoard() {
    const rankerData = [
        { name: "Cd*****n", n2o: '5.6B' },
        { name: "hk***k", n2o: '5.1B' },
        { name: "Le***n", n2o: '4.5B' },
        { name: "jq**r", n2o: '4.0B' },
        { name: "Ra**93", n2o: '3.7B' },
        { name: "LU*******ox", n2o: '3.65B' }
    ]
    const [n2o, setN2O] = useState(0);
    const [teleId, setTeleId] = useState('unknown');
    const [rank, setRank] = useState(0);


    useEffect(() => {
        // 초기 n2o 값 불러오기
        const storedN2O = localStorage.getItem("n2o");
        
        if (storedN2O !== null) {
            setN2O(Number(storedN2O));
        }
    }, []);

    //랭킹 순위
    useEffect(() => {
        const randomRank = Math.floor(Math.random() * (98000 - 95000 + 1)) + 95000;
        
        setRank(randomRank);
        
    }, [n2o]);

    useEffect(() => {
        const checkTelegramSDK = () => {
            if (typeof window !== 'undefined' && window.Telegram) {
                const user = window.Telegram.WebApp.initDataUnsafe;
                if (user) {
                    console.log('Telegram User:', user);
                    if(user.user) {
                        setTeleId(user.user.first_name);
                    }else {
                        setTeleId('--')
                        setN2O(0)
                    }
                }
            } else {
                setTimeout(checkTelegramSDK, 1000); // 1초 후 다시 확인
            }
        };

        checkTelegramSDK(); // 초기 실행
    }, []);
    console.log('its id!', teleId);
    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] pt-1 relative flex flex-col justify-evenly items-center bg-cover bg-no-repeat " >
                    <div className="w-full h-[15%] bg-no-repeat bg-cover absolute top-0 " style={{ backgroundImage: `url(/image/side_bg.png)` }}></div>
                    <div className="w-[65vmax] sm:w-[52vmin] rotate-[-18deg] aspect-[431/129] bg-no-repeat flex justify-start absolute top-[43%] " style={{ backgroundImage: `url(/image/thunder.png)` }}></div>
                    <div className={` w-[32vmax] max-w-[500px] aspect-[260/42] relative ${franklinGothic.variable} font-franklin`}>
                        {/* <Image
                        src="/image/leaderboard_title.png"
                        alt="main logo"
                        layout="fill"
                        objectFit="cover"
                    /> */}
                        <p className="w-full text-center text-[5vmax] sm:text-[6vmin] -rotate-2
        bg-gradient-to-r from-[#F92F2F] via-[#FEA5A5] to-[#EB1515] bg-clip-text text-transparent [-webkit-text-stroke:1px_black] ">Leaderboard</p>
                    </div>
                    <div className=" w-full flex flex-col items-center py-[3vmin] ">
                        <div className="w-[79vmin] sm:w-[23vmax] aspect-[317/70] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/rankdesign_my.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                            <p className=" absolute left-1/3 -translate-x-1/2 top-1/2 -translate-y-1/2 text-black text-[6vmin] sm:text-[2.5vmin]">{teleId === undefined ? '--' : teleId}</p>
                            <p className=" absolute right-2 top-1/2 -translate-y-1/2 text-black text-[5vmin] sm:text-[2.5vmin]">{rank}</p>
                            <p className=" absolute bottom-2 right-1/3 translate-x-1/2 text-black text-[5vmin] sm:text-[1.8vmin]">{n2o >= 1000000 ? `${n2o / 1000000}m` : n2o >= 1000 ? `${n2o / 1000}k` : n2o}</p>
                        </div>
                    </div>
                    <p className=" text-white text-[12vmin] sm:text-[5vmin] z-10 [-webkit-text-stroke:1.3px_black]">145.1k Holders</p>
                    <div className=" scroll-container w-full flex flex-col items-center max-h-[250px] sm:max-h-[500px] overflow-scroll overflow-x-hidden ">
                        {rankerData.map((ranker, index) => (
                            <div key={ranker.name} className="w-[79vmin] sm:w-[23vmax] aspect-[317/70] relative active:scale-90 transition-transform duration-200">
                                <Image
                                    src="/image/rankdesign_ranker.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                                <p className=" absolute left-1/3 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white text-[4.2vmin] sm:text-[2.3vmin]">{ranker.name.length > 6 ? `${ranker.name.slice(0, 5)}···` : ranker.name}</p>
                                <p className=" absolute right-2 top-1/2 -translate-y-1/2 text-[#ED9D6B] text-[5vmin] sm:text-[2.3vmin]">{`00${index + 1}`}</p>
                                <p className=" absolute bottom-2 right-1/3 translate-x-1/2 text-white text-[4vmin] sm:text-[1.6vmin]">{ranker.n2o}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
