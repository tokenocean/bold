<script>
  import { goto } from "$lib/utils";
  import Fa from "svelte-fa";
  import {
    faLock,
    faStickyNote,
    faWallet,
  } from "@fortawesome/free-solid-svg-icons";
</script>

<style>
  li {
    margin-bottom: 30px;
  }
  li span {
    margin-left: 20px;
  }
</style>

<div class="w-full px-5 md:px-0">
  <p class="text-xl mb-10">
    It is important to know & proctect your backup phrase. Some things to have in
    mind:
  </p>

  <ul class="flex flex-col mb-10">
    <li class="flex">
      <i class="text-lightblue">
        <Fa icon={faStickyNote} /></i>
      <span class="-mt-1">Write on actual paper instead of keeping it in a
        digital format in your device. (i.e. screenshots, the cloud)</span>
    </li>
    <li class="flex">
      <i class="text-lightblue">
        <Fa icon={faLock} />
      </i>
      <span class="-mt-1">Wait until you are on a personal device and in a
        private environment. (Avoid connecting to public wifi like coffee shops)</span>
    </li>
    <li class="flex">
      <i class="text-lightblue">
        <Fa icon={faWallet} />
      </i>
      <span class="-mt-1">The backup phrase is essential to restore your wallet.
        Make sure its accurate and kept safe!</span>
    </li>
  </ul>

  <a href="/wallet/create/step2" class="primary-btn w-full">Create Wallet</a>
</div>
