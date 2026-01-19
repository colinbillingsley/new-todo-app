import { Button } from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/signup">
        <Button>Create Account</Button>
      </Link>
    </div>
  );
}
