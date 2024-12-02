import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { IdeaFilterBar } from '../components/IdeaFilterBar';
import { StatsCards } from '../components/StatsCards';
import { ApprovalModal } from '../components/ManagerDashboard/ApprovalModal';
import { NewIdeaModal } from '../components/NewIdeaModal/NewIdeaModal';
import { useIdeaStore } from '../store/useIdeaStore';
import { Idea, IdeaFilters, NewIdeaForm } from '../types/idea';
import { filterIdeas } from '../utils/ideaUtils';

export const ManagerDashboard: FC = () => {
  const [filters, setFilters] = useState<IdeaFilters>({
    search: '',
    stage: 'all',
  });
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);
  const { ideas, addIdea } = useIdeaStore();
  const navigate = useNavigate();

  const handleViewIdea = (id: string) => {
    const idea = ideas.find(i => i.id === id);
    if (idea) {
      setSelectedIdea(idea);
    }
  };

  const handleApprove = (id: string, comment: string) => {
    // In a real app, this would update the idea status
    console.log('Approving idea:', id, comment);
    setSelectedIdea(null);
  };

  const handleReject = (id: string, comment: string) => {
    // In a real app, this would update the idea status
    console.log('Rejecting idea:', id, comment);
    setSelectedIdea(null);
  };

  const handleRequestInfo = (id: string, comment: string) => {
    // In a real app, this would update the idea status and notify the submitter
    console.log('Requesting info for idea:', id, comment);
    setSelectedIdea(null);
  };

  const handleSubmitNewIdea = (form: NewIdeaForm) => {
    addIdea(form);
    setIsNewIdeaModalOpen(false);
  };

  const filteredIdeas = filterIdeas(ideas, filters);

  return (
    <main className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Manager Approval Dashboard</h1>
          <p className="text-muted-foreground">Review and manage submitted ideas</p>
        </div>
        <button
          onClick={() => setIsNewIdeaModalOpen(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Submit New Idea
        </button>
      </div>

      <StatsCards ideas={ideas} />
      
      <IdeaFilterBar filters={filters} onFiltersChange={setFilters} />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Submitted By</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Stage</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Submitted On</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIdeas.map((idea) => (
                <tr key={idea.id} className="border-b border-border last:border-0">
                  <td className="py-4 px-6">
                    <div className="font-medium text-foreground">{idea.title}</div>
                    <div className="text-sm text-muted-foreground">{idea.category.replace('_', ' ')}</div>
                  </td>
                  <td className="py-4 px-6 text-foreground">{idea.submittedBy}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      idea.stage === 'quantify'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                    }`}>
                      {idea.stage.replace('_', ' ').charAt(0).toUpperCase() + idea.stage.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-foreground">
                    {new Date(idea.submittedOn).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewIdea(idea.id)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ApprovalModal
        idea={selectedIdea}
        isOpen={!!selectedIdea}
        onClose={() => setSelectedIdea(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        onRequestInfo={handleRequestInfo}
      />

      <NewIdeaModal
        isOpen={isNewIdeaModalOpen}
        onClose={() => setIsNewIdeaModalOpen(false)}
        onSubmit={handleSubmitNewIdea}
      />
    </main>
  );
};