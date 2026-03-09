import React, { useState } from "react";

interface AccordionItemData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const AccordionItemCard = ({
  item,
  isActive,
  onMouseEnter,
}: {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
        isActive ? "flex-[4]" : "flex-[1]"
      }`}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/40" />
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-primary-foreground text-xs tracking-[0.3em] uppercase font-light">
          {item.title}
        </h3>
        <p className="text-primary-foreground/60 text-[10px] tracking-[0.15em] mt-2 font-light">
          {item.description}
        </p>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
          !isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className="text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-light"
          style={{ writingMode: "vertical-rl" }}
        >
          {item.title}
        </span>
      </div>
    </div>
  );
};

export function ServiceAccordion({ items }: { items: AccordionItemData[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex h-[500px] w-full gap-0">
      {items.map((item, index) => (
        <AccordionItemCard
          key={item.id}
          item={item}
          isActive={activeIndex === index}
          onMouseEnter={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}
