import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCallForm from '@/components/BookCallForm';

const BookCall = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 mx-auto">
          <BookCallForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookCall;
