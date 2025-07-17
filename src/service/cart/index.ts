'use server';

import { ICoupon, IOrder } from '@/types/cart';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const createOrder = async (order: IOrder) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_LINK}/order`, {
      method: 'POST',
      headers: {
        Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const addCoupon = async (
  couponCode: string,
  subTotal: number,
  shopId: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/coupon/${couponCode}`,
      {
        method: 'POST',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderAmount: subTotal, shopId }),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const createCouponApi = async (formData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_LINK}/coupon`, {
      method: 'POST',
      headers: {
        Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    revalidateTag('Coupons');

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllCouponApi = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_LINK}/coupon`, {
      method: 'GET',
      headers: {
        Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['Coupons'],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const applyCouponCodeApi = async (coupon: ICoupon) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/coupon/${coupon.couponCode}`,
      {
        method: 'POST',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coupon),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyOrderDetailApi = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/order/my-orders`,
      {
        method: 'GET',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
          'Content-Type': 'application/json',
        },
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getOrdersOfAgentApi = async (agentId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/order/agent-orders/${agentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['AgentOrders'],
        },
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyShopOrdersApi = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/order/my-shop-orders`,
      {
        method: 'GET',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
          'Content-Type': 'application/json',
        },
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateAgentPickStatusApi = async (agentId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/user/update-agent-status/${agentId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
          'Content-Type': 'application/json',
        },
      }
    );
    revalidateTag('AgentOrders');
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateOrderDeliveryStatusApi = async (
  obj: Record<string, unknown>
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/order/update-delivery-status/${obj.orderId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }
    );
    revalidateTag('AgentOrders');
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
