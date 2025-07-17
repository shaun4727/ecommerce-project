'use server';

import { cookies } from 'next/headers';

export const createShopService = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_LINK}/shop`, {
      method: 'POST',
      headers: {
        Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
      },
      body: data,
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
