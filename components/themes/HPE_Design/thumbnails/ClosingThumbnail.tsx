import { useTheme } from "@/context/ThemeContext";
import { ThumbnailProps } from "@/types/slide-generation";

const ClosingThumbnail = ({ content }: ThumbnailProps) => {
    const {slideStates} = useTheme();
    return (
        <div className="border w-full bg-cover bg-no-repeat rounded-md" style={{
            backgroundImage: `url(${content?.thumbnail})`,
          }}>
            <div className="text-white flex items-center justify-center h-full">
                <div className="text-xl font-[600]">Slide {slideStates.findIndex(i => i.id === content.id) + 1}</div>
            </div>
          </div>
    )
}

export default ClosingThumbnail;