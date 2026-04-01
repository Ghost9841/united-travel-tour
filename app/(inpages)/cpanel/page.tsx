// app/cpanel/page.tsx
import { redirect } from "next/navigation";

export default function CPanelPage() {
  // Redirect user to another page
  redirect("https://sangria.hostns.io:2083/"); // <-- change to your target URL
}