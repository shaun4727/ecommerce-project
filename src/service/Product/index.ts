'use server';
import { IAgentOrder } from '@/types';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

// get all products
export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.minPrice) {
    params.append('minPrice', query?.minPrice.toString());
  }
  if (query?.maxPrice) {
    params.append('maxPrice', query?.maxPrice.toString());
  }

  if (query?.category) {
    const categoryString =
      typeof query?.category === 'string'
        ? query?.category
        : query?.category?.toString();
    params.append('categories', categoryString);
  }
  if (query?.brands) {
    params.append('brands', query?.brands.toString());
  }
  if (query?.rating) {
    params.append('ratings', query?.rating.toString());
  }
  if (query?.searchTerm) {
    params.append('searchTerm', query?.searchTerm.toString());
  }
  if (query?.trending) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_LINK}/product/trending`
      );

      return await res.json();
    } catch (err) {
      err;
    }
  }

  if (query?.flashSale) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_LINK}/flash-sale`
      );

      return await res.json();
    } catch (err) {
      console.log(err);
    }
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/product?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          tags: ['PRODUCT'],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single product
export const getSingleProduct = async (productId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/product/${productId}`,
      {
        next: {
          tags: ['PRODUCT'],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// add product
export const addProduct = async (productData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_LINK}/product`, {
      method: 'POST',
      body: productData,
      headers: {
        Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
      },
    });
    revalidateTag('PRODUCT');
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update product
export const updateProduct = async (
  productData: FormData,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/product/${productId}`,
      {
        method: 'PATCH',
        body: productData,
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
        },
      }
    );
    revalidateTag('PRODUCT');
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getTrendingProductsApi = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/product/trending`
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getFlashSaleProductsApi = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/flash-sale`
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const assignAgentApi = async (formData: IAgentOrder) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/order/assign-agent`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err: any) {
    return Error(err.message);
  }
};

export const getDeliveryAddressFromAgentOrder = async (agentId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/order/get-delivery-address/${agentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
