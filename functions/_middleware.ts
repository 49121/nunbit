// Send the default Cloudflare Pages hostname to the canonical domain so only one origin is indexed.
// Preview deployments (<hash>.nunbit.pages.dev) are left alone.
const PAGES_HOST = "nunbit.pages.dev";
const CANONICAL_HOST = "nunbit.withint.com";

export const onRequest = async ({
  request,
  next,
}: {
  request: Request;
  next: () => Promise<Response>;
}): Promise<Response> => {
  const url = new URL(request.url);
  if (url.hostname === PAGES_HOST) {
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
