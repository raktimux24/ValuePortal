import { Eye } from 'lucide-react';
import { FC } from 'react';
import { Idea } from '../types/idea';

interface IdeaCardProps {
  idea: Idea;
  onView: (id: string) => void;
}

export const IdeaCard: FC<IdeaCardProps> = ({ idea, onView }) => {
  const isQuantifiable = idea.stage === 'quantify';

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 transition-shadow ${
        isQuantifiable ? 'hover:shadow-md cursor-pointer' : ''
      }`}
      onClick={() => isQuantifiable && onView(idea.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{idea.title}</h3>
        {!isQuantifiable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(idea.id);
            }}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1"
          >
            <Eye className="h-4 w-4" />
            <span>View</span>
          </button>
        )}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Submitted on {new Date(idea.submittedOn).toLocaleDateString()} by {idea.submittedBy}
      </div>
      <div className="mt-3">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          isQuantifiable 
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
            : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
        }`}>
          {idea.stage.replace('_', ' ').charAt(0).toUpperCase() + idea.stage.slice(1)}
        </span>
      </div>
    </div>
  );
};