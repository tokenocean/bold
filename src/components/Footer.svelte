<script>
  import branding from "$lib/branding";
  import Fa from "svelte-fa";
  import {
    faFacebook,
    faInstagram,
    faTelegramPlane,
    faDiscord,
    faTwitter,
  } from "@fortawesome/free-brands-svg-icons";
  import { faRss } from "@fortawesome/free-solid-svg-icons";

  const date = new Date();
  const year = date.getFullYear();

</script>

<div class="bg-white px-2 mt-24">
  <div class="container footer mx-auto text-white pt-12 flex">
    <ul class="list-none flex my-auto">
      <li class="mr-6">
        <a
          target="_blank"
          href="https://twitter.com/boldgallery"
          class="flex items-center"><div class="w-6 mr-1">
            <Fa icon={faTwitter} color="#1DA1F2" size="lg" />
        </div>
        </a>
      </li>
      <li class="mr-6">
        <a
          target="_blank"
          href="https://www.instagram.com/boldgalleryart/"
          class="flex items-center"><div class="w-6 mr-1">
            <Fa icon={faInstagram} color="#BC2A8D" size="lg" />
        </div>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://discord.com/invite/mkE6UnMTe6"
          class="flex items-center"><div class="w-6 mr-1">
            <Fa icon={faDiscord} size="lg" color="#5865F2" />
        </div>
        </a>
      </li>
    </ul>
    <ul class="menu list-none flex flex-wrap mx-4 mx-auto w-full text-center justify-center my-auto">
      <li class="mb-2">
        <a
          target="_blank"
          href="https://bold.gallery/guide/"
          class="flex items-center">
        <div>User Guide</div></a>
      </li>
      <li class="mb-2">
        <a
          target="_blank"
          href="mailto:info@bold.gallery"
          class="flex items-center">
        <div>Contact</div></a>
      </li>
      <li class="mb-2">
        <a
          target="_blank"
          href="https://bold.gallery/terms-conditions/"
          class="flex items-center">
          <div>Terms & Conditions</div></a>
      </li>
      <li class="mb-2">
        <a
          target="_blank"
          href="https://bold.gallery/privacy-policy/"
          class="flex items-center">
          <div>Privacy Policy</div></a>
      </li>
    </ul>
    <p class="whitespace-nowrap my-auto mb-2">© Bold Gallery 2022 All Rights Reserved</p>
  </div>
</div>

<style>
  .footer {
    font-family: "DM Serif Display", serif;
    font-size: 16px;
    font-weight: 600;
    color: #7a7a7a;
  }

  .menu a {
    padding: 0px 30px;
  } 

  .menu li {
    @apply whitespace-nowrap;
    width: auto;
  } 

  .menu .active,
  .menu li:hover div {
    color: #0bd3d3;
  }

  .menu a {
    border-bottom: 3px solid white;
  }

  .menu li a:hover,
  .menu .active a {
    border-bottom: 3px solid #0bd3d3;
  }
 </style> 
