import * as z from "zod";
import SignUpForm from "@/components/forms/SignUpForm";

export const UserSignInSchema = z.object({
  id: z.uuidv4(),
  name: z.string(),
  username: z.string().trim(),
  password: z.string().trim(),
});

export type User = z.infer<typeof UserSignInSchema>;

const CreateAccount = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <SignUpForm />
    </div>
  );
};

export default CreateAccount;
