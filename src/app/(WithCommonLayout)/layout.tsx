import FooterSection from '@/components/shared/footer-section';
import NavbarComponent from '@/components/shared/navbar';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {' '}
      <NavbarComponent />
      {children}
      <FooterSection />
    </div>
  );
};

export default CommonLayout;
