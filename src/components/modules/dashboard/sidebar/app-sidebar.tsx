'use client';

import { Bot, SquareTerminal } from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: SquareTerminal,
      isActive: true,
      isCollapsible: false,
    },
    {
      title: 'Order History',
      url: '/admin/order-history',
      icon: SquareTerminal,
      isActive: true,
      isCollapsible: false,
    },
    {
      title: 'Shop',
      url: '/admin/shop/products',
      icon: Bot,
      isCollapsible: true,
      items: [
        {
          title: 'Manage Products',
          url: '/admin/shop/products',
        },
        {
          title: 'Manage Categories',
          url: '/admin/shop/category',
        },
        {
          title: 'Manage Brands',
          url: '/admin/shop/brand',
        },
        {
          title: 'Manage Coupon',
          url: '/admin/shop/manage-coupon',
        },
      ],
    },
  ],
};

const UserData = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/user/dashboard',
      icon: SquareTerminal,
      isActive: true,
      isCollapsible: false,
    },
    {
      title: 'Order History',
      url: '/user/order-history',
      icon: SquareTerminal,
      isActive: true,
      isCollapsible: false,
    },
    {
      title: 'Order Status',
      url: '/user/order-status',
      icon: SquareTerminal,
      isActive: true,
      isCollapsible: false,
    },
    {
      title: 'Shop',
      url: '/admin/shop/products',
      icon: Bot,
      items: [
        {
          title: 'Manage Products',
          url: '/admin/shop/products',
        },
        {
          title: 'Manage Categories',
          url: '/admin/shop/category',
        },
        {
          title: 'Manage Brands',
          url: '/admin/shop/brand',
        },
        {
          title: 'Manage Coupon',
          url: '/admin/shop/manage-coupon',
        },
      ],
    },
  ],
};

const AgentData = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/agent/dashboard',
      icon: SquareTerminal,
      isActive: true,
      isCollapsible: false,
    },
    {
      title: 'Assigned Orders',
      url: '/agent/assigned-orders',
      icon: SquareTerminal,
      isActive: true,
      isCollapsible: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setIsLoading } = useUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                {/* <div className="flex items-center justify-center">Logo</div> */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">EMart</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {user?.role === 'admin' && (
          <NavMain items={data.navMain} role={user?.role} />
        )}
        {user?.role === 'user' && (
          <NavMain items={UserData.navMain} role={user?.role} />
        )}
        {user?.role === 'agent' && (
          <NavMain items={AgentData.navMain} role={user?.role} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
