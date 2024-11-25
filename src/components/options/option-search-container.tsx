"use client";

import { useActionState } from "react";
import { getOptions } from "@/app/actions/options";
import OptionChainTable from "./option-chain-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import OptionSearch from "./option-search";

const initialState = {
  options: [],
  error: null,
};

export default function OptionSearchContainer() {
  const [state, formAction, isPending] = useActionState(
    getOptions,
    initialState,
  );

  return (
    <div className="space-y-6">
      <OptionSearch onSubmit={formAction} disabled={isPending} />

      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {isPending ? (
        <Card className="bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading options...
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        state.options.length > 0 && (
          <Card className="bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
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
