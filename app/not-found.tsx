import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink text-bg text-center px-6">
      <p className="text-6xl mb-6">404</p>
      <h1 className="font-display font-bold text-3xl mb-3">Site não encontrado</h1>
      <p className="text-bg/50 text-[15px] mb-8">
        O ID informado não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="bg-accent text-white px-6 py-3 rounded-md text-[14px] font-semibold hover:bg-sun transition-colors"
      >
        ← Voltar ao painel
      </Link>
    </div>
  );
}
