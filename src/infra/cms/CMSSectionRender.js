import { cmsSections } from "../../components/cmsSections";
import { getCmsContent } from "./CMSProvider";

export function CMSSectionRender({ pageName }) {
  const sections = getCmsContent(`${pageName}.pageContent.section`);
  return sections.map((sectionProps) => {
    const Component = cmsSections[sectionProps.componentName];

    return Component ? (
      <Component key={sectionProps.id} {...sectionProps} />
    ) : null;
  });
}
