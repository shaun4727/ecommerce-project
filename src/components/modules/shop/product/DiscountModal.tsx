import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { addFlashSale } from '@/service/FlashSale';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type TModalProps = {
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[] | []>>;
};

const DiscountModal = ({ selectedIds, setSelectedIds }: TModalProps) => {
  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form || {};

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      products: [...selectedIds],
      discountPercentage: parseFloat(data?.discountPercentage),
    };

    try {
      const res = await addFlashSale(modifiedData);
      if (res.success) {
        toast.success(res.message);
        setSelectedIds([]);
      } else {
        toast.error(res.message);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!selectedIds?.length} size="sm">
          Add Flash Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Flash Sale</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col items-center gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value || ''}
                      className="rounded-sm w-full"
                      placeholder="Discount Percentage"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-sm">
              {isSubmitting ? 'Adding....' : 'Add'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountModal;
