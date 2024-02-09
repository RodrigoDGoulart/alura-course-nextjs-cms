const TOKEN = process.env.DATO_TOKEN;
const BASE_URL = "https://graphql.datocms.com/";
const PREVIEW_URL = "https://graphql.datocms.com/preview/";

const globalQuery = `
  query {
    globalFooter {
      description
    }
  }
`;

export async function cmsService({ query, preview = false }) {
  try {
    const url = !preview ? BASE_URL : PREVIEW_URL;

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
