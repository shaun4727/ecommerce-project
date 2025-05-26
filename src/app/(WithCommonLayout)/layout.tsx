import '@/assets/root.css';
import NavbarComponent from '@/components/shared/navbar';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {' '}
      <NavbarComponent />
      {children}
    </div>
  );
};

export default CommonLayout;
