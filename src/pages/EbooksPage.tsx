import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { BookOpen, Download, Loader2 } from 'lucide-react';

interface Ebook {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  file_url: string;
  cover_image: string | null;
  price: number;
  access_type: string;
  stripe_price_id: string | null;
}

const EbooksPage = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEbooks = async () => {
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load e-books');
      } else {
        setEbooks(data || []);
      }
      setLoading(false);
    };

    fetchEbooks();
  }, []);

  const handlePurchase = async (ebook: Ebook) => {
    if (!ebook.stripe_price_id) {
      toast.error('Payment not available for this e-book');
      return;
    }

    setPurchasingId(ebook.id);

    try {
      const { data, error } = await supabase.functions.invoke('create-ebook-checkout', {
        body: { priceId: ebook.stripe_price_id },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to initiate purchase');
    } finally {
      setPurchasingId(null);
    }
  };

  const handleDownload = (fileUrl: string, title: string) => {
    window.open(fileUrl, '_blank');
    toast.success(`Downloading ${title}`);
  };

  const freeEbooks = ebooks.filter((e) => e.access_type === 'free');
  const paidEbooks = ebooks.filter((e) => e.access_type === 'paid');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">E-Book Library</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download our comprehensive career development guides and resources
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">All E-Books</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="paid">Premium</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ebooks.map((ebook) => (
                    <Card key={ebook.id} className="flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <BookOpen className="w-8 h-8 text-primary" />
                          <Badge variant={ebook.access_type === 'free' ? 'secondary' : 'default'}>
                            {ebook.access_type === 'free' ? 'Free' : `£${ebook.price}`}
                          </Badge>
                        </div>
                        <CardTitle>{ebook.title}</CardTitle>
                        {ebook.category && (
                          <CardDescription>{ebook.category}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-sm text-muted-foreground">{ebook.description}</p>
                      </CardContent>
                      <CardFooter>
                        {ebook.access_type === 'free' ? (
                          <Button
                            className="w-full"
                            onClick={() => handleDownload(ebook.file_url, ebook.title)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Free
                          </Button>
                        ) : (
                          <Button
                            className="w-full"
                            onClick={() => handlePurchase(ebook)}
                            disabled={purchasingId === ebook.id}
                          >
                            {purchasingId === ebook.id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              `Purchase for £${ebook.price}`
                            )}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="free">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeEbooks.map((ebook) => (
                  <Card key={ebook.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <BookOpen className="w-8 h-8 text-primary" />
                        <Badge variant="secondary">Free</Badge>
                      </div>
                      <CardTitle>{ebook.title}</CardTitle>
                      {ebook.category && (
                        <CardDescription>{ebook.category}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground">{ebook.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => handleDownload(ebook.file_url, ebook.title)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Free
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="paid">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paidEbooks.map((ebook) => (
                  <Card key={ebook.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <BookOpen className="w-8 h-8 text-primary" />
                        <Badge>£{ebook.price}</Badge>
                      </div>
                      <CardTitle>{ebook.title}</CardTitle>
                      {ebook.category && (
                        <CardDescription>{ebook.category}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground">{ebook.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => handlePurchase(ebook)}
                        disabled={purchasingId === ebook.id}
                      >
                        {purchasingId === ebook.id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Purchase for £${ebook.price}`
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EbooksPage;
