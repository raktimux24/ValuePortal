import { FC } from 'react';
import { HistoryEntry } from '../../types/idea';
import { Clock, MessageSquare, Paperclip, RefreshCw, Send } from 'lucide-react';

interface HistorySectionProps {
  history: HistoryEntry[];
}

export const HistorySection: FC<HistorySectionProps> = ({ history }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getIconForType = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'submission':
        return <Send className="h-5 w-5" />;
      case 'stage_change':
        return <RefreshCw className="h-5 w-5" />;
      case 'comment':
      case 'reply':
        return <MessageSquare className="h-5 w-5" />;
      case 'attachment_added':
      case 'attachment_removed':
        return <Paperclip className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getTextForType = (entry: HistoryEntry) => {
    switch (entry.type) {
      case 'submission':
        return 'Idea Submitted';
      case 'stage_change':
        return entry.details || 'Stage Changed';
      case 'comment':
        return 'Comment Added';
      case 'reply':
        return 'Reply Added';
      case 'attachment_added':
        return `Attachment Added: ${entry.details}`;
      case 'attachment_removed':
        return `Attachment Removed: ${entry.details}`;
      default:
        return 'Action Performed';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flow-root">
        <ul className="-mb-8">
          {history.map((entry, idx) => (
            <li key={entry.id}>
              <div className="relative pb-8">
                {idx !== history.length - 1 && (
                  <span
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ring-8 ring-white dark:ring-gray-900">
                      {getIconForType(entry.type)}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <span className="font-medium text-foreground">
                          {entry.user}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {formatDate(entry.timestamp)}
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-foreground">
                      {getTextForType(entry)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};