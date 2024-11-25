import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useState } from "react";

interface OptionSearchProps {
  onSubmit: (formData: FormData) => void;
  disabled?: boolean;
}

export default function OptionSearch({
  onSubmit,
  disabled,
}: OptionSearchProps) {
  const [ticker, setTicker] = useState("");

  return (
    <form action={onSubmit}>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Options Chain</h2>
              <p className="text-muted-foreground">
                Search for options by entering a ticker symbol below.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                name="ticker"
                type="text"
                placeholder="Enter ticker symbol (e.g. AAPL)"
                className="h-10 w-80 rounded border p-2"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
              />
              <Button type="submit" disabled={disabled}>
                Find Options
              </Button>
              <Button
                type="submit"
                variant="outline"
                size="icon"
                disabled={disabled}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
