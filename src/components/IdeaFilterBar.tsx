import { Filter, Search } from 'lucide-react';
import { FC } from 'react';
import { IdeaFilters } from '../types/idea';

interface IdeaFilterBarProps {
  filters: IdeaFilters;
  onFiltersChange: (filters: IdeaFilters) => void;
}

export const IdeaFilterBar: FC<IdeaFilterBarProps> = ({ filters, onFiltersChange }) => {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search ideas..."
          className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>
      <div className="relative">
        <select
          className="w-full appearance-none cursor-pointer px-4 py-2 pr-10 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filters.stage}
          onChange={(e) => onFiltersChange({ ...filters, stage: e.target.value as any })}
        >
          <option value="all">All Stages</option>
          <option value="thoughts">Thoughts</option>
          <option value="quantify">Quantify</option>
          <option value="internal_review">Internal Review</option>
          <option value="external_review">External Review</option>
          <option value="poc">POC</option>
          <option value="completed">Completed</option>
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <Filter className="h-5 w-5" />
        Filter: All
      </button>
    </div>
  );
};