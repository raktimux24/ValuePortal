import { FC } from 'react';
import { QuantificationForm } from '../../types/quantification';

interface EffortRequiredProps {
  form: QuantificationForm;
  onChange: (updates: Partial<QuantificationForm>) => void;
}

export const EffortRequired: FC<EffortRequiredProps> = ({ form, onChange }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-foreground">Effort Required</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Time Investment
          </label>
          <div className="space-y-2">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={form.timeInvestment}
                onChange={(e) => onChange({ timeInvestment: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${form.timeInvestment}%, rgb(229 231 235) ${form.timeInvestment}%, rgb(229 231 235) 100%)`
                }}
              />
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                {form.timeInvestment}%
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
            Implementation Complexity
          </label>
          <div className="relative">
            <select
              value={form.complexity}
              onChange={(e) => onChange({ complexity: e.target.value as any })}
              className="w-full appearance-none cursor-pointer px-3 py-2 pr-10 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};