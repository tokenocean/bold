<script>
  import { onMount } from "svelte";
  import SubscriptionClient from "$components/subscribe";
  import { token } from "$components/store";

  let users = [];

  let graphqlUrl;
  if (import.meta.env) {
    graphqlUrl = import.meta.env.SNOWPACK_PUBLIC_GRAPHQL
  } else {
    graphqlUrl = "wss://la.coinos.io/hasura/v1/graphql"
  } 

  onMount(() => {
    const query = `
    subscription {
      users(order_by: [{ display_name: asc }]) {
        display_name
      }
    }
  `;

    const client = new SubscriptionClient(graphqlUrl, {
      lazy: true,
    });

    const subscription = client.request({ query }).subscribe({
      next({ data }) {
        if (data) {
          users = [...data.users];
        }
      },
    });
  });
</script>

<div class="p-4 m-4">
  <ul>
    {#each users as user (user.display_name)}
      <li>- {user.display_name}</li>
    {/each}
  </ul>
</div>