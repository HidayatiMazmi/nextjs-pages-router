import RootLayout from "@/layouts";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const metaTitle = router.pathname === "/" ? "home" : router.pathname.replace("/", "");
  return (
    <RootLayout metaTitle={metaTitle}>
      <Component {...pageProps} />
    </RootLayout>
  )
}
