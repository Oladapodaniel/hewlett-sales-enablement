import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import CustomCollapsible from "./Collapsible";

const SECTION_TYPE = "SECTION";

interface Section {
  // id: string;
  title: string;
  content: any;
}

interface DraggableSectionProps {
  section: Section;
  index: number;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
  cardVariants: any;
  headerRight: () => React.ReactNode;
  collapsibleContent: React.JSX.Element;
}

function DraggableSection({
  section,
  index,
  moveSection,
  cardVariants,
  headerRight,
  collapsibleContent,
}: DraggableSectionProps) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: SECTION_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: SECTION_TYPE,
    hover: (dragItem: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveSection(dragIndex, hoverIndex);
      dragItem.index = hoverIndex; // mutate the item’s index
    },
  }));

  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      className="p-2"
      initial="hidden"
      variants={cardVariants}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: (index + 0.5) * 0.2 }}
      viewport={{ once: true }}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
    >
      <CustomCollapsible
        key={index}
        headerText={section.title}
        headerRight={headerRight()}
        collapsibleContent={collapsibleContent}
        defaultOpen={index === 0}
        isDraggable={true}
      />
    </motion.div>
  );
}

export default DraggableSection;