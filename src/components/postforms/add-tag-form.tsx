"use client";

import { Tag } from "@/lib/types";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

type Props = {
  title: string;
  subtitle: string;
  content: string;
  goToSourcesForm: (tags: Tag[]) => void;
};

const AddTagForm = ({ title, subtitle, content, goToSourcesForm }: Props) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [writtenTag, setWrittenTag] = useState<string>("");
  const [searchedTags, setSearchedTags] = useState<string[]>([]);

  useEffect(() => {
    // handle search with useQuery & setSearchedTags
  }, [writtenTag]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setWrittenTag(e.target.value);
  }

  function addTag() {
    if (writtenTag.trim() !== "") {
      const existingTag = selectedTags.find(
        (tag) => tag.name.toLowerCase() === writtenTag.toLowerCase()
      );
      if (existingTag) return;
      setSelectedTags([...selectedTags, { name: writtenTag }]);
      setWrittenTag("");
    }
  }

  function deleteTag(tag: Tag) {
    setSelectedTags(
      selectedTags.filter((tSelected) => tSelected.name !== tag.name)
    );
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    goToSourcesForm(selectedTags);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col">
            <Input
              placeholder="Search or create a tag"
              onChange={(e) => handleInput(e)}
              value={writtenTag}
            />
            {/* display dropdown of searched tags. every button has to set selectedTags */}
          </div>
          <Button type="button" onClick={addTag}>
            Add tag
          </Button>
        </div>
        <div>
          {selectedTags.map((tag) => {
            return (
              <Badge className="flex gap-4 w-fit" key={tag.name}>
                {tag.name}
                <Button variant={"destructive"} onClick={() => deleteTag(tag)}>
                  X
                </Button>
              </Badge>
            );
          })}
        </div>
      </div>
      <Button type="submit">Next</Button>
    </form>
  );
};

export default AddTagForm;
