'use client';

import { EPTable } from '@/components/ui/core/EPTable';
import TablePagination from '@/components/ui/core/EPTable/TablePagination';

import { IMeta } from '@/types';
import { ICouponData } from '@/types/cart';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CouponTable = ({
  coupons,
  meta,
}: {
  coupons: ICouponData[];
  meta: IMeta;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductsId, setSelectedProductsId] = useState<string[]>([]);
  console.log(coupons);
  const router = useRouter();

  const handleView = (product: ICouponData) => {
    console.log('Viewing product:', product);
  };

  const handleDelete = (productId: string) => {
    console.log('Deleting product with ID:', productId);
  };

  const columns: ColumnDef<ICouponData>[] = [
    {
      accessorKey: 'code',
      header: 'Code',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.code}</span>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => <span>{row.original.discountType}</span>,
    },
    {
      accessorKey: 'value',
      header: 'Value',
      cell: ({ row }) => <span>{row.original.discountValue}</span>,
    },

    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            // onClick={() =>router.push(`/admin/shop/update-product/${row.original._id}`)}
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            // onClick={() => handleDelete(row.original._id)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="my-5">
      <EPTable columns={columns} data={coupons || []} />
      <TablePagination totalPage={meta?.totalPage} restQuery="" />
    </div>
  );
};

export default CouponTable;
