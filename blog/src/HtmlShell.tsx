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
            <li>Jeroen Peeters</li>
          </ul>
          <ul>
            {title !== "jeroenpeeters.be" &&
              (
                <li>
                  <a href="/">Home</a>
                </li>
              )}
            <li className="nav-ts">
              <theme-switcher></theme-switcher>
            </li>
          </ul>
        </nav>
        <main className="container">
          {children}
        </main>
        <script src="/assets/js/theme-switcher.js"></script>
      </body>
    </html>
  );
}
