import { useTheme } from "@/context/ThemeContext";
import { box_green_band, green_band } from "@/lib/images";
import { ThumbnailProps } from "@/types/slide-generation";
import Image from "next/image";

const ImageCaptionThumbnail = ({ content }: ThumbnailProps) => {
    const { slideStates } = useTheme()
    return (
        <div className="border w-full bg-cover bg-no-repeat rounded-md bg-white">
                {content.thumbnail && <Image src={content.thumbnail} alt='logo' className='object-cover w-full h-[50px] rounded-md' width={50} height={50} />}
                <div className="text-xl font-[600] text-center mt-2">Slide {slideStates.findIndex(i => i.id === content.id) + 1}</div>
                <Image src={green_band} alt='logo' className='absolute bottom-2 left-6 w-[20px]' />
        </div>
    )
}

export default ImageCaptionThumbnail;