import SubmitButton from "./submit-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const LoginForm = () => {
  return (
    <div>
      <form>
        <Label>
          <span>Email</span>
          <Input placeholder="Email" type="email" name="email" />
        </Label>
        <SubmitButton text="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
