import { redirect } from "next/navigation";

// Temporarily withdrawn from public view. The process and eligibility data stay
// editable in Admin > Microfinance so they can be reviewed before republication.
export default function MicrofinanceProcessPage() {
  redirect("/microfinance");
}
