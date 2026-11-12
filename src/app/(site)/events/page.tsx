import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { PageIntro } from "@/components/PageIntro";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Gatherings for Technical Program Managers — salons, office hours, and conversations that sharpen practice.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container-page py-14 md:py-20">
      <PageIntro
        title="Events"
        description="Gatherings for people who run complex technical programs — smaller rooms, sharper questions, conversations you can take back to your work."
      />
      {events.length > 0 ? (
        <div className="mt-12 grid gap-5 md:mt-16">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
