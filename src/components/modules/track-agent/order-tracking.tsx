import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Truck } from 'lucide-react';

export default function OrderTracking() {
  const steps = [
    // {
    //   id: 1,
    //   title: 'Order made',
    //   subtitle: 'Create order',
    //   icon: Package,
    //   completed: true,
    //   active: false,
    // },
    {
      id: 1,
      title: 'Payment Detail',
      subtitle: 'Customer payment',
      icon: CreditCard,
      completed: true,
      active: false,
    },
    {
      id: 2,
      title: 'Shipped',
      subtitle: 'On delivery',
      icon: Truck,
      completed: false,
      active: true,
    },
    {
      id: 3,
      title: 'Completed',
      subtitle: 'Order completed',
      icon: CheckCircle,
      completed: false,
      active: false,
    },
  ];

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Order ID: TXNID983274
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Lets boost your sales with powerful insights and effective strategies
          today
        </p>
      </div>

      {/* Status Banner */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
          <span className="text-sm sm:text-base font-medium text-gray-900">
            With courier en route
          </span>
        </div>
        <span className="text-sm text-gray-600 ml-5 sm:ml-0">
          No Resi: 34u2394y239y
        </span>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                className="flex items-center sm:flex-col sm:items-center sm:text-center flex-1"
              >
                <div className="flex items-center sm:flex-col sm:items-center">
                  <div
                    className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mr-3 sm:mr-0 sm:mb-3
                    ${
                      step.completed
                        ? 'bg-orange-500 text-white'
                        : step.active
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                    }
                  `}
                  >
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="sm:text-center">
                    <h3
                      className={`
                      text-sm sm:text-base font-medium
                      ${step.completed || step.active ? 'text-gray-900' : 'text-gray-400'}
                    `}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`
                      text-xs sm:text-sm
                      ${step.completed || step.active ? 'text-gray-600' : 'text-gray-400'}
                    `}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                {/* Connection line for mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block flex-1 h-px bg-gray-200 mx-4"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Shipping Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seller Address */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Shipping Address (Seller)
            </h3>
            {/* <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-gray-600" /> */}
          </div>
          <div className="space-y-1 text-sm sm:text-base text-gray-700">
            <p className="font-medium">Double CTRL Z</p>
            <p>1234 Market Street, Apt 56,</p>
            <p>Philadelphia, PA 19107,</p>
            <p>United States of America</p>
          </div>
        </div>

        {/* Buyer Address */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Shipping Address (Buyer)
            </h3>
            {/* <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-gray-600" /> */}
          </div>
          <div className="space-y-1 text-sm sm:text-base text-gray-700">
            <p className="font-medium">Rucas Royal</p>
            <p>4567 Elm Street, Apt 3B,</p>
            <p>Philadelphia, PA 19104, USA,</p>
            <p>Near University City</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="w-md">Track Order</Button>
      </div>
    </div>
  );
}
