import { redirect } from "@remix-run/node";

export const loader = () => {
  return redirect("/snippets");
};

export default function Index() {
  return null;
}
