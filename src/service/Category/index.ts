/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// create category
export const createCategory = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: 'POST',
      headers: {
        Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
      },
      body: data,
    });

    revalidateTag('CATEGORY');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all categories
export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      next: {
        tags: ['CATEGORY'],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete category
export const deleteCategory = async (categoryId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
        },
      }
    );
    revalidateTag('CATEGORY');
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
