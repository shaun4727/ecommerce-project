'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { registerUserApi } from '@/service/AuthService';
import { IUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

/**
 * register agent account code
 */

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters!'),
  confirm_password: z
    .string()
    .min(6, 'Confirm password must be at least 6 characters!'),
});

type registerFormData = z.infer<typeof registerSchema>;

export default function AgentAccountCreation({ agents }: { agents: IUser[] }) {
  /**
   * create agent account
   */
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
      const res = await registerUserApi({ ...data, role: 'agent' });

      if (res?.success) {
        reset();
        toastId = toast.success('Agent registered successfully!', {
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
    <div className="w-full bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Agent List</h1>
          <p className="text-gray-600 mt-1">View all your agent's detail</p>
        </div>

        <Drawer direction={'right'}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="mb-4">
              Create Agent Account
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4">
              <DrawerHeader>
                <DrawerTitle>Select Agent</DrawerTitle>
              </DrawerHeader>
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
                  <p className="text-red-500">
                    {errors.confirm_password.message}
                  </p>
                )}
                {confirm_password && password !== confirm_password ? (
                  <p className="text-red-500">
                    Password and confirm password does not match!
                  </p>
                ) : (
                  ''
                )}

                {/* Login Button */}
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 mt-6"
                  type="submit"
                >
                  Create Account
                </Button>
              </form>
            </div>
          </DrawerContent>
        </Drawer>

        <div className="hidden md:block overflow-hidden border rounded-lg">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[80px] cursor-pointer">
                  <div className="flex items-center">Name</div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center">Role</div>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center">Created At</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                agents
                  .filter((agent: IUser) => agent.role === 'agent')
                  .map((agent, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <TableCell className="font-medium">
                        {agent.name}
                      </TableCell>
                      <TableCell>{agent.role}</TableCell>
                      <TableCell>
                        {agent.createdAt
                          ? new Intl.DateTimeFormat('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }).format(new Date(agent.createdAt))
                          : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
