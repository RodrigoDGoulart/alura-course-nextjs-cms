import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { Box, Text, theme } from "../../theme/components";
import { cmsService } from "../../infra/cms/cmsService";
import { StructuredText, renderNodeRule } from "react-datocms/structured-text";
import { isHeading } from "datocms-structured-text-utils";
import { PageHOC } from "../../components/wrappers/pageHOC";

export async function getStaticPaths() {
  const query = `
    query {
      allContentFaqQuestions {
        id
        title
      }
    }
  `;

  const { data } = await cmsService({
    query,
  });

  const paths = data.allContentFaqQuestions.map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview }) {
  const { id } = params;

  const query = `
    query($id: ItemId) {
      allContentFaqQuestions (filter:{
        id: {eq: $id}
      }) {
        id
        title
        content {
          value
        }
      }
    }
  `;

  const variables = { id };

  const { data } = await cmsService({
    query,
    variables,
    preview,
  });

  return {
    props: {
      cmsContent: data,
    },
  };
}

function FAQQuestionScreen({ cmsContent }) {
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            gap: theme.space.x4,
            flexDirection: "column",
            width: "100%",
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: "auto",
          }}
        >
          <Text tag="h1" variant="heading1">
            {cmsContent.allContentFaqQuestions[0].title}
          </Text>

          {/* <Box dangerouslySetInnerHTML={{ __html: content }} /> */}
          {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
          <StructuredText
            data={cmsContent.allContentFaqQuestions[0].content}
            customNodeRules={[
              renderNodeRule(isHeading, ({ node, children, key }) => {
                const tag = `h${node.level}`;
                const variant = `heading${node.level}`;

                return (
                  <Text key={key} tag={tag} variant={variant}>
                    {children}
                  </Text>
                );
              }),
            ]}
          />
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default PageHOC(FAQQuestionScreen);
