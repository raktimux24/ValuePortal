import { FC } from 'react';
import { NewIdeaForm } from '../../types/idea';

interface StepTwoProps {
  form: NewIdeaForm;
  onChange: (updates: Partial<NewIdeaForm>) => void;
}

export const StepTwo: FC<StepTwoProps> = ({ form, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="problemStatement" className="block text-sm font-medium text-foreground mb-1">
          Problem Statement
        </label>
        <textarea
          id="problemStatement"
          value={form.problemStatement}
          onChange={(e) => onChange({ problemStatement: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
          placeholder="Describe the problem you're trying to solve"
        />
      </div>

      <div>
        <label htmlFor="proposedSolution" className="block text-sm font-medium text-foreground mb-1">
          Proposed Solution
        </label>
        <textarea
          id="proposedSolution"
          value={form.proposedSolution}
          onChange={(e) => onChange({ proposedSolution: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
          placeholder="Describe your proposed solution"
        />
      </div>

      <div>
        <label htmlFor="expectedBenefits" className="block text-sm font-medium text-foreground mb-1">
          Expected Benefits
        </label>
        <textarea
          id="expectedBenefits"
          value={form.expectedBenefits}
          onChange={(e) => onChange({ expectedBenefits: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
          placeholder="Describe the expected benefits and impact"
        />
      </div>
    </div>
  );
};