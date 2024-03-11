import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de numeros",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
