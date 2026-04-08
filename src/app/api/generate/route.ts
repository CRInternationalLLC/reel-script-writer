import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";

const client = new Anthropic();

export async function POST(request: Request) {
  try {
    const { problema, conseguenze, mezzaSoluzione, idea, brandContext } = await request.json();

    if (!problema || !conseguenze || !mezzaSoluzione) {
      return Response.json(
        { error: "Tutti i campi obbligatori devono essere compilati" },
        { status: 400 }
      );
    }

    let userMessage = `PROBLEMA E LEVA EMOTIVA: ${problema}

CONSEGUENZE DEL NON AGIRE: ${conseguenze}

MEZZA SOLUZIONE: ${mezzaSoluzione}`;

    if (idea) {
      userMessage += `

IDEA DEL CONTENUTO (format richiesto dal brand): ${idea}`;
    } else {
      userMessage += `

NOTA: Il personal brand non ha un format specifico in mente. Genera 3 script in formato PARLATO MEDIO-LUNGO con indicazioni di regia/registrazione (copione completo).`;
    }

    if (brandContext) {
      userMessage += `

━━━━━━━━━━━━━━━━━━━━━━━━
SCRIPT PASSATI DEL PERSONAL BRAND (RIFERIMENTO STILE E TONO)
━━━━━━━━━━━━━━━━━━━━━━━━
Ecco gli script/contenuti precedenti di questo personal brand. Analizza attentamente il tono di voce, lo stile comunicativo, le espressioni ricorrenti, il tipo di ganci usati e l'approccio generale. I nuovi script devono mantenere coerenza con questo stile, pur seguendo la metodologia Consulting Revolution.

${brandContext}`;
    }

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Generation error:", error);
    return Response.json(
      { error: "Errore nella generazione dello script. Verifica la tua API key." },
      { status: 500 }
    );
  }
}
