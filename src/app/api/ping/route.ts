export async function GET(): Promise<Response> {
  return new Response('pong', { status: 200 });
}
