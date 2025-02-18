import Image from "next/image";
import Link from "next/link";
import ClaimTimer from "./components/claimtimer";

export default function Home() {
  return (
    <div className=" w-full h-full">
      <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-evenly bg-cover bg-no-repeat " >
        <div className="w-full flex justify-center items-center relative">
          <div className="w-[30vmax] max-w-[295px] aspect-[295/183] relative ">
            <Image
              src="/image/fnfsLogo.png"
              alt="main logo"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center relative">
          <div className="w-[30vmax] max-w-[326px] aspect-[326/98] relative active:scale-95 transition-transform duration-100 ">
            <Image
              src="/image/joinbtn.png"
              alt="main logo"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
        <ClaimTimer />
      </div>
    </div>
  );
}
