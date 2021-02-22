<script>
  import { page } from "$app/stores";
  import { onMount, tick } from "svelte";
  import bip39 from "bip39";
  import ToggleSwitch from "$components/ToggleSwitch";
  import { password, user } from "$lib/store";
  import { err, goto, info } from "$lib/utils";
  import { requirePassword } from "$lib/auth";
  import { createWallet } from "$lib/wallet";
  import { updateUser } from "$queries/users";
  import { mutation } from "@urql/svelte";

  let update = mutation(updateUser);

  export let mnemonic;

  $: mnemonic = words.filter((w) => w).join(" ");

  export let importWallet = async (mnemonic) => {
    await requirePassword();

    try {
      await update({ id: $user.id, user: createWallet(mnemonic) });
      info("Wallet updated");
      setTimeout(() => goto("/wallet"), 50);
    } catch (e) {
      err(e);
    }
  };

  let typed;
  let setMnemonic = () => (mnemonic = typed);

  let toggle = () => {
    bulk = !bulk;
    tick().then(() => {
      if (bulk) typed = mnemonic;
      else if (typed)
        words = [
          ...typed.split(" "),
          ...new Array(24 - typed.split(" ").length),
        ];
      curr = words.findIndex((w) => !w);
      if (curr < 12) offset = 0;
      else offset = 12;
      if (inputs[curr]) inputs[curr].select();
    });
  };

  $: init($page);
  let init = () => tick().then(() => inputs[0].focus());

  let words = new Array(24);
  let inputs = new Array(24);
  let show = true;
  let offset = 0;
  let curr = 0;

  let bulk = false;

  let suggestions;
  $: suggestions = bip39.wordlists.EN.filter((w) =>
    w.startsWith(words[curr])
  ).slice(0, 5);

  let take = async (suggestion) => {
    words[curr] = suggestion;
    curr++;
    if (curr === 12) {
      offset = 12;
    }

    await tick();

    if (curr === 12) {
      inputs[0].select();
    } else if (curr < 24) {
      inputs[curr - offset].select();
    }
    suggestions = [];
  };

  let keyup = (i, e) => {
    curr = i;
    if (e.key === "Tab" && !e.shiftKey) e.preventDefault();
    if (e.key === "Enter" || (e.key === "Tab" && !e.shiftKey))
      return suggestions[0] && take(suggestions[0]);
  };
</script>

<style>
  input {
    @apply border-0 border-b-2 pb-1;
    width: 75%;
    margin-left: 20px;
  }

  .button-transparent:focus {
    background-color: #6aced5;
    border: none;
  }

  .pagination {
    color: lightgray;
    padding: 7px;
  }
  .pagination:focus {
    color: #6aced5;
  }

  .active {
    color: #6aced5;
  }

  @media only screen and (max-width: 640px) {
    .suggestions {
      position: fixed;
      bottom: 80px;
      left: 0;
      width: 100vw;
    }
  }
</style>

<div class="flex flex-col">
  <p>Enter your backup phrase in the correct order:</p>

  <div class="text-right mt-5">
    <ToggleSwitch
      id="list-price"
      label="Show words"
      on:change={(e) => (show = e.target.checked)}
      checked={show} />
  </div>
</div>

{#if bulk}
  <textarea
    bind:value={typed}
    placeholder="Type or paste your seed here."
    class="my-4 w-full"
    on:blur={setMnemonic}
    autofocus />
{:else}
  <div class="flex flex-wrap mb-2">
    <div class="mr-2 sm:mr-0 flex-grow w-1/4 sm:w-1/2">
      {#each words.slice(offset, offset + 6) as word, i (i)}
        <div class="flex">
          <div class="my-auto w-1/12">{i + offset + 1}.</div>
          {#if show}
            <input
              bind:value={words[i + offset]}
              on:keydown={(e) => keyup(i + offset, e)}
              key={i + offset}
              bind:this={inputs[i + offset]} />
          {:else}
            <input
              bind:value={words[i + offset]}
              on:keydown={(e) => keyup(i + offset, e)}
              key={i + offset}
              bind:this={inputs[i + offset]}
              type="password" />
          {/if}
        </div>
      {/each}
    </div>
    <div class="flex-grow w-1/4 sm:w-1/2">
      {#each words.slice(offset + 6, offset + 12) as word, i (i)}
        <div class="flex">
          <div class="my-auto w-1/12">{i + offset + 6 + 1}.</div>
          {#if show}
            <input
              bind:value={words[i + offset + 6]}
              on:keydown={(e) => keyup(i + offset + 6, e)}
              bind:this={inputs[i + offset + 6]}
              key={i + offset + 6} />
          {:else}
            <input
              bind:value={words[i + offset + 6]}
              on:keydown={(e) => keyup(i + offset + 6, e)}
              bind:this={inputs[i + offset + 6]}
              key={i + offset + 6}
              type="password" />
          {/if}
        </div>
      {/each}
    </div>
  </div>
  <div class="suggestions mt-8 flex flex-wrap justify-center">
    {#each suggestions as suggestion}
      <button
        class="primary-btn w-auto border m-1"
        on:click={() => take(suggestion)}>{suggestion}</button>
    {/each}
  </div>
  <div class="flex justify-center text-center mt-5">
    <button
      on:click={() => (offset = 0)}
      class="pagination w-auto"
      class:active={offset === 0}><i class="fas fa-circle" /></button>
    <button
      on:click={() => (offset = 12)}
      class="pagination w-auto"
      class:active={offset === 12}><i class="fas fa-circle" /></button>
  </div>
{/if}

<p class="my-4">
  {#if bulk}
    <a class="secondary-color m-2" href="" on:click={toggle}>I want to enter my seed
      one word at a time</a>
  {:else}
    <a class="secondary-color m-2" href="" on:click={toggle}>I want to enter my seed
      all at once</a>
  {/if}
</p>