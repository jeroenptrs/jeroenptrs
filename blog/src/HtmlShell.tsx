import Github from "./Github";
import { TMetadata } from "./types";

type THtmlShellProps = React.PropsWithChildren<{
  title?: string;
  tags?: string[];
  metadata?: TMetadata;
}>;

export default function HtmlShell(
  { title = "jeroenpeeters.be", children, metadata, tags }: THtmlShellProps,
) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/assets/css/index.css" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="author"
          content={(metadata && metadata?.authors?.length > 0)
            ? metadata?.authors?.join(", ")
            : "Jeroen Peeters"}
        />
        {tags && tags?.length > 0 && (
          <meta
            name="keywords"
            content={tags.map((tag) => tag.replace("-", " ")).join(", ")}
          />
        )}
      </head>
      <body>
        <nav className="container">
          <ul>
            <li>
              {title !== "jeroenpeeters.be" && (
                <a className="contrast" href="/">Jeroen Peeters</a>
              )}
              {title === "jeroenpeeters.be" && (
                <a className="contrast" aria-current="page">Jeroen Peeters</a>
              )}
            </li>
          </ul>
          <ul>
            <li className="nav-ts">
              <theme-switcher></theme-switcher>
            </li>
          </ul>
        </nav>
        <main className="container">
          {children}
        </main>
        <footer className="container">
          <div className="icons">
            <div className="flag pansexual" />
            <Github />
          </div>
          <a href="/rss.xml">rss</a>
        </footer>
        <script src="/assets/js/theme-switcher.js"></script>
      </body>
    </html>
  );
}
