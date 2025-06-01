'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';
import { createCouponApi } from '@/service/cart';
import { format, formatISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreateCouponModal() {
  const form = useForm();
  const startDate = form.watch('startDate');
  const discountType = form.watch('discountType');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const couponData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
    };
    const toastId = toast.loading('...Loading');
    const res = await createCouponApi(couponData);
    if (res?.success) {
      form.reset();
      toast.success(res.message, { id: toastId });
    } else {
      console.log(res.message);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Coupon</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Coupon</DialogTitle>
          <DialogDescription className="sr-only">
            Create coupon for your customers that will help them to save some
            money.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Code</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ''} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <Select
                    value={field.value || ''}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Flat">Flat</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Discount Value ({discountType === 'flat' ? '$' : '%'})
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ''} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minOrderAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Order Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ''} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxDiscountAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Discount Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ''} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full h-10 pl-3 text-left font-normal rounded-md',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 " align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date.getTime() < new Date().setHours(0, 0, 0, 0)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          disabled={!startDate}
                          className={cn(
                            'w-full h-10 pl-3 text-left font-normal rounded-md',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(startDate)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <Button type="submit" className=" w-full">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
