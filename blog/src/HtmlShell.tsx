type THtmlShellProps = React.PropsWithChildren<{
  title?: string;
}>;

export default function HtmlShell({ title, children }: THtmlShellProps) {
  return (
    <html>
      <head>
        <title>{title || "jeroenpeeters.be"}</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
