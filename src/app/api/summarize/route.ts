export async function POST(req: Request) {
    let content;
    try {
        const body = await req.json();
        content = body.content;
    } catch (error) {
        console.error("Error parsing JSON from request:", error);
        return new Response(JSON.stringify({ message: "Bad request, JSON parsing failed" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400
        });
    }

    if (!content) {
        return new Response(JSON.stringify({ message: "Missing content in the request" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400
        });
    }

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4-turbo-preview",
                messages: [{ role: "user", content: `Please summarize the following transcription: ${content}` }],
                max_tokens: 150,
                temperature: 0.5
            })
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("API call to OpenAI failed:", data);
            return new Response(JSON.stringify({ message: data.error.message || "API Error" }), {
                headers: { 'Content-Type': 'application/json' },
                status: res.status
            });
        }

        const summary = data.choices[0]?.message?.content?.trim();

        return new Response(JSON.stringify({ message: "Summary created", summary }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error("Error processing the chat completion:", error);
        return new Response(JSON.stringify({ message: "Server error" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}
