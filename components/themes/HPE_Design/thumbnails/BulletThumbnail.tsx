import { useTheme } from "@/context/ThemeContext";
import { box_green_band, green_band } from "@/lib/images";
import { ThumbnailProps } from "@/types/slide-generation";
import Image from "next/image";

const BulletThumbnail = ({ content }: ThumbnailProps) => {
    const { slideStates } = useTheme()
    return (
        <div className="border w-full bg-cover bg-no-repeat rounded-md bg-white">
            <div className="flex items-center justify-center h-full">
                <Image src={box_green_band} alt='logo' className='absolute top-2 left-6 w-[20px]' />
                <div className="text-xl font-[600]">Slide {slideStates.findIndex(i => i.id === content.id) + 1}</div>
                <Image src={green_band} alt='logo' className='absolute bottom-2 left-6 w-[20px]' />
            </div>
        </div>
    )
}

export default BulletThumbnail;