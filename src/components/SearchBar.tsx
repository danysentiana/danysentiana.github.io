import { Input } from "@/components/ui/input";
import { Search } from "lucide-react"

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2  w-5 h-5" />

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search projects title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 pl-12 xl:py-7 text-lg border shadow-sm rounded-4xl dark:bg-neutral-800 dark:border-neutral-700"
      />
    </div>
  );
};

export default SearchBar;
