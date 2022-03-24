const BRANDING = {
  projectName: "Bold Gallery",

  superUserName: "boldgallery",

  urls: {
    base: "bold.gallery",
    www: "www.bold.gallery",
    protocol: "https://bold.gallery",
    external: {
      twitter: "https://twitter.com/boldgallery",
      telegram: "https://t.me/+GJWJsDVkWEYyMzYx",
      blog: "https://blog.bold.gallery/",
      facebook: "https://facebook.com/bold",
      instagram: "https://www.instagram.com/boldgalleryart/",
      discord: "https://discord.gg/XUxPs3YnQz",
    },
  },

  meta: {
    title: "Bold Gallery",
    keywords: "Bold Gallery NFT Marketplace",
    description:
      "The preeminent marketplace for verified NFTs from creatives, artists, innovators and brands building in the Bitcoin ecosystem.",
    image: "https://bold.gallery/splash.png",
    url: "https://bold.gallery/",

    twitter: {
      card: "summary_large_image",
      creator: "@boldgallery",
      site: "@boldgallery",
    },

    artwork: (art) => ({
      title: `Bold Gallery - ${art.title}`,
      image: `/api/ipfs/${art.filename}`,
      url: `https://bold.gallery/a/${art.slug}`,
    }),
  },

  emails: {
    support: "support@bold.gallery",
  },
};

export default BRANDING;
