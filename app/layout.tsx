import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "lucide-react";
// import Navbar from "@/components/newNavbar";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./tenstack-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <main className="">
              {/* <Navbar /> */}
              <div className="mb-10 md:mb-0">{children}</div>
              <Toaster richColors duration={10000} />
            </main>
          </Providers>

          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/components/ThemeProvider";
// import { ClerkProvider } from "@clerk/nextjs";
// import { Sidebar } from "lucide-react";
// import { Toaster } from "sonner";
// import Navbar from "@/components/newNavbar";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.className} dark:bg-neutral-900 dark:text-white`}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <ClerkProvider>
//             <main className="">
//               <Navbar />
//               {children}
//             </main>
//           </ClerkProvider>

//           <Toaster richColors />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
