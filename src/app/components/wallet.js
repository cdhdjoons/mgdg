'use client'

import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { getTonConnectInstance } from "../../../utils/tonConnect";
import Alert from '@mui/material/Alert';

export default function Wallet() {
    const [tonConnect, setTonConnect] = useState(null);
    //task list 버튼 관리
    const [disabledWalletTask, setDisabledWalletTask] = useState(true);
    //wallet address 존재여부
    const [onWallet, setOnWallet] = useState(false);


    //  TON Connect 인스턴스 설정
    useEffect(() => {
        const storedWalletTask = localStorage.getItem("DisabledWalletTask");
        const tc = getTonConnectInstance();
        console.log(tc);
        setTonConnect(tc);
        if (storedWalletTask !== null) {
            setDisabledWalletTask(storedWalletTask === "true"); // 문자열을 Boolean으로 변환
        }
        // 사용자가 이전에 지갑을 연결했다면 연결 상태 확인
        tc.restoreConnection().then(() => {
            if (tc.wallet) {
                setDisabledWalletTask(false); // 연결된 상태로 설정 (버튼 업데이트만)
            }
        });
    }, []);


    //connect wallet 함수
    const connectWallet = async () => {
        try {
            await tonConnect.connect();

            await getWalletAddress(); // ✅ 연결 후 주소 가져오기
        } catch (error) {
            console.error("Wallet connection failed", error);
        }
    };
    // 연결된 지갑 주소 가져오는 함수
    const getWalletAddress = async () => {
        const wallet = tonConnect.wallet;
        if (wallet) {
            console.log("Connected Wallet Address:", wallet.account.address);
            const nowN2O = Number(localStorage.getItem("n2o"));
            setDisabledTask(false);
            setOnWallet(true);
            setTimeout(() => setOnWallet(false), 1500); // 1.5초 후 복사 메시지 초기화
            localStorage.setItem("DisabledWalletTask", "false"); // localStorage에 저장
            localStorage.setItem("n2o", nowN2O + 3000);
        } else {
            console.log("No wallet connected.");
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div className={` `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {onWallet ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Connect Wallet Complete.</Alert></div> : ''}
                {disabledWalletTask ?
                    <div  className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/taskconnect_off.png"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    :
                    <div className="w-[38vmax] sm:w-[22vmax] aspect-[489/147] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/taskconnect_off.png"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                }
            </motion.div>
        </AnimatePresence>
    );
}
