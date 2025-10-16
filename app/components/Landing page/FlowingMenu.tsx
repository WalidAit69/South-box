"use client";

import React from 'react';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  description?: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  // Default items if none provided
  const defaultItems = [
    {
      link: '#branding',
      text: 'Branding',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      description: 'Logo design, brand identity, and visual systems'
    },
    {
      link: '#web-design',
      text: 'Web Design',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      description: 'Custom website design and user interfaces'
    },
    {
      link: '#development',
      text: 'Development',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      description: 'Web and mobile app development'
    },
    {
      link: '#marketing',
      text: 'Marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      description: 'Digital marketing and SEO services'
    }
  ];

  const menuItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="w-full h-full flex flex-col justify-center overflow-hidden pb-10">
      <nav 
        className="flex flex-col m-0 p-0 h-[500px]"
        aria-label="Services Navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        {menuItems.map((item, idx) => (
          <MenuItem key={idx} {...item} position={idx + 1} />
        ))}
      </nav>
    </div>
  );
};

interface MenuItemExtendedProps extends MenuItemProps {
  position: number;
}

const MenuItem: React.FC<MenuItemExtendedProps> = ({ link, text, image, description, position }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const [edgeState, setEdgeState] = React.useState<'top' | 'bottom' | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    setEdgeState(edge);
    setIsHovered(true);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    setEdgeState(edge);
    setIsHovered(false);
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="text-[#060010] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">
          {text}
        </span>
        <div
          className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          role="presentation"
        />
      </React.Fragment>
    ));
  }, [text, image]);

  const getMarqueeTransform = () => {
    if (isHovered) return 'translateY(0%)';
    if (edgeState === 'top') return 'translateY(-101%)';
    if (edgeState === 'bottom') return 'translateY(101%)';
    return 'translateY(101%)';
  };

  const getMarqueeInnerTransform = () => {
    if (isHovered) return 'translateY(0%)';
    if (edgeState === 'top') return 'translateY(101%)';
    if (edgeState === 'bottom') return 'translateY(-101%)';
    return 'translateY(0%)';
  };

  return (
    <div 
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" 
      ref={itemRef}
      itemProp="hasPart"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <meta itemProp="position" content={String(position)} />
      
      {/* Hidden description for SEO */}
      {description && (
        <span className="sr-only" itemProp="description">{description}</span>
      )}
      
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[2vh] sm:text-[4vh] hover:text-[#0000] focus:text-[#0000] focus-visible:text-[#0000] z-10"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        itemProp="url"
        aria-label={`${text} services - ${description || text}`}
      >
        <span className="relative z-10" itemProp="name">{text}</span>
      </a>
      
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
        ref={marqueeRef}
        style={{ transform: getMarqueeTransform() }}
        aria-hidden="true"
      >
        <div 
          className="h-full w-[200%] flex transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)]" 
          ref={marqueeInnerRef}
          style={{ transform: getMarqueeInnerTransform() }}
        >
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-[marquee_15s_linear_infinite]">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;