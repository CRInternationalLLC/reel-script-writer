import mammoth from "mammoth";
import { extractText } from "unpdf";

const SUPPORTED_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "text/plain": "txt",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("pdf") as File | null;

    if (!file) {
      return Response.json(
        { error: "Nessun file caricato" },
        { status: 400 }
      );
    }

    const fileType = SUPPORTED_TYPES[file.type];
    if (!fileType) {
      return Response.json(
        { error: "Formato non supportato. Carica un PDF, DOCX o TXT." },
        { status: 400 }
      );
    }

    let text = "";

    if (fileType === "txt") {
      text = await file.text();
    } else if (fileType === "docx") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileType === "pdf") {
      const buffer = await file.arrayBuffer();
      const result = await extractText(buffer);
      text = Array.isArray(result.text) ? result.text.join("\n") : result.text;
    }

    if (!text.trim()) {
      return Response.json(
        { error: "Il file non contiene testo estraibile" },
        { status: 400 }
      );
    }

    // Limit to ~50k characters to avoid token limits
    text = text.trim().slice(0, 50000);

    return Response.json({ text });
  } catch (error) {
    console.error("File parse error:", error);
    return Response.json(
      { error: "Errore nell'analisi del file" },
      { status: 500 }
    );
  }
}
