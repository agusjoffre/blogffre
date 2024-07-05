"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tag } from "@/lib/types";

type Props = {
  title: string;
  subtitle: string;
  content: string;
  tags: Tag[];
};

const AddSourceForm = ({ title, subtitle, content, tags }: Props) => {
  const [sources, setSources] = useState<string[]>([]);
  const [writtenSource, setWrittenSource] = useState<string>("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setWrittenSource(e.target.value);
  }

  function addSource() {
    if (writtenSource.trim() !== "") {
      const existingSource = sources.find(
        (source) => source.toLowerCase() === writtenSource.toLowerCase()
      );
      if (existingSource) return;
      setSources([...sources, writtenSource.trim()]);
      setWrittenSource("");
    }
  }

  function deleteSource(source: string) {
    setSources(sources.filter((s) => s !== source));
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    // call the service to create post
    console.log({ title, subtitle, content, tags, sources });
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col">
            <Input
              placeholder="Add a source"
              onChange={handleInput}
              value={writtenSource}
            />
          </div>
          <Button type="button" onClick={addSource}>
            Add source
          </Button>
        </div>
        <div>
          {sources.map((source) => {
            return (
              <Badge className="flex gap-4 w-fit" key={source}>
                {source}
                <Button
                  variant={"destructive"}
                  onClick={() => deleteSource(source)}
                >
                  X
                </Button>
              </Badge>
            );
          })}
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddSourceForm;
