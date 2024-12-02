import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AttachmentSection } from '../components/IdeaDetails/AttachmentSection';
import { CommentsSection } from '../components/IdeaDetails/CommentsSection';
import { DetailsSection } from '../components/IdeaDetails/DetailsSection';
import { HistorySection } from '../components/IdeaDetails/HistorySection';
import { useIdeaStore } from '../store/useIdeaStore';
import { Attachment } from '../types/idea';

type Tab = 'details' | 'comments' | 'history';

export const IdeaDetails: FC = () => {
  const { ideaId } = useParams();
  const navigate = useNavigate();
  const { ideas, addAttachment, removeAttachment, addComment, addReply } = useIdeaStore();
  const [activeTab, setActiveTab] = useState<Tab>('details');

  const idea = ideas.find(i => i.id === ideaId);

  if (!idea) return null;

  const handleBack = () => {
    navigate('/');
  };

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    console.log('Exporting to PDF...');
  };

  const handleAddAttachment = (file: File) => {
    addAttachment(idea.id, file);
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    removeAttachment(idea.id, attachmentId);
  };

  const handleViewAttachment = (attachment: Attachment) => {
    if (attachment.url) {
      window.open(attachment.url, '_blank');
    }
  };

  const handleDownloadAttachment = (attachment: Attachment) => {
    if (attachment.url) {
      const link = document.createElement('a');
      link.href = attachment.url;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleAddComment = (content: string) => {
    addComment(idea.id, content);
  };

  const handleAddReply = (commentId: string, content: string) => {
    addReply(idea.id, commentId, content);
  };

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
            <h1 className="text-2xl font-bold text-foreground">{idea.title}</h1>
            <p className="text-muted-foreground">
              Stage: {idea.stage.replace('_', ' ').charAt(0).toUpperCase() + idea.stage.slice(1)}
            </p>
          </div>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 text-primary bg-white dark:bg-gray-800 border border-primary rounded-lg hover:bg-primary/5"
          >
            Export to PDF
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="border-b border-border">
            <nav className="flex" aria-label="Tabs">
              {(['details', 'comments', 'history'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-8">
                <DetailsSection idea={idea} />
                <AttachmentSection
                  attachments={idea.attachments}
                  onAddAttachment={handleAddAttachment}
                  onRemoveAttachment={handleRemoveAttachment}
                  onViewAttachment={handleViewAttachment}
                  onDownloadAttachment={handleDownloadAttachment}
                />
              </div>
            )}
            {activeTab === 'comments' && (
              <CommentsSection
                comments={idea.comments || []}
                onAddComment={handleAddComment}
                onAddReply={handleAddReply}
              />
            )}
            {activeTab === 'history' && (
              <HistorySection history={idea.history || []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};