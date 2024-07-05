"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type Props = {
  text: string;
};

const SubmitButton = ({ text }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant={"secondary"}>
      {pending ? "..." : text}
    </Button>
  );
};

export default SubmitButton;
