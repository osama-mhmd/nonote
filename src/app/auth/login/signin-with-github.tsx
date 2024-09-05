import GithubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";

export default function SignInWithGithub() {
  return (
    <Button variant="outline">
      <GithubIcon />{" "}
      Sign in with github
    </Button>
  );
}
