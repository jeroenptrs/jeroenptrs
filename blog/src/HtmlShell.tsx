type THtmlShellProps = React.PropsWithChildren<{
  title?: string;
}>;

export default function HtmlShell(
  { title = "jeroenpeeters.be", children }: THtmlShellProps,
) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/assets/index.css" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body>
        <nav>
          <ul>
            <li>Jeroen Peeters</li>
          </ul>
          <ul>
            <li>
              {title === "jeroenpeeters.be"
                ? <a aria-current="page">Home</a>
                : <a href="/">Home</a>}
            </li>
          </ul>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
