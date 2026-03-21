import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()

  if (!user) {
    return redirect('/login')
  }

  const isAdmin =
    user.publicMetadata?.role === 'admin' ||
    (process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map((e) => e.trim().toLowerCase()).includes(user.emailAddresses?.[0]?.emailAddress?.toLowerCase() || ''))

  if (!isAdmin) {
    return redirect('/')
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main>
        {children}
      </main>
    </SidebarProvider>
  )
}