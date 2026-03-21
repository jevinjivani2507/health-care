import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserMinus } from "@phosphor-icons/react/dist/ssr";

export default function PatientNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <UserMinus className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <CardTitle className="font-heading">Patient not found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            The patient you are looking for does not exist or has been removed.
          </p>
          <Button render={<Link href="/patients" />}>
            Back to patients
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
