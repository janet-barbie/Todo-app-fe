import localFont from "next/font/local";
import "./globals.css";
// import { ApolloProvider } from '@apollo/client';
// import client from './lib/apolloClient';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     
     {children}
      </body>
    </html>
  );
}

// Separate the ApolloProvider to ensure client-side rendering
// function ApolloProviderWrapper({ children }) {
//   if (typeof window === "undefined") {
//     // If on the server, return children directly
//     return children;
//   }

//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// }
