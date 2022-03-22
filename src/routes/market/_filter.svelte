<script>
  import { onMount } from "svelte";
  import { ToggleSwitch } from "$comp";
  import { filterCriteria as fc } from "$lib/store";

  export let showFilters;
</script>

<div class:showFilters class="hidden w-full space-y-4">
  <div>
    <ToggleSwitch
      id="owned-by-creator"
      label="Creator Owned"
      checked={$fc.ownedByCreator}
      on:change={(e) => ($fc.ownedByCreator = e.target.checked)}
    />
  </div>
  <div>
    <ToggleSwitch
      id="has-sold"
      label="Collector Owned"
      checked={$fc.hasSold}
      on:change={(e) => ($fc.hasSold = e.target.checked)}
    />
  </div>
  <div>
    <ToggleSwitch
      id="list-price"
      label="Currently Listed"
      checked={$fc.listPrice}
      on:change={(e) => ($fc.listPrice = e.target.checked)}
    />
  </div>
  <div>
    <ToggleSwitch
      id="open-bid"
      label="Open For Bids"
      checked={$fc.openBid}
      on:change={(e) => ($fc.openBid = e.target.checked)}
    />
  </div>
</div>

<style>
  .showFilters {
    display: block !important;
    width: 100%;
  }
</style>
