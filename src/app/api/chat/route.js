export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Get the last user message
    const lastUserMessage =
      messages.filter((msg) => msg.role === "user").pop()?.content || "";

    // Use Hugging Face Inference API with a free model
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: lastUserMessage }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const result = await response.json();
    const botMessage = Array.isArray(result)
      ? result[0].generated_text
      : result.generated_text;

    return new Response(JSON.stringify({ message: botMessage }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ message: "Error processing your request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
