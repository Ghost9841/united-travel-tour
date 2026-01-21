// app/(auth)/layout.tsx
export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark">
      {children}
    </div>
  );
}
