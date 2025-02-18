'use client'

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { TicketContext } from "./clientOnlyWarpper";
import { TICKETS_UPDATE_EVENT } from '../components/clientOnlyWarpper';


export default function Footer() {
    const { hasTickets } = useContext(TicketContext);
    // console.log(hasTickets);

    const useTickets = () => {
        const nowTickets = localStorage.getItem("tickets");
        localStorage.setItem("tickets", Number(nowTickets) - 1);
        window.dispatchEvent(new Event(TICKETS_UPDATE_EVENT)); 

    }

    return (
        <div className="  w-full max-w-[500px] h-[102px] flex justify-center items-center ">
            <div className=" w-full flex justify-evenly items-center bg-footerBg py-2">
                <Link href="/daily">
                    <div className="w-[15vmin] sm:w-[6vmin] aspect-[82/82] relative active:scale-90 transition-transform duration-200 ">
                        <Image
                            src="/image/menu-task.png"
                            alt="meatIcon"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </div>
                </Link>
                <Link href="/">
                    <div className="w-[15vmin] sm:w-[6vmin] aspect-[82/82] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/menu-home.png"
                            alt="meatIcon"
                            fill
                            style={{ objectFit: "cover" }}
                            priority

                        />
                    </div>
                </Link>
                {hasTickets ? <Link href="/games">
                    <div onClick={useTickets} className="w-[70px] h-[70px] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/menu-game.png"
                            alt="meatIcon"
                            width={70}  // 이미지의 가로 크기 지정
                            height={70}  // 이미지의 세로 크기 지정
                            priority

                        />
                    </div>
                </Link> :
                    <div className="w-[70px] h-[70px] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/menu-offgame.png"
                            alt="meatIcon"
                            width={70}  // 이미지의 가로 크기 지정
                            height={70}  // 이미지의 세로 크기 지정
                            priority

                        />
                    </div>
                }

                <Link href="/invite">
                    <div className="w-[15vmin] sm:w-[6vmin] aspect-[82/82] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/menu-invite.png"
                            alt="meatIcon"
                            fill
                            style={{ objectFit: "cover" }}
                            priority

                        />
                    </div>
                </Link>
                <Link href="/leaderboard">
                    <div className="w-[15vmin] sm:w-[6vmin] aspect-[82/82] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/menu-rank.png"
                            alt="meatIcon"
                            fill
                            style={{ objectFit: "cover" }}
                            priority

                        />
                    </div>
                </Link>
            </div>
        </div>
    );
}