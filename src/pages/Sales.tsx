import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'cancelled';
  items: number;
}

const Sales = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orders] = useState<Order[]>([
    { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', amount: '$234.00', status: 'completed', items: 3 },
    { id: 'ORD-002', customer: 'Sarah Smith', date: '2024-01-14', amount: '$456.00', status: 'pending', items: 2 },
    { id: 'ORD-003', customer: 'Mike Johnson', date: '2024-01-14', amount: '$567.00', status: 'completed', items: 5 },
    { id: 'ORD-004', customer: 'Emily Brown', date: '2024-01-13', amount: '$123.00', status: 'cancelled', items: 1 },
    { id: 'ORD-005', customer: 'David Wilson', date: '2024-01-13', amount: '$890.00', status: 'completed', items: 4 },
    { id: 'ORD-006', customer: 'Lisa Anderson', date: '2024-01-12', amount: '$345.00', status: 'pending', items: 2 },
    { id: 'ORD-007', customer: 'James Taylor', date: '2024-01-12', amount: '$678.00', status: 'completed', items: 6 },
  ]);

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const handleExport = () => {
    toast.success('Exporting sales data to CSV...');
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + parseFloat(order.amount.replace('$', '')), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sales & Orders</h1>
          <p className="text-muted-foreground">Track and manage all sales transactions</p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground font-medium mb-2">Total Orders</p>
            <h3 className="text-3xl font-bold">{orders.length}</h3>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground font-medium mb-2">Total Revenue</p>
            <h3 className="text-3xl font-bold">${totalRevenue.toFixed(2)}</h3>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground font-medium mb-2">Avg Order Value</p>
            <h3 className="text-3xl font-bold">${(totalRevenue / orders.length).toFixed(2)}</h3>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Complete list of all orders</CardDescription>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="font-semibold">{order.amount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
