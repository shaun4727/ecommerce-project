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
import {
  grandTotalSelector,
  orderedProductsSelector,
} from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { logout } from '@/service/AuthService';
import { getAllCategories } from '@/service/Category';
import { IBrand, ICategory } from '@/types';
import {
  ChevronDown,
  CreditCard,
  LogIn,
  LogOut,
  Search,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import MobileSidebarNav from './responsive-sidebar-menu';

const megaMenuCategories = {
  'Home Accessories': [
    { name: 'Bedding', id: '683770a6e4003a6d8ae07ad8' },
    { name: 'Furniture', id: '683770a6e4003a6d8ae07ad9' },
    { name: 'Wall Art', id: '683770a6e4003a6d8ae07adb' },
    { name: 'Lighting & Ceiling Fans', id: '683770a6e4003a6d8ae07ada' },
  ],
  Computer: [
    { name: 'Computer Accessories', id: '6837702fe4003a6d8ae07ad4' },
    { name: 'Monitors', id: '6837702fe4003a6d8ae07ad7' },
    { name: 'Components', id: '6837702fe4003a6d8ae07ad5' },
    { name: 'Laptop', id: '683800cd2e9873a563dc4586' },
  ],
  'Mobile Accessories': [
    { name: 'Headphones', id: '68376f2de4003a6d8ae07acf' },
    { name: 'Cell Phones', id: '68376f2de4003a6d8ae07ace' },
    { name: 'Tablets', id: '6837702fe4003a6d8ae07ad6' },
    { name: 'Accessories & Supplies', id: '68376f2de4003a6d8ae07acc' },
  ],
  'Bags & Others': [
    { name: 'Backpacks', id: '683770ece4003a6d8ae07add' },
    { name: 'Suitcases', id: '683770ece4003a6d8ae07adf' },
    { name: 'Travel Totes', id: '683770ece4003a6d8ae07ade' },
    { name: 'Carry Ons', id: '683770ece4003a6d8ae07adc' },
  ],
};

export default function NavbarComponent() {
  const [isClothingOpen, setIsClothingOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<IBrand[]>([]);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  const { user, setIsLoading, isLoading } = useUser();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(!isLoading);
    setIsClient(true);
    getCategoriesMethod();
  }, [cartProducts]);
  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/');
    }
  };

  const searchProducts = () => {
    router.push(`/products?searchTerm=${searchValue}`);
  };

  const getCategoriesMethod = async () => {
    try {
      const res = await getAllCategories();
      const navs = [
        '683ae03cedd553ace12e63de',
        '683ae018edd553ace12e63d9',
        '683adfa8edd553ace12e63d4',
      ];

      if (res?.success) {
        const filteredCategories = res.data?.filter((category: ICategory) =>
          navs.includes(category._id)
        );
        setAllCategories(filteredCategories);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const dashboardHandler = () => {
    if (user?.role === 'user') {
      router.push('/user/dashboard');
    } else {
      router.push('/admin/dashboard');
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-blue-600 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-blue-200">
                <span>BDT</span>
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
            {/* <a
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
            </a> */}
            <button
              onClick={() => router.push('/cart')}
              className="flex items-center space-x-1 hover:text-blue-200"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>My Cart</span>
            </button>
            {/* <a
              href="#"
              className="flex items-center space-x-1 hover:text-blue-200"
            >
              <CreditCard className="h-4 w-4" />
              <span>Checkout</span>
            </a> */}
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
            <h1 className="text-2xl font-bold text-yellow-400">Emart</h1>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex h-11">
              {' '}
              {/* consistent height for all children */}
              <Input
                placeholder="Search here..."
                onBlur={(e) => setSearchValue(e.target.value)}
                // className="flex-1 bg-white border-r border-gray-300 rounded-none h-full focus-visible:ring-0"
                className="bg-white h-full rounded-r-none text-black"
              />
              <Button
                onClick={searchProducts}
                className=" bg-yellow-500 hover:bg-yellow-600 text-black rounded-l-none px-6 h-full md:btn-default"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Cart */}
          <div
            className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            <div className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {cartProducts.length}
            </div>
            <span className="font-semibold">CART - BDT {grandTotal}</span>
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
                    <span>ELECTRONIC &amp; OTHERS</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                {allCategories &&
                  allCategories?.map((category) => (
                    <div key={category?._id}>
                      {' '}
                      <Link
                        //   href="/products?category=watches"
                        href={`/products?category=${category?._id}`}
                        className="text-sm font-medium hover:text-blue-200 transition-colors"
                      >
                        <span style={{ textTransform: 'uppercase' }}>
                          {category?.name ?? category?.name}
                        </span>
                      </Link>
                    </div>
                  ))}

                {user?.role === 'admin' && (
                  <Link
                    href="/create-shop"
                    className="hover:bg-blue-800 px-4 py-2 text-sm font-medium"
                  >
                    CREATE SHOP
                  </Link>
                )}
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
                      {/* <DropdownMenuItem>
                        <User />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem> */}
                      <DropdownMenuItem onClick={dashboardHandler}>
                        <CreditCard />
                        <span>Dashboard</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuGroup>
                      {/* <DropdownMenuItem>
                        <Users />
                        <span>My Shop</span>
                      </DropdownMenuItem> */}
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
                        <li key={item.id}>
                          <Link
                            href={`/products?category=${item?.id}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                          >
                            {item?.name}
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
