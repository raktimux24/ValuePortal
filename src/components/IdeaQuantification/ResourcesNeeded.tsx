import { FC, useEffect } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { QuantificationForm, ResourceType } from '../../types/quantification';

interface ResourcesNeededProps {
  form: QuantificationForm;
  onChange: (updates: Partial<QuantificationForm>) => void;
}

export const ResourcesNeeded: FC<ResourcesNeededProps> = ({ form, onChange }) => {
  const adjustTeamSize = (increment: number) => {
    const newSize = Math.max(1, form.teamSize + increment);
    onChange({ teamSize: newSize });
  };

  useEffect(() => {
    // Adjust resource type fields based on team size
    const currentLength = form.resourceTypes.length;
    if (currentLength < form.teamSize) {
      // Add new resource type fields
      const newResourceTypes = [...form.resourceTypes];
      for (let i = currentLength; i < form.teamSize; i++) {
        newResourceTypes.push({ id: crypto.randomUUID(), type: '', role: '' });
      }
      onChange({ resourceTypes: newResourceTypes });
    } else if (currentLength > form.teamSize) {
      // Remove excess resource type fields
      const newResourceTypes = form.resourceTypes.slice(0, form.teamSize);
      onChange({ resourceTypes: newResourceTypes });
    }
  }, [form.teamSize]);

  const updateResourceType = (id: string, updates: Partial<ResourceType>) => {
    const newResourceTypes = form.resourceTypes.map(rt => 
      rt.id === id ? { ...rt, ...updates } : rt
    );
    onChange({ resourceTypes: newResourceTypes });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-foreground">Resources Needed</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Team Size
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => adjustTeamSize(-1)}
              className="p-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 text-foreground"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-lg font-medium w-12 text-center text-foreground">{form.teamSize}</span>
            <button
              onClick={() => adjustTeamSize(1)}
              className="p-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 text-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Resource Types
          </label>
          {form.resourceTypes.map((rt, index) => (
            <div key={rt.id} className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={rt.type}
                  onChange={(e) => updateResourceType(rt.id, { type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Resource Type (e.g., Developer)"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={rt.role}
                  onChange={(e) => updateResourceType(rt.id, { role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Role (e.g., Frontend)"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Implementation Time
          </label>
          <div className="relative">
            <select
              value={form.implementationTime}
              onChange={(e) => onChange({ implementationTime: e.target.value as any })}
              className="w-full appearance-none cursor-pointer px-3 py-2 pr-10 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="1_3_months">1-3 months</option>
              <option value="3_6_months">3-6 months</option>
              <option value="6_12_months">6-12 months</option>
              <option value="over_12_months">Over 12 months</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Additional Resources
          </label>
          <textarea
            value={form.additionalResources}
            onChange={(e) => onChange({ additionalResources: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
            placeholder="List any additional resources required"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Comments
          </label>
          <textarea
            value={form.comments}
            onChange={(e) => onChange({ comments: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
            placeholder="Add any additional comments or notes"
          />
        </div>
      </div>
    </div>
  );
};