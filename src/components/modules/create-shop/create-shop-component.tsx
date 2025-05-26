import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateShopComponent() {
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
          <form className="space-y-6">
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
                    defaultValue="abc"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-gray-700 font-medium"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    defaultValue="Dhaka"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="website"
                    className="text-gray-700 font-medium"
                  >
                    Website
                  </Label>
                  <Input
                    id="website"
                    defaultValue="https://web.programming-hero.com"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId" className="text-gray-700 font-medium">
                    Tax Identification Number
                  </Label>
                  <Input
                    id="taxId"
                    defaultValue="123456"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
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
                    defaultValue="https://www.facebook.com/"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
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
                    defaultValue="123456"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contactNumber"
                    className="text-gray-700 font-medium"
                  >
                    Contact Number
                  </Label>
                  <Input
                    id="contactNumber"
                    defaultValue="01234567891"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="establishedYear"
                    className="text-gray-700 font-medium"
                  >
                    Established Year
                  </Label>
                  <Input
                    id="establishedYear"
                    defaultValue="2015"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="facebook"
                    className="text-gray-700 font-medium"
                  >
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    defaultValue="https://www.facebook.com/"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="instagram"
                    className="text-gray-700 font-medium"
                  >
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    defaultValue="https://www.facebook.com/"
                    className="bg-blue-50 border-blue-100 focus:border-blue-300"
                  />
                </div>
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
