// tools/hardcover.ts
import { tool } from "@openai/agents";
import { z } from "zod";

const HARDCOVER_ENDPOINT = "https://api.hardcover.app/v1/graphql";
const HARDCOVER_TOKEN = process.env.HARDCOVER_API_TOKEN!;
const HARDCOVER_USER_ID = Number(process.env.HARDCOVER_USER_ID ?? 155121);
const STATUS_IDS = {
  want_to_read: 1,
  currently_reading: 2,
  read: 3,
  paused: 4,
  did_not_finish: 5,
} as const;
const USER_BOOKS_QUERY = /* GraphQL */ `
  query UserBooksByStatus($userId: Int!, $statusId: Int!, $limit: Int!) {
    user_books(
      where: { user_id: { _eq: $userId }, status_id: { _eq: $statusId } }
      limit: $limit
    ) {
      book {
        title
        image {
          url
        }
        contributions {
          author {
            name
          }
        }
      }
    }
  }
`;

interface UserBooksResult {
  user_books: {
    book: {
      title: string;
      image: { url: string } | null;
      contributions: { author: { name: string } | null }[];
    };
  }[];
}

async function hardcoverRequest<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  const res = await fetch(HARDCOVER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HARDCOVER_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    throw new Error(`Hardcover HTTP error ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) throw new Error("Hardcover response contained no data");
  return json.data;
}

export const getMyBooksTool = tool({
  name: "get_my_books",
  description:
    "List books from the user's Hardcover library filtered by reading status. " +
    "Returns title, cover image URL and authors for each book.",
  parameters: z.object({
    status: z
      .enum(["want_to_read", "currently_reading", "read", "paused", "did_not_finish"])
      .default("currently_reading")
      .describe("Which shelf to list"),
    limit: z.number().int().min(1).max(50).default(20),
  }),
  async execute({ status, limit }) {
    const data = await hardcoverRequest<UserBooksResult>(USER_BOOKS_QUERY, {
      userId: HARDCOVER_USER_ID,
      statusId: STATUS_IDS[status],
      limit,
    });

    if (data.user_books.length === 0) {
      return `No books found on the "${status}" shelf.`;
    }

    return data.user_books.map(({ book }) => ({
      title: book.title,
      cover: book.image?.url ?? null,
      authors: [
        ...new Set(
          book.contributions
            .map((c) => c.author?.name)
            .filter((n): n is string => Boolean(n))
        ),
      ],
    }));
  },
});
