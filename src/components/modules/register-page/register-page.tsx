'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerUserApi } from '@/service/AuthService';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import './register-page.css';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters!'),
  confirm_password: z
    .string()
    .min(6, 'Confirm password must be at least 6 characters!'),
});

type registerFormData = z.infer<typeof registerSchema>;

const RegisterPageComponent = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<registerFormData>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: registerFormData) => {
    let toastId: number | string = 1;
    try {
      toastId = toast.loading('...Loading', {
        id: toastId,
      });
      const res = await registerUserApi(data);

      if (res?.success) {
        reset();
        toastId = toast.success('User registered successfully!', {
          id: toastId,
        });
      } else {
        console.log(res);
        toast.error(res.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
    // handle login logic
  };

  const password = watch('password');
  const confirm_password = watch('confirm_password');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Breadcrumb */}
      <div className="max-w-md mx-auto pt-4 pb-8">
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-800">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Register</span>
        </nav>
      </div>

      {/* Login Form */}
      <Card className="max-w-md mx-auto bg-white shadow-sm">
        <CardHeader className="pb-4">
          <h1 className="text-2xl font-normal text-gray-800 mb-2">Sign Up</h1>
          <p className="text-gray-600 text-sm">
            Hello, Welcome to your account.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Social Login Buttons */}

          <form role="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 text-sm">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                {...register('name')}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 text-sm">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 text-sm">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                {...register('password')}
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 text-sm">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                {...register('confirm_password')}
              />
            </div>
            {errors.confirm_password && (
              <p className="text-red-500">{errors.confirm_password.message}</p>
            )}
            {confirm_password && password !== confirm_password ? (
              <p className="text-red-500">
                Password and confirm password does not match!
              </p>
            ) : (
              ''
            )}
            {/* Remember Me and Forgot Password */}
            <div className="flex mb-2 items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Remember me!
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot your Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 mt-6"
              type="submit"
            >
              REGISTER
            </Button>
          </form>
          <p className="login-redirection">
            Do not have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push('/login')}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPageComponent;
