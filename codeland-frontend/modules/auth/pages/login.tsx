import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@Components/ui/select";
import { query } from "@Modules/apollo/client";
import { getAllUsernames } from "../infrastructure/queries";

export const Login = async () => {
  const { data } = await query({ query: getAllUsernames });

  console.log(data);
  return (
    <div>
      <h1>Login</h1>
      <form>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="username" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </form>
    </div>
  );
};
