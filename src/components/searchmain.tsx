import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const SearchMain = () => {
  return (
    <div className="flex items-center gap-2">
      <SearchIcon />
      <Input placeholder="Search..." type="text" />
    </div>
  );
};

export default SearchMain;
