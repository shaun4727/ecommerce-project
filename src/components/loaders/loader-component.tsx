import { Loader } from 'lucide-react';

export default function SpinnerLoader() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Loader className="w-[80px] h-12 animate-spin" />
    </div>
  );
}
