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
                <div className=" bg-balanceBg w-full h-full max-w-[500px] relative flex flex-col justify-evenly items-center bg-cover bg-no-repeat " >
                    <div className="w-full h-[15%] bg-no-repeat bg-cover absolute top-0 " ></div>
                    {copied ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Copy Complete.</Alert></div> : ''}
                    <div className={`w-full max-w-[500px] relative `}>
                        <p className="w-full text-center text-[6vmax] sm:text-[6vmin] -rotate-2
        bg-gradient-to-r from-[#F9BC2F] via-[#FED9A5] to-[#EB9F15] bg-clip-text text-transparent [-webkit-text-stroke:0.6px_black] ">Invite friends</p>
                    </div>
                    <p className={` text-[3.5vmin] sm:text-[1.6vmin] font-bold bg-gradient-to-r from-[#F9BC2F] via-[#FED9A5] to-[#EB9F15] bg-clip-text text-transparent`}>Invite friends, complete and earn more</p>

                    <div className="w-[80%] mr-[20%] h-[35%] relative  ">
                        <div className=" w-full h-full relative ">
                            <Image
                                src="/image/scroll.png"
                                alt="scroll"
                                layout="fill"
                                objectFit="fill"
                            />
                        </div>
                    </div>
                    <div className=" w-[80%] aspect-[489/400] relative flex flex-col justify-around items-center">
                        <Image
                            src="/image/inviteinfo.png"
                            alt="scroll"
                            layout="fill"
                            objectFit="fill"
                        />
                        <div className="flex flex-col gap-0 items-center">
                            <p className=" text-white text-[8vmin] sm:text-[5vmin]">How it works</p>
                            <p className=" text-white text-[4vmin] sm:text-[2.7vmin]">Share your invitation link</p>
                            <p className=" text-white text-[3vmin] sm:text-[2vmin]">Get a play pass for each friends</p>
                        </div>
                        <div className="flex flex-col gap-0 items-center">
                            <p className=" text-white text-[4vmin] sm:text-[2.7vmin]">Your friends join Mystic</p>
                            <p className=" text-white text-[3vmin] sm:text-[2vmin]">Get a play pass for each friends</p>
                        </div>
                        <p className=" text-white text-[4vmin] sm:text-[2.7vmin]">1 friends / 2000 MANA</p>
                    </div>
                    <div onClick={handleCopyClick} className="w-full flex justify-center gap-[3%] relative active:scale-90 transition-transform duration-100 ">
                        <div className="w-[60%] aspect-[317/38] relative">
                            <p className=" absolute text-[#FFD37E] text-[5vmin] sm:text-[2vmin] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">Invite a friend</p>
                            <Image
                                src="/image/invitebtn.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="fill"
                            />
                        </div>
                        <div className="w-[28%] rounded-md h-full border border-[#FFD37E] font-bold text-[#FFD37E] text-center">Copy link</div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
