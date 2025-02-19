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
        <div className="  w-full max-w-[500px] flex justify-center items-center ">
            <div className=" w-full pt-[7vmin] pb-[2.5vmin] sm:pt-[3vmin] sm:pb-[1vmin] flex justify-evenly items-center bg-balanceBg">
                <Link href="/daily">
                    <div className="w-[13vmin] sm:w-[6vmin] aspect-[82/82] relative active:scale-90 transition-transform duration-200 ">
                        <p className=" absolute top-[-45%] left-1/2 -translate-x-1/2 font-bold text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Task</p>
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
                    <div className="w-[13vmin] sm:w-[6vmin] aspect-[82/82] relative active:scale-90 transition-transform duration-200">
                        <p className=" absolute top-[-45%] left-1/2 -translate-x-1/2 font-bold text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Home</p>

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
                    <div onClick={useTickets} className="w-[19vmin] sm:w-[9vmin] aspect-[99/88] relative active:scale-90 transition-transform duration-200">
                        <p className=" absolute top-[-25%] left-1/2 -translate-x-1/2 font-bold text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Play</p>
                        <Image
                            src="/image/menu-game.png"
                            alt="meatIcon"
                            fill
                            style={{ objectFit: "cover" }}
                            priority

                        />
                    </div>
                </Link> :
                    <div className="w-[19vmin] sm:w-[9vmin] aspect-[99/88] relative active:scale-90 transition-transform duration-200">
                        <p className=" absolute top-[-25%] left-1/2 -translate-x-1/2 font-bold text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Play</p>
                        <Image
                            src="/image/menu-gameoff.png"
                            alt="meatIcon"
                            fill
                            style={{ objectFit: "cover" }}
                            priority

                        />
                    </div>
                }

                <Link href="/invite">
                    <div className="w-[13vmin] sm:w-[6vmin] aspect-[82/82] relative active:scale-90 transition-transform duration-200">
                    <p className=" absolute top-[-45%] left-1/2 -translate-x-1/2 font-bold text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Invite</p>
                        
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
                    <div className="w-[13vmin] sm:w-[6vmin] aspect-[82/82] relative active:scale-90 transition-transform duration-200">
                    <p className=" absolute top-[-45%] left-1/2 -translate-x-1/2 font-bold text-white text-[1.2vmax] sm:text-[1.2vmin] text-center">Rank</p>
                        
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