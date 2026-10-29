
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { askAi } from "../api/client";
import type { AiReply } from "../types";
import { useAuthStore } from "../store/authStore";

import {
  aiReviewFormSchema,
  type AiReviewFormValues,
} from "../schemas/aiReviewSchema";

function AiReviewPage() {
  const token = useAuthStore((state) => state.token);

  const [review, setReview] = useState<AiReply | null>(null);

  const form = useForm<AiReviewFormValues>({
    resolver: zodResolver(aiReviewFormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (values: AiReviewFormValues) => {
      if (!token) {
        throw new Error("Please log in to use AI Report Review.");
      }

      return askAi(values.prompt, token);
    },

    onSuccess: (data) => {
      setReview(data);
    },

    onError: () => {
      setReview(null);
    },
  });

  function handleReview(values: AiReviewFormValues) {
    setReview(null);

    reviewMutation.mutate({
      prompt: values.prompt.trim(),
    });
  }

  const readinessLabel: Record<AiReply["readiness"], string> = {
    ready: "Ready to publish",
    almost: "Almost ready",
    "not-yet": "Needs more details",
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Report Review
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Get suggestions to improve your lost or found item report.
        </p>
      </header>

      <form
        onSubmit={form.handleSubmit(handleReview)}
        className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div>
          <label
            htmlFor="ai-prompt"
            className="mb-2 block font-medium text-gray-900 dark:text-white"
          >
            Describe the lost or found item
          </label>

          <textarea
            id="ai-prompt"
            rows={6}
            maxLength={2000}
            placeholder="Describe the item, its distinguishing features, and approximately when and where it was lost or found."
            {...form.register("prompt")}
            aria-invalid={Boolean(form.formState.errors.prompt)}
            aria-describedby="ai-prompt-help ai-prompt-error"
            className="w-full rounded-md border border-gray-300 p-3 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />

          <p
            id="ai-prompt-help"
            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >
            Enter 20–2000 characters. Do not include passwords,
            student ID numbers, or other sensitive information.
          </p>

          <p
            id="ai-prompt-error"
            role="alert"
            className="mt-1 text-sm text-red-600"
          >
            {form.formState.errors.prompt?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={reviewMutation.isPending}
          className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {reviewMutation.isPending
            ? "Reviewing report..."
            : "Review my report"}
        </button>

        {reviewMutation.isPending && (
          <p role="status" className="text-sm text-gray-600 dark:text-gray-300">
            Gemini is reviewing your report. This may take several seconds.
          </p>
        )}

        {reviewMutation.isError && (
          <p role="alert" className="text-sm text-red-600">
            {reviewMutation.error instanceof Error
              ? reviewMutation.error.message
              : "Unable to review the report. Please try again."}
          </p>
        )}
      </form>

      {review && (
        <section
          aria-live="polite"
          className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your AI Review
          </h2>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Summary
            </h3>

            <p className="mt-1 text-gray-700 dark:text-gray-300">
              {review.summary}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Strengths
            </h3>

            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700 dark:text-gray-300">
              {review.strengths.map((strength, index) => (
                <li key={`${index}-${strength}`}>{strength}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Suggested Improvements
            </h3>

            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700 dark:text-gray-300">
              {review.improvements.map((improvement, index) => (
                <li key={`${index}-${improvement}`}>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Readiness
            </h3>

            <p className="mt-1 font-medium text-blue-700 dark:text-blue-300">
              {readinessLabel[review.readiness]}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This is an AI suggestion, not a verification of ownership.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default AiReviewPage;
