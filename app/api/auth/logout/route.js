export async function POST(request) {
  const { email, password } = await request.json();

 const user = {email, password}
  if (user) {

return new Response(null, {
      status: 200});
  } else {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

 