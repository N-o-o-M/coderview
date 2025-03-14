import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignInWithMetamaskButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-10">
      Home page
      <SignInButton>
        <Button>Sign in</Button>
      </SignInButton>
      <SignUpButton>
        <Button>Sign up</Button>
      </SignUpButton>
    </div>
  );
}
