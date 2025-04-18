"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react"; // Assuming LoaderIcon is from lucide-react

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState(false); // Initialize as false

  useEffect(() => {
    const jwt = typeof window !== "undefined" ? sessionStorage.getItem("jwt") : null;
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onCreateAccount = async () => {
    setLoader(true);
    try {
      const resp = await GlobalApi.registerUser(username, email, password);
      console.log(resp.data.user);
      console.log(resp.data.jwt);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
      }
      toast("Account Created Successfully");
      router.push("/");
    } catch (e) {
      setLoader(false);
      const errorMessage = e?.response?.data?.error?.message || "Registration failed";
      toast(errorMessage);
    } finally {
      setLoader(false); // Ensure loader is reset even on error
    }
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src="/logo.png" width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Create an Account</h2>
        <h2 className="text-gray-500">Enter your Email and Password to Create an account</h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={onCreateAccount}
            disabled={!(username && email && password)} // Fixed condition
          >
            {loader ? <LoaderIcon className="animate-spin" /> : "Create an Account"}
          </Button>
          <p>
            Already have an account{" "}
            <Link href="/sign-in" className="text-blue-500">
              Click here to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;