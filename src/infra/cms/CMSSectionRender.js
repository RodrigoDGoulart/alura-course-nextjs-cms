import { cmsSections } from "../../components/cmsSections";
import { getCmsContent } from "./CMSProvider";

export function CMSSectionRender({ pageName }) {
  const sections = getCmsContent(`${pageName}.pageContent.section`);
  return sections.map((sectionProps) => {
    const Component = cmsSections[sectionProps.componentName];
    const isVisible =
      sectionProps.visible === true || sectionProps.visible === undefined;

    return Component && isVisible ? (
      <Component key={sectionProps.id} {...sectionProps} />
    ) : null;
  });
}
