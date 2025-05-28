import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, X } from 'lucide-react';
import Link from 'next/link';

const FailedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 p-3 rounded-full mb-5">
            <X className="size-40 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            We're sorry, but your payment could not be processed. Please check
            your payment details and try again.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/cart" legacyBehavior>
              <Button
                variant="outline"
                className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <ArrowLeft className="size-4 mr-2" />
                Back to Cart
              </Button>
            </Link>

            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="size-4 mr-2" />
              Try Again
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 w-full">
            <p className="text-sm text-gray-500 text-center mb-3">
              Need help? Contact our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-700 text-center"
              >
                Contact Support
              </Link>
              <span className="hidden sm:inline text-gray-400">•</span>
              <Link
                href="/faq"
                className="text-blue-600 hover:text-blue-700 text-center"
              >
                Payment FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedPage;
