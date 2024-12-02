import { FC } from 'react';
import { NewIdeaForm } from '../../types/idea';

interface StepThreeProps {
  form: NewIdeaForm;
}

export const StepThree: FC<StepThreeProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Preview</h3>
        
        <div className="space-y-4">
          <div>
            <span className="font-medium text-foreground">Title:</span>{' '}
            <span className="text-foreground">{form.title}</span>
          </div>
          
          <div>
            <span className="font-medium text-foreground">Description:</span>
            <p className="mt-1 text-muted-foreground">{form.description}</p>
          </div>
          
          <div>
            <span className="font-medium text-foreground">Category:</span>{' '}
            <span className="text-foreground">
              {form.category?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          
          <div>
            <span className="font-medium text-foreground">File:</span>{' '}
            <span className="text-foreground">
              {form.attachment ? form.attachment.name : 'No file attached'}
            </span>
          </div>
          
          <div>
            <span className="font-medium text-foreground">Problem Statement:</span>
            <p className="mt-1 text-muted-foreground">{form.problemStatement}</p>
          </div>
          
          <div>
            <span className="font-medium text-foreground">Proposed Solution:</span>
            <p className="mt-1 text-muted-foreground">{form.proposedSolution}</p>
          </div>
          
          <div>
            <span className="font-medium text-foreground">Expected Benefits:</span>
            <p className="mt-1 text-muted-foreground">{form.expectedBenefits}</p>
          </div>
        </div>
      </div>
    </div>
  );
};