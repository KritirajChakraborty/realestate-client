import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold mx-auto py-7">
        Sign Up
      </h1>
      <form action="" className="flex flex-col gap-8">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-red-500 text-slate-50 text-center hover:bg-red-700 p-3 rounded-lg border-none uppercase ">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to="/signin" className="text-blue-700 ">
          Sign In
        </Link>
      </div>
    </div>
  );
}
