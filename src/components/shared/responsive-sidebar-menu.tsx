'use client';

import React, { useState } from 'react';

import {
  ChevronDown,
  ChevronRight,
  Gem,
  Home,
  Laptop,
  Menu,
  ShoppingBag,
  Watch,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface SubMenuItem {
  name: string;
  href: string;
}

interface MenuCategory {
  name: string;
  items: SubMenuItem[];
}

interface MenuItem {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  categories?: MenuCategory[];
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    name: 'HOME',
    href: '/',
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: 'ELECTRONIC &amp; OTHERS',
    icon: <Laptop className="h-4 w-4" />,
    categories: [
      {
        name: 'Home Accessories',
        items: [
          {
            name: 'Bedding',
            href: '/products?category=683770a6e4003a6d8ae07ad8',
          },
          {
            name: 'Furniture',
            href: '/products?category=683770a6e4003a6d8ae07ad9',
          },
          {
            name: 'Wall Art',
            href: '/products?category=683770a6e4003a6d8ae07adb',
          },
          {
            name: 'Lighting & Ceiling Fans',
            href: '/products?category=683770a6e4003a6d8ae07ada',
          },
        ],
      },
      {
        name: 'Computer',
        items: [
          {
            name: 'Computer Accessories',
            href: '/products?category=6837702fe4003a6d8ae07ad4',
          },
          {
            name: 'Monitors',
            href: '/products?category=6837702fe4003a6d8ae07ad7',
          },
          {
            name: 'Components',
            href: '/products?category=6837702fe4003a6d8ae07ad5',
          },
          {
            name: 'Laptop',
            href: '/products?category=683800cd2e9873a563dc4586',
          },
        ],
      },
      {
        name: 'Mobile Accessories',
        items: [
          {
            name: 'Headphones',
            href: '/products?category=68376f2de4003a6d8ae07acf',
          },
          {
            name: 'Cell Phones',
            href: '/products?category=68376f2de4003a6d8ae07ace',
          },
          {
            name: 'Telescopes',
            href: '/products?category=6837702fe4003a6d8ae07ad6',
          },
          {
            name: 'Tablets',
            href: '/products?category=68376f2de4003a6d8ae07acc',
          },
        ],
      },
      {
        name: 'Bags & Others',
        items: [
          {
            name: 'Backpacks',
            href: '/products?category=683770ece4003a6d8ae07add',
          },
          {
            name: 'Suitcases',
            href: '/products?category=683770ece4003a6d8ae07adf',
          },
          {
            name: 'Travel Totes',
            href: '/products?category=683770ece4003a6d8ae07ade',
          },
          {
            name: 'Carry Ons',
            href: '/products?category=683770ece4003a6d8ae07adc',
          },
        ],
      },
    ],
  },
  {
    name: 'WATCHES',
    href: '/products?category=683adfa8edd553ace12e63d4',
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    name: 'TSHIRTS',
    href: '/products?category=683ae018edd553ace12e63d9',
    icon: <Watch className="h-4 w-4" />,
  },
  {
    name: 'FRUITS AND VEGETABLES',
    href: '/products?category=683ae03cedd553ace12e63de',
    icon: <Gem className="h-4 w-4" />,
  },
  {
    name: 'CREATE SHOP',
    href: '/create-shop',
    icon: <ShoppingBag className="h-4 w-4" />,
  },
];

// Add custom scrollbar styles
const scrollbarStyles = `
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #60a5fa;
    border-radius: 3px;
    transition: background-color 0.2s ease;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #3b82f6;
  }
  
  .scrollbar-track-gray-100::-webkit-scrollbar-track {
    background: #f3f4f6;
  }
  
  .scrollbar-thumb-blue-400::-webkit-scrollbar-thumb {
    background: #60a5fa;
  }
  
  .scrollbar-thumb-blue-500:hover::-webkit-scrollbar-thumb {
    background: #3b82f6;
  }

  @keyframes collapsible-down {
    from {
      height: 0;
    }
    to {
      height: var(--radix-collapsible-content-height);
    }
  }

  @keyframes collapsible-up {
    from {
      height: var(--radix-collapsible-content-height);
    }
    to {
      height: 0;
    }
  }

  .animate-collapsible-down {
    animation: collapsible-down 0.2s ease-out;
  }

  .animate-collapsible-up {
    animation: collapsible-up 0.2s ease-out;
  }
`;

export default function MobileSidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['ELECTRONICS']);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(itemName)
        ? prevExpandedItems.filter((item) => item !== itemName)
        : [...prevExpandedItems, itemName]
    );
  };

  // Inject custom scrollbar styles
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-blue-500 to-blue-600">
      {/* Header with hamburger menu */}
      <div className="p-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-600 border border-white/20 rounded-md"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 p-0 bg-gradient-to-b from-blue-500 to-blue-600 border-0"
          >
            <div className="flex flex-col h-full">
              <nav className="flex-1 py-4">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    {item.categories ? (
                      <Collapsible
                        open={expandedItems.includes(item.name)}
                        onOpenChange={() => toggleExpanded(item.name)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              'w-full justify-between px-6 py-3 text-left text-white hover:bg-blue-600 rounded-none font-medium',
                              expandedItems.includes(item.name) && 'bg-blue-600'
                            )}
                          >
                            <div className="flex items-center space-x-3">
                              {item.icon}
                              <span>{item.name}</span>
                              {item.badge && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {expandedItems.includes(item.name) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="bg-white max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-blue-400 hover:scrollbar-thumb-blue-500">
                          <div className="py-2">
                            {item.categories.map((category) => (
                              <Collapsible key={category.name}>
                                <CollapsibleTrigger asChild>
                                  <button className="w-full px-6 py-2 text-sm font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 sticky top-0 z-10 border-b border-gray-200 flex items-center justify-between transition-colors duration-200">
                                    <span>{category.name}</span>
                                    <ChevronRight className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
                                  </button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                  <div className="space-y-1 pb-2">
                                    {category.items.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className="block px-8 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 border-l-2 border-transparent hover:border-blue-400"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={item.href || '#'}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            'w-full justify-start px-6 py-3 text-white hover:bg-blue-600 rounded-none font-medium',
                            item.name === 'HOME' && 'bg-blue-700'
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon}
                            <span>{item.name}</span>
                            {item.badge && (
                              <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Demo content to show the navbar in action */}
    </div>
  );
}
