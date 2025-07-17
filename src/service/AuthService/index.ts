'use server';

import { jwtDecode } from 'jwt-decode';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const registerUserApi = async (userData: Record<string, unknown>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/api/user/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );
    revalidateTag('UserDetail');
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllUsersApi = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/api/user/`,
      {
        method: 'GET',
        headers: {
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['UserDetail'],
        },
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUserApi = async (userData: Record<string, unknown>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();

    if (result.success) {
      const response = NextResponse.json({ success: true });

      response.cookies.set('ecommerce-accessToken', result.data.accessToken, {
        httpOnly: true,
        path: '/',
      });
      response.cookies.set(
        'ecommerce-refreshToken',
        result?.data?.refreshToken,
        {
          httpOnly: true,
          path: '/',
        }
      );
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get('ecommerce-accessToken')?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const getProfileDataApi = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/api/user/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('ecommerce-accessToken')!.value,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const reCaptchaTokenVerification = async (token: string) => {
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
        response: token,
      }),
    });

    return res.json();
  } catch (err: any) {
    return Error(err);
  }
};

export const logout = async () => {
  (await cookies()).delete('ecommerce-accessToken');
  return true;
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      `${process.env.NEXT_PUBLIC_CLIENT_LINK}/api/auth/refresh-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('ecommerce-refreshToken')!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
