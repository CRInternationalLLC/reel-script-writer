import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import ScriptForm from "@/components/ScriptForm";
import Footer from "@/components/Footer";

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user's saved documents
  const { data: documents } = await supabase
    .from("documents")
    .select("id, file_name, extracted_text, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <Header userEmail={user.email} />
      <main className="flex-1 px-4 pb-12 max-w-4xl mx-auto w-full">
        <ScriptForm
          userId={user.id}
          savedDocuments={documents || []}
        />
      </main>
      <Footer />
    </>
  );
}
