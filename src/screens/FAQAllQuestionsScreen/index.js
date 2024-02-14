import { cmsService } from "../../infra/cms/cmsService";
import { PageHOC } from "../../components/wrappers/pageHOC";
import { CMSSectionRender } from "../../infra/cms/CMSSectionRender";

export async function getStaticProps({ preview }) {
  const { data: cmsContent } = await cmsService({
    query: `
      query {
        pageFaq {
          pageContent {
            section {
              componentName: __typename
              ... on CommonSeoBlockRecord {
                id
                title
              }
              ... on CommonMenuRecord {
                id
              }
              ... on CommonFooterRecord {
                id
                visible
              }
              ... on PagefaqDisplayquestionsectionRecord {
                id
                title
                description
                categories {
                  id
                  title
                  questions {
                    id
                    title
                    
                  }
                }
              }
            }
          }
        }
      }
    `,
    preview,
  });

  return {
    props: {
      cmsContent,
    },
  };
}

export function FAQAllQuestionsScreen() {
  return <CMSSectionRender pageName="pageFaq" />;
}

export default PageHOC(FAQAllQuestionsScreen);
