import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 dark">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-primary/10 p-4">
            <FileQuestion className="h-12 w-12 text-primary" />
          </div>
          <Image 
            src="/UNITED_Logo-01.svg" 
            alt="Logo" 
            width={200} 
            height={50} 
            className="opacity-90"
          />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground text-lg">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">Go back home</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/explore">Explore destinations</Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          If you believe this is an error, please{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-primary">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}