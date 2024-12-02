import { Filter, Search } from 'lucide-react';
import { FC } from 'react';
import { IdeaFilters } from '../types/idea';

interface IdeaFiltersProps {
  filters: IdeaFilters;
  onFiltersChange: (filters: IdeaFilters) => void;
}

export const IdeaFilters: FC<IdeaFiltersProps> = ({ filters, onFiltersChange }) => {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search ideas..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>
      <select
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
      <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
        <Filter className="h-5 w-5" />
        Filter: All
      </button>
    </div>
  );
};