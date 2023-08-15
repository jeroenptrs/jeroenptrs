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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
