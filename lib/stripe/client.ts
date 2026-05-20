import Stripe from 'stripe';

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error('Replit connector environment not available');
  }

  const fetchConnection = async (env: string) => {
    const url = new URL(`https://${hostname}/api/v2/connection`);
    url.searchParams.set('include_secrets', 'true');
    url.searchParams.set('connector_names', 'stripe');
    url.searchParams.set('environment', env);
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken,
      },
    });
    const data = await response.json();
    return data.items?.[0];
  };

  // Try production first, then fall back to development
  let connection = await fetchConnection('production');
  if (!connection?.settings?.secret) {
    connection = await fetchConnection('development');
  }

  if (!connection?.settings?.secret) {
    throw new Error('Stripe connection not found');
  }

  return {
    publishableKey: connection.settings.publishable as string,
    secretKey: connection.settings.secret as string,
  };
}

export async function getUncachableStripeClient() {
  const { secretKey } = await getCredentials();
  return new Stripe(secretKey, {
    apiVersion: '2025-08-27.basil' as any,
  });
}

export async function getStripePublishableKey() {
  const { publishableKey } = await getCredentials();
  return publishableKey;
}
