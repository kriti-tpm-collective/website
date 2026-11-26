import { PrepareShell } from "@/components/prepare/PrepareShell";
import { getChapters } from "@/content/prepare";

export default function PrepareLayout({ children }: { children: React.ReactNode }) {
  const skillIds = getChapters().map((chapter) => chapter.id);

  return <PrepareShell skillIds={skillIds}>{children}</PrepareShell>;
}
