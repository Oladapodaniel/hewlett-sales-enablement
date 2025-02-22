import React from "react";
import StartPage from "./StartPage";
import BodyPageOne from "./BodyPageOne";
import Image from "next/image";
import { purple_theme_thumbnail, purple_theme_thumbnail_2 } from "@/lib/images";
import EndPageProps from "./EndPage";

interface SlideDeckProps {
    type: 'editing' | 'presenting';
}

const SlideDeck: React.FC<SlideDeckProps> = ({ type }) => {
    return (
    <div className="flex gap-6">
        <div className="fixed w-[155px] shadow-[0_16px_36px_#542fb814] max-h-[700px] overflow-scroll mt-[70px] bg-[#F2F0FF] p-2">
        <div className="flex flex-col gap-4">
            <Image src={purple_theme_thumbnail} alt="logo" width={155} height={155} className="rounded-md" />
            <Image src={purple_theme_thumbnail_2} alt="logo" width={155} height={155} className="rounded-md" />
            <Image src={purple_theme_thumbnail_2} alt="logo" width={155} height={155} className="rounded-md" />
            <Image src={purple_theme_thumbnail} alt="logo" width={155} height={155} className="rounded-md" />
        </div>
        </div>
        <div className="w-[400px] h-[700px] mt-[70px]"></div>
        <div>
            <div className="shadow-[0_16px_36px_#542fb814]">
            <StartPage mode={type} />
            </div>
            <div className="mt-10 shadow-[0_16px_36px_#542fb814]">
            <BodyPageOne mode={type} />
            </div>
            <div className="mt-10 shadow-[0_16px_36px_#542fb814]">
            <BodyPageOne mode={type} />
            </div>
            <div className="mt-10 shadow-[0_16px_36px_#542fb814]">
            <EndPageProps mode={type} />
            </div>
        </div>
        {/* <div className="w-[300px]"></div> */}
    </div>
    );
}

export default SlideDeck