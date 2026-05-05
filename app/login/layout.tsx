import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VB admin",
  description: "Login to VB Admin Dashboard",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
