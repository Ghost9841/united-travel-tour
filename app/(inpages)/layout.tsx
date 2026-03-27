import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

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
    const cookieStore = await cookies()
  const sidebarOpen = cookieStore.get('sidebar:state')?.value === 'true'

return (
  <SidebarProvider defaultOpen={sidebarOpen}>
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 w-full min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  </SidebarProvider>
)
}