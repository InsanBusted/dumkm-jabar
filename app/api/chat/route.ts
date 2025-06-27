import { OpenAIStream, StreamingTextResponse } from "ai";
import openai, { getEmbedding } from "@/lib/embedding";
import { productIndex, umkmIndex } from "@/lib/db/pinecone";
import { ChatCompletionUserMessageParam } from "openai/resources";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const latestMessage = messages[messages.length - 1];
  const question = latestMessage.content;

  const embedding = await getEmbedding(question);

  const [productResult, umkmResult] = await Promise.all([
    productIndex.query({
      vector: embedding,
      topK: 20,
      includeMetadata: true,
    }),
    umkmIndex.query({
      vector: embedding,
      topK: 20,
      includeMetadata: true,
    }),
  ]);

  const contexts = [
    ...(productResult.matches || []),
    ...(umkmResult.matches || []),
  ]
    .map((m) => m.metadata?.pageContent)
    .filter(Boolean);

  const contextString = contexts.join("\n\n");

  const systemPrompt = `Halo! 😊 Aku adalah asisten virtual yang akan membantumu menemukan informasi terbaik dari produk dan UMKM yang tersedia di sistem kami.
    Berikut adalah data yang bisa aku gunakan untuk menjawab pertanyaanmu:
    ${contextString}
    Silakan tanyakan apa pun, ya! 📦✨`;

  const userMessages: ChatCompletionUserMessageParam[] = [
    { role: "user", content: "Produk apa saja yang tersedia?" },
    { role: "user", content: "Apa itu UMKM Mawar Bakery?" },
    { role: "user", content: "Tampilkan produk berdasarkan kategori makanan." },
    { role: "user", content: "UMKM mana yang berlokasi di Depok?" },
    { role: "user", content: "Produk apa yang dijual oleh UMKM Mawar?" },
    { role: "user", content: "Tampilkan ringkasan UMKM dan produknya." },
    { role: "user", content: "Ada produk murah dari UMKM mana?" },
    { role: "user", content: "Apakah ada UMKM yang menjual kerajinan tangan?" },
  ];

  const fullMessages = [
    { role: "system", content: systemPrompt },
    ...userMessages,
    ...messages,
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: fullMessages,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = OpenAIStream(response as any);
  return new StreamingTextResponse(stream);
}
