<script>
  import { page, session } from "$app/stores";
  import branding from "$lib/branding";
  import { Avatar, Search } from "$comp";

  export let open = false;
  let toggle = () => (open = !open);

  $: path = $page.url.pathname;
</script>

<div class="flex justify-between items-center menu relative">
  <Search suggest={false} />
  <a href="https://www.bold.gallery"
    ><button on:click={toggle}><div>Home</div></button></a
  >
  <a sveltekit:prefetch href="/market"
    ><button on:click={toggle} class:active={path === "/market"}
      ><div>Gallery</div></button
    ></a
  >
  {#if $session?.user}
    <a href={`/${$session.user?.username}`}>
      <button on:click={toggle} class="flex">
        <Avatar user={$session.user} />
      </button></a
    >
  {:else}
    <a href="/login"
      ><button on:click={toggle} class:active={path === "/login"}
        ><div>Log In</div></button
      >
    </a>
  {/if}
</div>

<style>
  .menu {
    font-family: "DM Serif Display", serif;
    font-size: 14px;
    color: #7a7a7a;
  }

  .menu button {
    font-weight: bold;
  }

  .active,
  .menu button:hover {
    color: #0bd3d3;
  }

  .menu button div {
    border-bottom: 3px solid white;
  }

  .menu button:hover div,
  .menu .active div {
    border-bottom: 3px solid #0bd3d3;
  }

  .menu button {
    @apply mx-4;
    width: auto;
    text-align: left;
    padding: 0 20px;
  }

  .menu :global(.search) {
    border: 1px solid lightgray;
    border-radius: 4px;
    margin-right: 15px;
    width: 250px;
  }

  .menu :global(.search):focus-within {
    border: 1px solid #5c5d60;
    border-radius: 4px;
  }

  .menu :global(input) {
    width: auto;
    width: 80%;
    border: none;
    background: none;
    padding: 0.5rem 1.2rem;
  }

  .menu :global(.fa-search) {
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 1023px) {
    .menu :global(.search) {
      display: none;
    }
  }

  @media only screen and (max-width: 1023px) {
    .menu {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 50px;
      border-top: 1px solid gray;
      width: 100%;
    }

    .menu a {
      margin: 25px 0 0 0px;
      width: 100%;
    }
  }
</style>
