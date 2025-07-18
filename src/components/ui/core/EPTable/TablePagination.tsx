import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../button';

const TablePagination = ({
  totalPage,
  restQuery = '',
}: {
  totalPage: number;
  restQuery: string;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usePagination, setUsePagination] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const searchString = () => {
    // const parameters = Object.entries(
    //   Object.fromEntries(searchParams.entries())
    // );
    // const filtered = parameters.filter(
    //   ([key]) =>
    //     key !== 'minPrice' &&
    //     key !== 'maxPrice' &&
    //     key !== 'brands' &&
    //     key !== 'rating'
    // );
    const string: string[] = [];
    // filtered.forEach((param) => {
    //   const [key, value] = param;
    //   string.push(`${key}=${value}`);
    // });
    if (restQuery) {
      string.push(restQuery);
    }
    // console.log('curr', currentPage + 1);
    if (usePagination) {
      string.push(`page=${Number(currentPage)}`);
      router.push(`${pathname}?${string.join('&')}`);
    }

    setUsePagination(false);
  };

  useEffect(() => {
    searchString();
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setUsePagination(true);
      // searchString(currentPage);
      //   const str = searchString(currentPage);
      //   router.push(`${pathname}?${str}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      setUsePagination(true);
      // searchString(currentPage);
      //   const str = searchString(currentPage);
      //   router.push(`${pathname}?${str}`);
    }
  };

  const handlingCurrentPage = (index: number) => {
    setCurrentPage(index + 1);
    setUsePagination(true);
    // searchString(index);
    // const str = searchString(index);
    // router.push(`${pathname}?${str}`);
  };

  return (
    <div className="flex items-center gap-2 my-5">
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center"
      >
        <ArrowLeft />
      </Button>
      {[...Array(totalPage)].map((_, index) => (
        <Button
          onClick={() => handlingCurrentPage(index)}
          key={index}
          variant={currentPage === index + 1 ? 'default' : 'outline'}
          size="sm"
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default TablePagination;
