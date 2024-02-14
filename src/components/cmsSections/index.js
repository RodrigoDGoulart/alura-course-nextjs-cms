import { Footer } from "../commons/Footer";
import { Menu } from "../commons/Menu";
import { PagehomeHerosectionRecord } from "./PagehomeHerosectionRecord";
import { SEOBlock } from "./SEOBlock";

export const cmsSections = {
  CommonSeoBlockRecord: (props) => <SEOBlock {...props} />,
  CommonMenuRecord: (props) => <Menu {...props} />,
  PagehomeHerosectionRecord: (props) => (
    <PagehomeHerosectionRecord {...props} />
  ),
  CommonFooterRecord: (props) => <Footer {...props} />,
};
