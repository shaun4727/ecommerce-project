'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import EPImageUploader from '@/components/ui/core/EPImageUploader';
import ImagePreviewer from '@/components/ui/core/EPImageUploader/ImagePreviewer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createShopService } from '@/service/shop';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import './assets/create-shop.css';

const socialSchema = z.object({
  facebook: z.string().min(1, 'Facebook ID is required'),
  twitter: z.string().min(1, 'Twitter ID is required'),
  instagram: z.string().min(1, 'Instagram is required'),
});

const createShopSchema = z.object({
  shopName: z.string().min(1, 'Shop Name is required'),
  businessLicenseNumber: z.string().min(1, 'Business License no is required'),
  address: z.string().min(1, 'Address is required'),
  contactNumber: z.string().min(1, 'Contact No. is required'),
  website: z.string().min(1, 'Website is required'),
  establishedYear: z.string().min(1, 'Established year is required'),
  taxIdentificationNumber: z.string().min(1, 'TIN is required'),
  socialMediaLinks: socialSchema,
  servicesOffered: z.string().min(1, 'Services are required'),
});

type shopFormData = z.infer<typeof createShopSchema>;

export default function CreateShopComponent() {
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<shopFormData>({
    resolver: zodResolver(createShopSchema),
  });

  const onSubmit = async (data: shopFormData) => {
    let toastId: string | number = 1;
    toast.loading('...Loading', { id: toastId });
    const servicesOffered = data?.servicesOffered
      ?.split(',')
      .map((service: string) => service.trim())
      .filter((service: string) => service !== '');

    const modifiedData = {
      ...data,
      servicesOffered: servicesOffered,
      establishedYear: Number(data?.establishedYear),
    };

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(modifiedData));
      formData.append('logo', imageFiles[0]);
      const res = await createShopService(formData);

      if (res.success) {
        reset();
        setImagePreview([]);
        toast.success(res.message);
      } else {
        console.log(res.message);
        toastId = toast.error(res.message, { id: toastId });
      }
    } catch (err: any) {
      toast.error('error occured', { id: toastId });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Create Your Shop
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            Join us today and start your journey!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="shopName"
                    className="text-gray-700 font-medium"
                  >
                    Shop Name
                  </Label>
                  <Input
                    id="shopName"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                    {...register('shopName')}
                  />
                  {errors.shopName && (
                    <p className="error-message">{errors.shopName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-gray-700 font-medium"
                  >
                    Address
                  </Label>
                  <Input
                    {...register('address')}
                    id="address"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                  {errors.address && (
                    <p className="error-message">{errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="website"
                    className="text-gray-700 font-medium"
                  >
                    Website
                  </Label>
                  <Input
                    {...register('website')}
                    id="website"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                  {errors.website && (
                    <p className="error-message">{errors.website.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId" className="text-gray-700 font-medium">
                    Tax Identification Number
                  </Label>
                  <Input
                    {...register('taxIdentificationNumber')}
                    id="taxId"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                  {errors.taxIdentificationNumber && (
                    <p className="error-message">
                      {errors.taxIdentificationNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="twitter"
                    className="text-gray-700 font-medium"
                  >
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                    {...register('socialMediaLinks.twitter')}
                  />
                  {errors.socialMediaLinks?.twitter && (
                    <p className="error-message">
                      {errors.socialMediaLinks.twitter.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="services-offered"
                    className="text-gray-700 font-medium"
                  >
                    Services Offered
                  </Label>
                  <Textarea
                    {...register('servicesOffered')}
                    id="services-offered"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                  {errors.servicesOffered && (
                    <p className="error-message">
                      {errors.servicesOffered.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="businessLicense"
                    className="text-gray-700 font-medium"
                  >
                    Business License Number
                  </Label>
                  <Input
                    id="businessLicense"
                    {...register('businessLicenseNumber')}
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                  {errors.businessLicenseNumber && (
                    <p className="error-message">
                      {errors.businessLicenseNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contactNumber"
                    className="text-gray-700 font-medium"
                  >
                    Contact Number
                  </Label>
                  <Input
                    {...register('contactNumber')}
                    id="contactNumber"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                  {errors.contactNumber && (
                    <p className="error-message">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="establishedYear"
                    className="text-gray-700 font-medium"
                  >
                    Established Year
                  </Label>
                  <Input
                    {...register('establishedYear')}
                    id="establishedYear"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                  {errors.establishedYear && (
                    <p className="error-message">
                      {errors.establishedYear.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="facebook"
                    className="text-gray-700 font-medium"
                  >
                    Facebook
                  </Label>
                  <Input
                    {...register('socialMediaLinks.facebook')}
                    id="facebook"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                  {errors.socialMediaLinks?.facebook && (
                    <p className="error-message">
                      {errors.socialMediaLinks.facebook.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="instagram"
                    className="text-gray-700 font-medium"
                  >
                    Instagram
                  </Label>
                  <Input
                    {...register('socialMediaLinks.instagram')}
                    id="instagram"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                  {errors.socialMediaLinks?.instagram && (
                    <p className="error-message">
                      {errors.socialMediaLinks.instagram.message}
                    </p>
                  )}
                </div>

                {imagePreview.length > 0 ? (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="mt-8 flex gap-2"
                  />
                ) : (
                  <div className="mt-8">
                    {' '}
                    <EPImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Upload Logo"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Create Shop
              </Button>
              {/* <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
