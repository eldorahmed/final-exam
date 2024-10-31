
import { Button } from "flowbite-react";
import { getFormData } from "../lib/my-utils";
import { login } from "../request";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setAdmin } from "../store/appSlice";
import { Link } from "react-router-dom";
export default function Login() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const result = getFormData(e.target);
    setLoading(true);
    login(result)
      .then((res) => {
        dispatch(setAdmin(res));
        console.log(res);
        toast.success("Tizimga kirish tasdiqlandi!");
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-96 flex-col gap-5"
      >
        {" "}
        <div>
          <h1 className="text-center text-xl mb-5">Login</h1>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Ismingizni kiriting"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <p>If you do not have an account <Link className="underline text-blue-500" to='/register'> Register</Link></p>
        <div>
          <Button
            className="w-full bg-slate-500 text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? <UpdateIcon className="animate-spin" /> : "Kirish"}
          </Button>
        </div>
      </form>
    </div>
  );
}
