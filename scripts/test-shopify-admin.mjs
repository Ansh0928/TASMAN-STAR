

const domain = process.env.SHOPIFY_STORE_DOMAIN || '';
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';
const adminEndpoint = `https://${domain}/admin/api/2024-01/graphql.json`;

const query = `
{
  products(first: 5) {
    edges {
      node {
        title
        handle
      }
    }
  }
}
`;

async function testAdmin() {
  console.log(`Endpoint: ${adminEndpoint}`);
  try {
    const res = await fetch(adminEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({ query }),
    });
    const body = await res.json();
    if (body.errors) {
      console.error('❌ Failed:', JSON.stringify(body.errors));
    } else {
      const products = body.data?.products?.edges || [];
      console.log(`✅ Success! Found ${products.length} products.`);
      products.forEach((p, i) => console.log(`  ${i + 1}. ${p.node.title} (${p.node.handle})`));
    }
  } catch (e) {
    console.error('❌ Error:', e.message);
  }
}

testAdmin();
