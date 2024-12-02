import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdeaFilterBar } from '../components/IdeaFilterBar';
import { IdeaList } from '../components/IdeaList';
import { NewIdeaModal } from '../components/NewIdeaModal/NewIdeaModal';
import { StatsCards } from '../components/StatsCards';
import { useIdeaStore } from '../store/useIdeaStore';
import { IdeaFilters, NewIdeaForm } from '../types/idea';
import { filterIdeas } from '../utils/ideaUtils';

export function Dashboard() {
  const [filters, setFilters] = useState<IdeaFilters>({
    search: '',
    stage: 'all',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ideas, addIdea } = useIdeaStore();
  const navigate = useNavigate();

  const handleViewIdea = (id: string) => {
    const idea = ideas.find(i => i.id === id);
    if (idea?.stage === 'quantify') {
      navigate(`/quantify/${id}`);
    } else {
      navigate(`/idea/${id}`);
    }
  };

  const handleSubmitIdea = (form: NewIdeaForm) => {
    addIdea(form);
    setIsModalOpen(false);
  };

  const filteredIdeas = filterIdeas(ideas, filters);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Value Portal Dashboard</h1>
            <p className="text-muted-foreground">Track and manage your innovative ideas</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Submit New Idea
          </button>
        </div>

        <StatsCards ideas={ideas} />
        <IdeaFilterBar filters={filters} onFiltersChange={setFilters} />
        <IdeaList ideas={filteredIdeas} onViewIdea={handleViewIdea} />
        <NewIdeaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitIdea}
        />
      </div>
    </main>
  );
}