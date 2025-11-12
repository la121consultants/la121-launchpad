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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Check, X, Star as StarIcon, Trash2 } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  testimonial: string;
  rating: number;
  status: string;
  featured: boolean;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (error) {
      toast.error('Failed to fetch reviews');
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update review');
    } else {
      toast.success(`Review ${status}`);
      fetchReviews();
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    const { error } = await supabase
      .from('reviews')
      .update({ featured: !featured })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update review');
    } else {
      toast.success(featured ? 'Removed from featured' : 'Added to featured');
      fetchReviews();
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    const { error } = await supabase.from('reviews').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete review');
    } else {
      toast.success('Review deleted');
      fetchReviews();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reviews Management</h1>
            <p className="text-muted-foreground">Manage customer testimonials and reviews</p>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role/Company</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Loading reviews...
                  </TableCell>
                </TableRow>
              ) : reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No reviews found
                  </TableCell>
                </TableRow>
              ) : (
                reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.name}</TableCell>
                    <TableCell>
                      {review.role}
                      {review.company && ` at ${review.company}`}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          review.status === 'approved'
                            ? 'default'
                            : review.status === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(review.id, review.featured)}
                      >
                        <StarIcon
                          className={`w-4 h-4 ${
                            review.featured ? 'fill-yellow-400 text-yellow-400' : ''
                          }`}
                        />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {new Date(review.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {review.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(review.id, 'approved')}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(review.id, 'rejected')}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteReview(review.id)}
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

export default Reviews;
