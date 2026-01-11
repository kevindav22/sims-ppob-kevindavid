import React, { useRef } from 'react';

const PromoBanner = ({ banners }) => {
  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    const ele = scrollRef.current;
    if (!ele) return;

    const startPos = {
      left: ele.scrollLeft,
      x: e.clientX,
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - startPos.x;
      ele.scrollLeft = startPos.left - dx;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      ele.style.cursor = 'grab';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    ele.style.cursor = 'grabbing';
  };

  return (
    <section className="space-y-4">
      <h3 className="font-bold text-base text-gray-800">Temukan promo menarik</h3>
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x cursor-grab active:cursor-grabbing select-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {banners?.map((banner, index) => (
          <div key={index} className="shrink-0 w-67.5 h-30 rounded-xl overflow-hidden snap-start shadow-sm hover:shadow-md transition-shadow pointer-events-none">
            <img src={banner.banner_image} alt={banner.banner_name} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;
