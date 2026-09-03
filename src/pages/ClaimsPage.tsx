import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import ClaimBadge from "../components/ClaimBadge";

import {
  fetchClaims,
  fetchItems,
  createClaim,
} from "../api/client";

import type {
  ApiLostFoundItem,
  Claim,
} from "../types";

import { ClaimStatus } from "../types";

import {
  claimSchema,
  type ClaimFormValues,
} from "../schemas/claimSchema";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

function ClaimsPage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    mode: "onBlur",
    defaultValues: {
      claimantName: "",
      itemId: "",
      notes: "",
    },
  });

  const {
    data: claims,
    isPending: claimsPending,
    isError: claimsError,
  } = useQuery<Claim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  const {
    data: items,
    isPending: itemsPending,
  } = useQuery<ApiLostFoundItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const addClaim = useMutation({
    mutationFn: createClaim,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["claims"],
      });

      reset();
    },
  });

  const onSubmit = (values: ClaimFormValues): void => {
    addClaim.mutate({
      itemId: Number(values.itemId),
      claimantId: 2,
      status: ClaimStatus.Pending,
      notes: `${values.claimantName}: ${values.notes}`,
    });
  };

  if (claimsPending || itemsPending) {
    return (
      <div className="animate-pulse p-6">
        Loading claims...
      </div>
    );
  }

  if (claimsError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-300">
        Could not load claims.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Active Claims
      </h1>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Review claims submitted for lost and found items.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid max-w-xl gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Submit a Claim
        </h2>

        <div className="grid gap-1.5">
          <Label
            htmlFor="claimantName"
            className="text-gray-900 dark:text-white"
          >
            Your Name
          </Label>

          <Input
            id="claimantName"
            {...register("claimantName")}
            aria-invalid={errors.claimantName ? true : undefined}
            placeholder="Enter your name"
          />

          {errors.claimantName && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.claimantName.message}
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label
            htmlFor="itemId"
            className="text-gray-900 dark:text-white"
          >
            Item
          </Label>

          <select
            id="itemId"
            {...register("itemId")}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
          >
            <option value="">
              Select an item...
            </option>

            {items?.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.title}
              </option>
            ))}
          </select>

          {errors.itemId && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.itemId.message}
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label
            htmlFor="notes"
            className="text-gray-900 dark:text-white"
          >
            Claim Details
          </Label>

          <Input
            id="notes"
            {...register("notes")}
            aria-invalid={errors.notes ? true : undefined}
            placeholder="Explain why this item belongs to you"
          />

          {errors.notes && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.notes.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={addClaim.isPending}
          className="justify-self-start"
        >
          {addClaim.isPending
            ? "Submitting..."
            : "Submit Claim"}
        </Button>

        {addClaim.isError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Failed to submit claim.
          </p>
        )}

        {addClaim.isSuccess && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Claim submitted successfully!
          </p>
        )}
      </form>

      <div className="mt-8 max-w-xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Existing Claims
        </h2>

        {claims?.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No claims have been submitted yet.
          </p>
        ) : (
          claims?.map((claim) => (
            <ClaimBadge
              key={claim.id}
              claim={claim}
            >
              <span className="font-semibold text-orange-500">
                ⚠ Action Required by Security
              </span>
            </ClaimBadge>
          ))
        )}
      </div>
    </div>
  );
}

export default ClaimsPage;