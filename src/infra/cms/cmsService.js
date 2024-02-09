const TOKEN = process.env.DATO_TOKEN;

const globalQuery = `
  query {
    globalFooter {
      description
    }
  }
`;

export async function cmsService({ query }) {
  try {
    const url = "https://graphql.datocms.com/";

    const pageContentResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        query,
      }),
    }).then(async (res) => {
      const body = await res.json();
      return body;
    });

    const globalContentResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        query: globalQuery,
      }),
    }).then(async (res) => {
      const body = await res.json();
      if (!pageContentResponse.errors) return body;
      throw new Error(JSON.stringify(pageContentResponse));
    });

    return {
      data: {
        ...pageContentResponse.data,
        globalContent: {
          ...globalContentResponse.data,
        },
      },
    };
  } catch (e) {
    throw new Error(e.message);
  }
}
