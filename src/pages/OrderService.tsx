import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderServiceForm from '@/components/OrderServiceForm';

const OrderService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 mx-auto">
          <OrderServiceForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderService;
