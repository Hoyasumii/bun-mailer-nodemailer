import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const server = Bun.serve({
  port: 3000,
  async fetch() {
    const data = await resend.emails.send({
      from: 'Hub.me <onboarding@resend.dev>', 
      to: ['alanreisanjo@gmail.com'],
      subject: 'Hello World',
      html: '<p>It works!</p>',
    });

    return new Response(JSON.stringify(data));
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);