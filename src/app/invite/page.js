'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { franklinGothic } from "../../../styles/fonts";
import { AnimatePresence, motion } from 'framer-motion';
import Alert from '@mui/material/Alert';


export default function Invite() {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        const link = "https://yourlink.com"; // 복사할 링크

        // 클립보드에 링크를 복사
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // 2초 후 복사 메시지 초기화
        }).catch((err) => {
            console.error('클립보드 복사 실패:', err);
        });
    };
    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] pt-3 relative flex flex-col justify-evenly items-center bg-cover bg-no-repeat " >
                    <div className="w-full h-[15%] bg-no-repeat bg-cover absolute top-0 " style={{ backgroundImage: `url(/image/side_bg.png)` }}></div>
                    {copied ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Copy Complete.</Alert></div> : ''}
                    <div className={`w-[32vmax] max-w-[500px] relative ${franklinGothic.variable} font-franklin`}>
                        
                        <p className="w-full text-center text-[5vmax] sm:text-[6vmin] -rotate-2
        bg-gradient-to-r from-[#F92F2F] via-[#FEA5A5] to-[#EB1515] bg-clip-text text-transparent [-webkit-text-stroke:1px_black] ">Invite friends</p>
                    </div>
                    <p className={` ${franklinGothic.variable} font-franklin text-white text-[3.3vmin] sm:text-[1.5vmin]`}>Invite friends, complete and earn more</p>
                    <p className=" text-white text-[6vmin] sm:text-[3vmin]">How it works</p>
                    <div className="w-[65vmin] sm:w-[30vmin] aspect-[325/337] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/invite_car.png"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="flex flex-col gap-0 items-center">
                        <p className=" text-white text-[4vmin] sm:text-[3vmin]">Share your invitation link</p>
                        <p className=" text-white text-[3.3vmin] sm:text-[2.2vmin]">Get a play pass for each friends</p>
                    </div>
                    <div className="flex flex-col gap-0 items-center">
                        <p className=" text-white text-[4vmin] sm:text-[3vmin]">Your friends join YBDBD</p>
                        <p className=" text-white text-[3.3vmin] sm:text-[2.2vmin]">Get a play pass for each friends</p>
                    </div>
                    <p className=" text-white text-[5vmin] sm:text-[3.3vmin]">1 friends / 2000 N2O</p>
                    <div onClick={handleCopyClick} className="w-[34vmax] sm:w-[30vmin] aspect-[266/44] relative active:scale-90 transition-transform duration-100 ">
                        <Image
                            src="/image/invite_btn.png"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
