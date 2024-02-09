const TOKEN = process.env.DATO_TOKEN  ;

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

    if (!pageContentResponse.errors) return pageContentResponse;

    throw new Error(JSON.stringify(pageContentResponse));
  } catch (e) {
    throw new Error(e.message);
  }
}
