'use client';

import {
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  SquareTerminal,
} from 'lucide-react';
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

    {
      title: 'Settings',
      url: '#',
      icon: Settings,
      items: [
        {
          title: 'Profile',
          url: '/profile',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
