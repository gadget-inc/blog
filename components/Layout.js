import Link from "next/link";
import { useRouter } from "next/router";
import SiteConfig from "../site.config";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  const header = isRoot ? (
    <h1 className="mb-8">
      <Link href="/">
        <a className="font-black leading-none text-black no-underline text-7xl font-display">
          {SiteConfig.siteMetadata.title}
        </a>
      </Link>
    </h1>
  ) : (
    <h1 className="mb-2">
      <Link href="/">
        <a className="text-2xl font-black text-black no-underline font-display">
          {SiteConfig.siteMetadata.title}
        </a>
      </Link>
    </h1>
  );

  return (
    <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
      <header>{header}</header>
      <main>{children}</main>
      <footer className="text-lg font-light">
        © {new Date().getFullYear()}, Built with{" "}
        <a href="https://gadget.dev/">Gadget</a>⚙️
      </footer>
    </div>
  );
}
