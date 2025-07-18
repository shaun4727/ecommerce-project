/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
import { getValidToken } from '../../lib/verifyToken';

//  get all brands
export const getAllBrands = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      next: {
        tags: ['Brands'],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// create brand
export const createBrand = async (brandData: FormData): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      method: 'POST',
      body: brandData,
      headers: {
        Authorization: token,
      },
    });

    revalidateTag('Brands');

    return res.json();
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong');
  }
};

// delete brand
export const deleteBrand = async (brandId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/brand/${brandId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag('Brands');
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const homePageBrandWithProduct = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/brand/brands-with-product`
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
