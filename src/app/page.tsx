import Image from "next/image";
import WallCalendar from "@/components/WallCalendar.tsx";
export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-screen bg-background">
      <WallCalendar />
    </main>
  );
}
