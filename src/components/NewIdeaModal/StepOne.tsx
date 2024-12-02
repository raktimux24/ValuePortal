import { FC } from 'react';
import { NewIdeaForm } from '../../types/idea';

interface StepOneProps {
  form: NewIdeaForm;
  onChange: (updates: Partial<NewIdeaForm>) => void;
}

export const StepOne: FC<StepOneProps> = ({ form, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ attachment: file });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
          Idea Title
        </label>
        <input
          type="text"
          id="title"
          value={form.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter a clear and concise title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
          placeholder="Describe your idea in detail"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">
          Category
        </label>
        <div className="relative">
          <select
            id="category"
            value={form.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="process_improvement">Process Improvement</option>
            <option value="product_enhancement">Product Enhancement</option>
            <option value="cost_saving">Cost Saving</option>
            <option value="employee_experience">Employee Experience</option>
            <option value="customer_experience">Customer Experience</option>
            <option value="sustainability">Sustainability</option>
            <option value="other">Other</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="attachment" className="block text-sm font-medium text-foreground mb-1">
          Attachment
        </label>
        <input
          type="file"
          id="attachment"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};