import { Button } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setAdmin } from "../store/appSlice";
import { Link } from "react-router-dom";
import { UpdateIcon } from "@radix-ui/react-icons";
import { register } from "../request"; // Ensure this function is properly implemented

export default function Register() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Parollar mos kelmaydi!");
      return;
    }

    const result = { username, password };
    console.log("Form data:", result);

    setLoading(true);

    register(result)
      .then((res) => {
        dispatch(setAdmin(res));
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
        <div>
          <h1 className="mb-5 text-center text-xl">Register</h1>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <p>
          If you have an account{" "}
          <Link className="text-blue-500 underline" to="/login">
            {" "}
            Login
          </Link>
        </p>
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
