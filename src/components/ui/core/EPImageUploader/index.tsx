'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
};

const EPImageUploader = ({
  label = 'Upload Images',
  className,
  setImageFiles,
  setImagePreview,
}: TImageUploader) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (file) {
      setImageFiles(Array.from(file));

      Array.from(file).forEach((f) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreview((prev) => [...prev, reader.result as string]);
        };

        reader.readAsDataURL(f);
      });
    }

    event.target.value = '';
  };

  return (
    <div className={cn('flex flex-col items-center w-full gap-4', className)}>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />
      <label
        htmlFor="image-upload"
        className="w-full h-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        {label}
      </label>
    </div>
  );
};

export default EPImageUploader;
