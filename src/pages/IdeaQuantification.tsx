import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { EffortRequired } from '../components/IdeaQuantification/EffortRequired';
import { ResourcesNeeded } from '../components/IdeaQuantification/ResourcesNeeded';
import { ValueDelivered } from '../components/IdeaQuantification/ValueDelivered';
import { useIdeaStore } from '../store/useIdeaStore';
import { QuantificationForm, defaultQuantificationForm } from '../types/quantification';

export const IdeaQuantification: FC = () => {
  const { ideaId } = useParams();
  const navigate = useNavigate();
  const { ideas } = useIdeaStore();
  const [form, setForm] = useState<QuantificationForm>(defaultQuantificationForm);

  const idea = ideas.find(i => i.id === ideaId);

  useEffect(() => {
    if (!idea || idea.stage !== 'quantify') {
      navigate('/');
    }
  }, [idea, navigate]);

  const handleFormChange = (updates: Partial<QuantificationForm>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = () => {
    // In a real app, this would submit the quantification data
    console.log('Submitting quantification:', form);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!idea) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-foreground">Idea Quantification</h1>
            <p className="text-muted-foreground">{idea.title}</p>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Submit Quantification
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <EffortRequired form={form} onChange={handleFormChange} />
          <ValueDelivered form={form} onChange={handleFormChange} />
        </div>

        <ResourcesNeeded form={form} onChange={handleFormChange} />
      </div>
    </div>
  );
};