import KPICard from '@/components/KPICard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Dashboard = () => {
  const kpiData = [
    { title: 'Total Revenue', value: '$48,574', change: '+12.5% from last month', icon: DollarSign, trend: 'up' as const },
    { title: 'Total Customers', value: '2,847', change: '+8.2% from last month', icon: Users, trend: 'up' as const },
    { title: 'Total Orders', value: '1,234', change: '+23.1% from last month', icon: ShoppingCart, trend: 'up' as const },
    { title: 'Conversion Rate', value: '3.24%', change: '+2.4% from last month', icon: TrendingUp, trend: 'up' as const },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 3800 },
    { month: 'Mar', revenue: 5100 },
    { month: 'Apr', revenue: 4600 },
    { month: 'May', revenue: 5900 },
    { month: 'Jun', revenue: 6200 },
  ];

  const salesData = [
    { category: 'Electronics', sales: 4500 },
    { category: 'Clothing', sales: 3200 },
    { category: 'Books', sales: 2100 },
    { category: 'Home & Garden', sales: 2800 },
    { category: 'Sports', sales: 1900 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="category" className="text-xs" angle={-45} textAnchor="end" height={80} />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest customer interactions and orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { customer: 'John Doe', action: 'Placed an order', amount: '$234.00', time: '2 minutes ago' },
              { customer: 'Sarah Smith', action: 'Updated profile', amount: null, time: '15 minutes ago' },
              { customer: 'Mike Johnson', action: 'Placed an order', amount: '$567.00', time: '1 hour ago' },
              { customer: 'Emily Brown', action: 'Left a review', amount: null, time: '2 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="space-y-1">
                  <p className="font-medium">{activity.customer}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-right space-y-1">
                  {activity.amount && <p className="font-semibold">{activity.amount}</p>}
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
