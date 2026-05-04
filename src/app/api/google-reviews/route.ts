import { NextResponse } from "next/server";

type GooglePlaceReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: {
    text?: string;
  };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

export const revalidate = 21600;

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({
      configured: false,
      rating: null,
      userRatingCount: null,
      reviews: [],
    });
  }

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "rating,userRatingCount,reviews.rating,reviews.text,reviews.authorAttribution,reviews.relativePublishTimeDescription",
      },
      next: { revalidate },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        configured: true,
        rating: null,
        userRatingCount: null,
        reviews: [],
      },
      { status: response.status },
    );
  }

  const place = (await response.json()) as {
    rating?: number;
    userRatingCount?: number;
    reviews?: GooglePlaceReview[];
  };

  return NextResponse.json({
    configured: true,
    rating: place.rating ?? null,
    userRatingCount: place.userRatingCount ?? null,
    reviews: (place.reviews ?? [])
      .filter((review) => review.text?.text)
      .slice(0, 3)
      .map((review) => ({
        author: review.authorAttribution?.displayName ?? "Cliente Google",
        date: review.relativePublishTimeDescription ?? "Google",
        rating: review.rating ?? 5,
        text: review.text?.text ?? "",
        url: review.authorAttribution?.uri ?? null,
      })),
  });
}
