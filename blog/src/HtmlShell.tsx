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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
