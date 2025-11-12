import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Star, Trash2, Eye, EyeOff } from 'lucide-react';

interface Ebook {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  price: number;
  access_type: string;
  featured: boolean;
  active: boolean;
  download_count: number;
  created_at: string;
}

const EbooksAdmin = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEbooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ebooks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch e-books');
    } else {
      setEbooks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEbooks();
  }, []);

  const toggleActive = async (id: string, active: boolean) => {
    const { error } = await supabase
      .from('ebooks')
      .update({ active: !active })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update e-book');
    } else {
      toast.success(active ? 'E-book hidden' : 'E-book published');
      fetchEbooks();
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    const { error } = await supabase
      .from('ebooks')
      .update({ featured: !featured })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update e-book');
    } else {
      toast.success(featured ? 'Removed from featured' : 'Added to featured');
      fetchEbooks();
    }
  };

  const deleteEbook = async (id: string) => {
    if (!confirm('Are you sure you want to delete this e-book?')) return;

    const { error } = await supabase.from('ebooks').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete e-book');
    } else {
      toast.success('E-book deleted');
      fetchEbooks();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">E-Books Management</h1>
            <p className="text-muted-foreground">Manage your digital product library</p>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading e-books...
                  </TableCell>
                </TableRow>
              ) : ebooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No e-books found
                  </TableCell>
                </TableRow>
              ) : (
                ebooks.map((ebook) => (
                  <TableRow key={ebook.id}>
                    <TableCell className="font-medium">{ebook.title}</TableCell>
                    <TableCell>{ebook.category || 'Uncategorized'}</TableCell>
                    <TableCell>
                      <Badge variant={ebook.access_type === 'free' ? 'secondary' : 'default'}>
                        {ebook.access_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {ebook.access_type === 'paid' ? `£${ebook.price}` : 'Free'}
                    </TableCell>
                    <TableCell>{ebook.download_count}</TableCell>
                    <TableCell>
                      <Badge variant={ebook.active ? 'default' : 'secondary'}>
                        {ebook.active ? 'Active' : 'Hidden'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(ebook.id, ebook.featured)}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            ebook.featured ? 'fill-yellow-400 text-yellow-400' : ''
                          }`}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleActive(ebook.id, ebook.active)}
                        >
                          {ebook.active ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteEbook(ebook.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EbooksAdmin;
