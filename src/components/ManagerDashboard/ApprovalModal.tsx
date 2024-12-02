import { FC, useState } from 'react';
import { X, Eye, Download, FileText } from 'lucide-react';
import { Idea } from '../../types/idea';

interface ApprovalModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string, comment: string) => void;
  onReject: (id: string, comment: string) => void;
  onRequestInfo: (id: string, comment: string) => void;
}

type Tab = 'details' | 'quantify' | 'attachments' | 'history';

export const ApprovalModal: FC<ApprovalModalProps> = ({
  idea,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('details');
  const [comment, setComment] = useState('');

  if (!isOpen || !idea) return null;

  const handleAction = (action: 'approve' | 'reject' | 'request') => {
    switch (action) {
      case 'approve':
        onApprove(idea.id, comment);
        break;
      case 'reject':
        onReject(idea.id, comment);
        break;
      case 'request':
        onRequestInfo(idea.id, comment);
        break;
    }
    setComment('');
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-foreground">{idea.title}</h2>
              <p className="text-sm text-muted-foreground">Review and take action on this idea</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b dark:border-gray-700">
            <nav className="flex">
              {(['details', 'quantify', 'attachments', 'history'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  {tab === 'quantify' ? 'Quantify Metrics' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Title</h3>
                  <p className="text-foreground">{idea.title}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Description</h3>
                  <p className="text-foreground">{idea.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Category</h3>
                  <p className="text-foreground capitalize">{idea.category.replace('_', ' ')}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Problem Statement</h3>
                  <p className="text-foreground">{idea.problemStatement}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Proposed Solution</h3>
                  <p className="text-foreground">{idea.proposedSolution}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-1">Expected Benefits</h3>
                  <p className="text-foreground">{idea.expectedBenefits}</p>
                </div>
              </div>
            )}

            {activeTab === 'quantify' && idea.quantification && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Effort Required</h3>
                  <p className="text-foreground mb-2">High</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <span className="text-sm text-muted-foreground">Time Investment</span>
                      <p className="text-lg font-medium text-foreground">70%</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Implementation Complexity</span>
                      <p className="text-lg font-medium text-foreground">High</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Value Delivered</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <span className="text-sm text-muted-foreground">Impact Level</span>
                      <p className="text-lg font-medium text-foreground">35%</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Estimated Budget</span>
                      <p className="text-lg font-medium text-foreground">$15,000</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Resources Needed</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Team Size</span>
                      <p className="text-lg font-medium text-foreground">5</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block mb-2">Resources Types</span>
                      <p className="text-foreground">AI Developer, UX Designer, Project manager, Customer Service Specialist, QA, Tester</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Implementation time</span>
                      <p className="text-lg font-medium text-foreground">6-12 months</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attachments' && (
              <div className="space-y-4">
                {idea.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-foreground">{attachment.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({formatFileSize(attachment.size)})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(attachment.url, '_blank')}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = attachment.url || '';
                          link.download = attachment.name;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {idea.history?.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-4">
                    <div className="w-32 flex-shrink-0">
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground">
                        <span className="font-medium">{entry.user}</span>
                        {' - '}
                        {entry.type === 'stage_change' ? entry.details : entry.type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t dark:border-gray-700 p-4">
            <div className="space-y-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your review comment..."
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => handleAction('request')}
                  className="px-4 py-2 text-foreground bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Request Info
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction('reject')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction('approve')}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};