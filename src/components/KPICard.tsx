import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

const KPICard = ({ title, value, change, icon: Icon, trend }: KPICardProps) => {
  return (
    <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
              {change}
            </p>
          </div>
          <div className="p-3 bg-gradient-primary rounded-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
