import Github from "./Github";

type THtmlShellProps = React.PropsWithChildren<{
  title?: string;
}>;

export default function HtmlShell(
  { title = "jeroenpeeters.be", children }: THtmlShellProps,
) {
  return (
    <html data-theme="dark">
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/assets/css/index.css" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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
          <div className="flag pansexual" />
          <Github />
        </footer>
        <script src="/assets/js/theme-switcher.js"></script>
      </body>
    </html>
  );
}
