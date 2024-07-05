"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tag } from "@/lib/types";
import AddTagForm from "./add-tag-form";
import AddSourceForm from "./add-source-form";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(500, { message: "Title must be less than 500 characters" }),
  subtitle: z
    .string()
    .min(4, { message: "Subtitle must be at least 4 characters" })
    .max(1000, { message: "Subtitle must be less than 1000 characters" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(16000, { message: "Content must be less than 16000 characters" }),
});

const CreatePostForm = () => {
  const [step, setStep] = useState(1);
  const [postData, setPostData] = useState<{
    title: string;
    subtitle: string;
    content: string;
    tags?: Tag[];
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
    },
  });

  function submitHandler(values: z.infer<typeof formSchema>) {
    setPostData({
      title: values.title,
      subtitle: values.subtitle,
      content: values.content,
    });
    setStep(2);
  }

  function handleTagsSubmit(tags: Tag[]) {
    if (postData) {
      setPostData({ ...postData, tags });
      setStep(3);
    }
  }

  return (
    <div>
      {step === 1 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Title..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Subtitle..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Content..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      )}
      {step === 2 && postData && (
        <AddTagForm
          title={postData.title}
          subtitle={postData.subtitle}
          content={postData.content}
          goToSourcesForm={handleTagsSubmit}
        />
      )}
      {step === 3 && postData && postData.tags && (
        <AddSourceForm
          title={postData.title}
          subtitle={postData.subtitle}
          content={postData.content}
          tags={postData.tags}
        />
      )}
    </div>
  );
};

export default CreatePostForm;
