'use client';


import React, { useState } from "react";
import Draggable, {
  DraggableEvent,
  DraggableData,
} from "react-draggable";
import { Card, CardContent } from "@/components/ui/card";

/**
 * A Sortable list using react-draggable.
 * This code uses a "controlled" position so that items reorder after dropping.
 *
 * Changes added:
 * 1) The dragged card now appears "above" others via z-index.
 * 2) When dropping the card, other items smoothly animate to their new positions.
 *
 * NOTE:
 * - "react-draggable" is more suited for free dragging.
 * - For fully dynamic, real-time reflow while dragging (like drag-and-drop libraries),
 *   you'd need more advanced logic.
 * - This example reorders only after the mouse is released.
 */

interface RowData {
  id: number;
  name: string;
  value: number;
}

export default function SortableTable() {
  // Our data
  const [items, setItems] = useState<RowData[]>([
    { id: 1, name: "Item One", value: 10 },
    { id: 2, name: "Item Two", value: 20 },
    { id: 3, name: "Item Three", value: 30 },
    { id: 4, name: "Item Four", value: 40 },
    { id: 5, name: "Item Five", value: 50 },
  ]);

  // We store each item's current (x,y) in parallel to items.
  // By default, y = index * rowHeight.
  const rowHeight = 60; // px
  const [positions, setPositions] = useState(
    items.map((_, index) => ({ x: 0, y: index * rowHeight }))
  );

  // Track which item is currently being dragged, for z-index.
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Recompute positions while dragging.
  const handleDrag = (index: number, e: DraggableEvent, data: DraggableData) => {
    setPositions((prev) => {
      const copy = [...prev];
      copy[index] = { x: 0, y: data.y }; // Only vertical moves
      return copy;
    });
  };

  // On drag start, set which item is on top.
  const handleStart = (index: number) => {
    setDraggingIndex(index);
  };

  // On release, reorder items + positions.
  const handleStop = (index: number, e: DraggableEvent, data: DraggableData) => {
    // data.y is final offset.
    const newIndex = Math.round(data.y / rowHeight);
    const clampedIndex = Math.max(0, Math.min(newIndex, items.length - 1));

    // If it didn't actually move to a new spot, snap back.
    if (clampedIndex === index) {
      setPositions((prev) => {
        const copy = [...prev];
        copy[index] = { x: 0, y: index * rowHeight };
        return copy;
      });
      setDraggingIndex(null);
      return;
    }

    // Reorder the items array.
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(index, 1);
    updatedItems.splice(clampedIndex, 0, movedItem);

    // Reorder positions so each item i is at y = i * rowHeight.
    const updatedPositions = updatedItems.map((_, i) => ({ x: 0, y: i * rowHeight }));

    setItems(updatedItems);
    setPositions(updatedPositions);
    setDraggingIndex(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-md rounded-2xl p-4">
        <CardContent>
          <div
            className="relative"
            style={{ height: items.length * rowHeight, position: "relative" }}
          >
            {items.map((item, index) => {
              // We feed Draggable a controlled position.
              const pos = positions[index];

              // If currently dragging this item, set zIndex higher.
              const isDragging = draggingIndex === index;

              return (
                <Draggable
                  key={item.id}
                  axis="y"
                  position={{ x: pos.x, y: pos.y }}
                  onStart={() => handleStart(index)}
                  onDrag={(e, data) => handleDrag(index, e, data)}
                  onStop={(e, data) => handleStop(index, e, data)}
                >
                  <div
                    className={
                      "absolute w-full px-3 py-2 mb-2 border border-gray-200 bg-white " +
                      "rounded-xl shadow-sm flex items-center transition-transform duration-300"
                    }
                    style={{
                      width: "100%",
                      height: rowHeight - 8, // small gap
                      cursor: "move",
                      zIndex: isDragging ? 999 : 1,
                    }}
                  >
                    <div className="font-semibold w-12">{item.id}</div>
                    <div className="flex-1">{item.name}</div>
                    <div className="font-bold">{item.value}</div>
                  </div>
                </Draggable>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
