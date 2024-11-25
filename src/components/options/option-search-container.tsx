"use client";

import { useActionState } from "react";
import { getOptions, type OptionsState } from "@/app/actions/options";
import OptionChainTable from "./option-chain-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import OptionSearch from "./option-search";

const initialState: OptionsState = {
  options: [],
  error: null,
};

export default function OptionSearchContainer() {
  const [state, formAction, pending] = useActionState(getOptions, initialState);

  return (
    <div className="space-y-6">
      <OptionSearch onSubmit={formAction} disabled={pending} />

      {state.error && !pending && (
        <Alert
          variant="destructive"
          className="animate-in fade-in-0 slide-in-from-top-2"
        >
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {pending ? (
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Loading options...
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        state.options.length > 0 && (
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Showing {state.options.length} options across multiple
                      expiration dates
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <OptionChainTable options={state.options} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
