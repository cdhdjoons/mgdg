import Image from "next/image";


export default function Loading() {

    return (
        <div className=" w-full h-full">
            <div className=" w-full h-full max-w-[500px] pt-3 relative flex flex-col justify-center items-center bg-cover bg-no-repeat " >
                <div className="w-[200px] aspect-[200/200] relative">
                    <Image
                        src="/image/bean_eater.gif"
                        alt="main logo"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    );
}
