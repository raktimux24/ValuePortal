import { FC } from 'react';
import { QuantificationForm } from '../../types/quantification';

interface ValueDeliveredProps {
  form: QuantificationForm;
  onChange: (updates: Partial<QuantificationForm>) => void;
}

export const ValueDelivered: FC<ValueDeliveredProps> = ({ form, onChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-foreground">Value Delivered</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Impact Level
          </label>
          <div className="space-y-2">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={form.impactLevel}
                onChange={(e) => onChange({ impactLevel: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${form.impactLevel}%, rgb(229 231 235) ${form.impactLevel}%, rgb(229 231 235) 100%)`
                }}
              />
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                {form.impactLevel}%
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Estimated Budget
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="number"
              min="0"
              value={form.estimatedBudget}
              onChange={(e) => onChange({ estimatedBudget: Number(e.target.value) })}
              className="w-full pl-8 pr-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter estimated budget"
            />
          </div>
        </div>
      </div>
    </div>
  );
};