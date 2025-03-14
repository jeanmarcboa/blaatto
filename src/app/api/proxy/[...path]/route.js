import { BASE_API_URL } from "../../config";

export async function GET(req, { params }) {
  return await proxyRequest(req, params);
}

export async function POST(req, { params }) {
  return await proxyRequest(req, params);
}

export async function PUT(req, { params }) {
  return await proxyRequest(req, params);
}

export async function DELETE(req, { params }) {
  return await proxyRequest(req, params);
}

async function proxyRequest(req, params) {
  try {
    const url = `${BASE_API_URL}/${params.path.join("/")}`; // Reconstitue l'URL complète
    const method = req.method;
    const headers = {
      "Content-Type": "application/json",
      Authorization: req.headers.get("Authorization") || "", // Ajoute l’Authorization si nécessaire
    };

    const body =
      method !== "GET" && method !== "DELETE" ? await req.text() : null; // Pas de body pour GET/DELETE

    const response = await fetch(url, {
      method,
      headers,
      body: body || undefined,
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
