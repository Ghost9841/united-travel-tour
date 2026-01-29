"use client"

import {
  Home,
  FileText,
  Package,
  Hotel,
  Plane,
  Settings,
  User,
  HelpCircle,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

// Main navigation items
const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Blogs", url: "/blogs", icon: FileText },
  { title: "Packages", url: "/packages", icon: Package },
  { title: "Hotels", url: "/hotels", icon: Hotel },
  { title: "Travels", url: "/travels", icon: Plane },
]

// Bottom navigation items
const bottomItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Help", url: "/help", icon: HelpCircle },
]

function BottomNav({ items }: { items: typeof bottomItems }) {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    className="
                      hover:bg-neutral-100 dark:hover:bg-neutral-900 
                      transition-colors
                      group-data-[collapsible=icon]:h-12!
                      group-data-[collapsible=icon]:w-12!
                      group-data-[collapsible=icon]:mx-auto
                      group-data-[collapsible=icon]:justify-center
                    "
                  >
                    <a href={item.url} className="flex items-center gap-4 px-3 py-3">
                      <item.icon
                        className="
                          h-5 w-5 text-black dark:text-white 
                          group-data-[collapsible=icon]:h-6
                          group-data-[collapsible=icon]:w-6
                          shrink-0
                        "
                      />
                      <span
                        className="
                          text-black dark:text-white 
                          whitespace-nowrap font-medium
                          group-data-[collapsible=icon]:hidden
                        "
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black text-white dark:bg-white dark:text-black px-3 py-2"
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {

  return (
    <TooltipProvider>
      <Sidebar
        collapsible="icon"
        className="
          transition-all duration-300 
          overflow-visible 
          bg-white dark:bg-black 
          border-r border-neutral-200 dark:border-neutral-800
          flex flex-col
        "
      >
        {/* HEADER */}
        <SidebarHeader
          className="
            p-6 
            border-b 
            border-neutral-200 dark:border-neutral-800
          "
        >
          <div
            className="
              flex items-center space-x-3
              group-data-[state=collapsed]:flex-col 
              group-data-[state=collapsed]:space-y-3
              group-data-[state=collapsed]:space-x-0
            "
          >
            {/* ICON + TEXT WRAPPER */}
            <div
              className="
                flex items-center space-x-3 
                group-data-[state=collapsed]:flex-col 
                group-data-[state=collapsed]:space-y-2
                group-data-[state=collapsed]:space-x-0
              "
            >
              {/* Logo */}
              <Tooltip>
                <TooltipTrigger>

              <div
                className="
                  flex h-12 w-12 items-center justify-center rounded-lg 
                  bg-blue-600 text-white
                  font-bold text-lg
                "
              >
                <Image
                  src="/UNITED_Logo-01.svg"
                  alt="Logo"
                  width={256}
                  height={64}
                />

              </div>
                </TooltipTrigger>
                <TooltipContent side="right">United Travel & Tours</TooltipContent>
              </Tooltip>

              {/* Title + Subtitle */}
              <div className="flex flex-col group-data-[state=collapsed]:hidden">
                <h1 className="text-xl font-bold text-black dark:text-white">
                  TravelHub
                </h1>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Explore the world
                </p>
              </div>
            </div>
          </div>
        </SidebarHeader>

        {/* CONTENT */}
        <SidebarContent className="flex-1">
          {/* Main Navigation Group */}
          <SidebarGroup>
            <SidebarGroupLabel
              className="
                text-xs uppercase tracking-wider 
                text-neutral-500 dark:text-neutral-400 
                px-2 
                group-data-[state=collapsed]:hidden
              "
            >
              Navigation
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          className="
                            hover:bg-neutral-100 dark:hover:bg-neutral-900 
                            transition-colors
                            group-data-[collapsible=icon]:h-12!
                            group-data-[collapsible=icon]:w-12!
                            group-data-[collapsible=icon]:mx-auto
                            group-data-[collapsible=icon]:justify-center
                          "
                        >
                          <a
                            href={item.url}
                            className="flex items-center gap-4 px-3 py-3"
                          >
                            <item.icon
                              className="
                                h-5 w-5 text-black dark:text-white 
                                group-data-[collapsible=icon]:h-6
                                group-data-[collapsible=icon]:w-6
                                shrink-0
                              "
                            />
                            <span
                              className="
                                text-black dark:text-white 
                                whitespace-nowrap font-medium
                                group-data-[collapsible=icon]:hidden
                              "
                            >
                              {item.title}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </TooltipTrigger>

                      {/* Tooltip for collapsed state */}
                      <TooltipContent
                        side="right"
                        className="bg-black text-white dark:bg-white dark:text-black px-3 py-2"
                      >
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Bottom Navigation */}
          <BottomNav items={bottomItems} />
        </SidebarContent>

        {/* FOOTER - User Info */}
        {/* {user && (
          <SidebarFooter className="p-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name?.split(' ').map(n => n[0]).join('') || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="group-data-[state=collapsed]:hidden">
                <p className="text-sm font-medium text-black dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {user.email}
                </p>
              </div>
            </div>
          </SidebarFooter>
        )}
      <div></div> */}
      </Sidebar>
    </TooltipProvider>
  )
}