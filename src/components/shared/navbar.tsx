'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { protectedRoutes } from '@/constants';
import { useUser } from '@/context/UserContext';
import { logout } from '@/service/AuthService';
import {
  ChevronDown,
  CreditCard,
  Heart,
  LogIn,
  LogOut,
  Search,
  ShoppingCart,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import MobileSidebarNav from './responsive-sidebar-menu';

const megaMenuCategories = {
  Men: [
    'Dresses',
    'Shoes',
    'Jackets',
    'Sunglasses',
    'Sport Wear',
    'Blazers',
    'Shirts',
  ],
  Women: [
    'Handbags',
    'Jewellery',
    'Swimwear',
    'Tops',
    'Flats',
    'Shoes',
    'Winter Wear',
  ],
  Boys: [
    'Toys & Games',
    'Jeans',
    'Shirts',
    'Shoes',
    'School Bags',
    'Lunch Box',
    'Footwear',
  ],
  Girls: [
    'Sandals',
    'Shorts',
    'Dresses',
    'Jewellery',
    'Bags',
    'Night Dress',
    'Swim Wear',
  ],
};

export default function NavbarComponent() {
  const [isClothingOpen, setIsClothingOpen] = useState(false);

  const { user, setIsLoading } = useUser();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
  }, []);
  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/');
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-blue-600 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-blue-200">
                <span>USD</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
                <DropdownMenuItem>GBP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-blue-200">
                <span>English</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-4 h-8">
            <a
              href="#"
              className="flex items-center space-x-1 hover:text-blue-200"
            >
              <User className="h-4 w-4" />
              <span>My Account</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-1 hover:text-blue-200"
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-1 hover:text-blue-200"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>My Cart</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-1 hover:text-blue-200"
            >
              <CreditCard className="h-4 w-4" />
              <span>Checkout</span>
            </a>
            {!user && (
              <Link href="/login">
                <Button className=" flex bg-yellow-500 hover:bg-yellow-600 items-center space-x-1 text-black">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-blue-700 text-white">
        <div className="flex flex-col gap-3 items-center lg:flex-row lg:justify-center lg:py-4  ">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-yellow-400">Flipmart</h1>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex h-11">
              {' '}
              {/* consistent height for all children */}
              <Input
                placeholder="Search here..."
                className="flex-1 bg-white border-r border-gray-300 rounded-none h-full focus-visible:ring-0"
              />
              <Button
                className=" bg-yellow-500 hover:bg-yellow-600 text-black rounded-l-none px-6 h-full md:btn-default"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded">
            <ShoppingCart className="h-5 w-5" />
            <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              2
            </div>
            <span className="font-semibold">CART - $600.00</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="w-full hidden lg:block ">
        {/* Main Navigation */}
        <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-8">
                <Link
                  href="/"
                  className="hover:bg-blue-800 px-4 py-2 text-sm font-medium"
                >
                  HOME
                </Link>

                <div className="relative">
                  <button
                    className="flex items-center space-x-1 text-sm font-medium hover:text-blue-200 transition-colors"
                    onMouseEnter={() => setIsClothingOpen(true)}
                    onMouseLeave={() => setIsClothingOpen(false)}
                  >
                    <span>CLOTHING</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  <Link
                    href="/electronics"
                    className="text-sm font-medium hover:text-blue-200 transition-colors"
                  >
                    ELECTRONICS
                  </Link>
                  <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 ml-1">
                    HOT
                  </Badge>
                </div>

                <Link
                  href="/health-beauty"
                  className="text-sm font-medium hover:text-blue-200 transition-colors"
                >
                  HEALTH & BEAUTY
                </Link>

                <Link
                  href="/watches"
                  className="text-sm font-medium hover:text-blue-200 transition-colors"
                >
                  WATCHES
                </Link>

                <Link
                  href="/jewellery"
                  className="text-sm font-medium hover:text-blue-200 transition-colors"
                >
                  JEWELLERY
                </Link>

                <Link
                  href="/shoes"
                  className="text-sm font-medium hover:text-blue-200 transition-colors"
                >
                  SHOES
                </Link>

                <Link
                  href="/kids-girls"
                  className="text-sm font-medium hover:text-blue-200 transition-colors"
                >
                  KIDS & GIRLS
                </Link>

                <Link
                  href="/create-shop"
                  className="hover:bg-blue-800 px-4 py-2 text-sm font-medium"
                >
                  CREATE SHOP
                </Link>
              </div>

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard />
                        <span>Dashboard</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Users />
                        <span>My Shop</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
                        <LogOut className="text-white" />
                        <span onClick={handleLogout}>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </nav>

        {/* Mega Menu */}
        {isClothingOpen && (
          <div
            className="absolute top-40 left-1/2 -translate-x-1/2 w-[1100px] bg-white shadow-lg border-t z-50"
            onMouseEnter={() => setIsClothingOpen(true)}
            onMouseLeave={() => setIsClothingOpen(false)}
          >
            <div className="max-w-5xl mx-auto px-4 py-8">
              <div className="grid grid-cols-5 gap-8">
                {/* Category Columns */}
                {Object.entries(megaMenuCategories).map(([category, items]) => (
                  <div key={category} className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-2">
                      {category}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/${category.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Promotional Image */}
                <div className="relative">
                  <img
                    src="/promo-image.png"
                    alt="Fashion Models"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-end">
                    <div className="p-4 text-white">
                      <h4 className="font-semibold text-lg">New Collection</h4>
                      <p className="text-sm opacity-90">
                        Discover the latest trends
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="block lg:hidden">
        <MobileSidebarNav />
      </div>
    </div>
  );
}
