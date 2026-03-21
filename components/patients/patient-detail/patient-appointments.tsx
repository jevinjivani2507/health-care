import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "@phosphor-icons/react/dist/ssr";
import type { Appointment } from "@/types";

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  scheduled: "default",
  completed: "secondary",
  cancelled: "outline",
};

export function PatientAppointments({
  appointments,
}: {
  appointments: Appointment[];
}) {
  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          No appointments scheduled.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-heading">Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="flex items-start justify-between gap-4 p-3 border border-border"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{appt.type}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(appt.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {appt.time}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{appt.physician}</p>
            </div>
            <Badge
              variant={statusVariant[appt.status]}
              className="text-[10px] shrink-0"
            >
              {appt.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
