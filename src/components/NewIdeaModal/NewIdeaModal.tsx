import { FC, useState } from 'react';
import { X } from 'lucide-react';
import { NewIdeaForm } from '../../types/idea';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';

interface NewIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (idea: NewIdeaForm) => void;
}

const initialForm: NewIdeaForm = {
  step: 1,
  title: '',
  description: '',
  category: 'process_improvement',
  problemStatement: '',
  proposedSolution: '',
  expectedBenefits: '',
};

export const NewIdeaModal: FC<NewIdeaModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState<NewIdeaForm>(initialForm);

  if (!isOpen) return null;

  const handleNext = () => {
    setForm(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const handlePrevious = () => {
    setForm(prev => ({ ...prev, step: prev.step - 1 }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    setForm(initialForm);
    onClose();
  };

  const updateForm = (updates: Partial<NewIdeaForm>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Submit New Idea</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    step <= form.step 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 ${
                      step < form.step 
                        ? 'bg-indigo-600' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            {form.step === 1 && <StepOne form={form} onChange={updateForm} />}
            {form.step === 2 && <StepTwo form={form} onChange={updateForm} />}
            {form.step === 3 && <StepThree form={form} />}
          </div>

          <div className="flex justify-between">
            {form.step > 1 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg"
              >
                Previous
              </button>
            )}
            <div className="ml-auto">
              {form.step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit Idea
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};