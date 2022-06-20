import { getArtworkBySlug } from "$queries/artworks";
import { getDefaultRoyaltyRecipients } from "$queries/royalty_recipients";

export async function get({ locals: { q }, params }) {
  let { slug } = params;
  let { artworks } = await q(getArtworkBySlug, { slug });
  artwork = artworks[0];

  let { default_royalty_recipients } = await q(getDefaultRoyaltyRecipients);

  if (!artwork) return { status: 404 };

  return {
    body: {
      artwork,
      default_royalty_recipients,
    },
  };
}
