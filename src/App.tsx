import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import WorkExperience from "./pages/WorkExperience";
import PaymentSuccess from "./pages/PaymentSuccess";
import EbooksPage from "./pages/EbooksPage";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Reviews from "./pages/admin/Reviews";
import Services from "./pages/admin/Services";
import Blog from "./pages/admin/Blog";
import EbooksAdmin from "./pages/admin/Ebooks";
import Settings from "./pages/admin/Settings";
import AuditLog from "./pages/admin/AuditLog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/work-experience" element={<WorkExperience />} />
          <Route path="/ebooks" element={<EbooksPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/reviews" element={<Reviews />} />
          <Route path="/admin/services" element={<Services />} />
          <Route path="/admin/blog" element={<Blog />} />
          <Route path="/admin/ebooks" element={<EbooksAdmin />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/audit" element={<AuditLog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
